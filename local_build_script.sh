#!/bin/zsh

# Enable strict error handling
set -euo pipefail

# Colors for output
readonly RED='\033[0;31m'
readonly GREEN='\033[0;32m'
readonly YELLOW='\033[1;33m'
readonly BLUE='\033[0;34m'
readonly NC='\033[0m' # No Color

# Script configuration
RESET_LOCAL_CHANGES=false
UPDATE_SNAPSHOTS=false
RUN_STORYBOOK=false
SKIP_TESTS=false
SKIP_SNAPSHOT_TESTS=false
SKIP_DOCKER=false
VERBOSE=false

# Trivy state (mutable — populated at runtime)
TRIVY_BINARY_PATH=""
TRIVY_TEMP_DIR=""

# Function to print colored output
print_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
print_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
print_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
print_error() { echo -e "${RED}[ERROR]${NC} $1"; }

# Function to show help
show_help() {
    cat << EOF
B2B Design System Local Build Script

Helper script to build and test the project locally. If everything goes well, the UI will be started up.

Usage: ./local_build_script.sh [options]

Options:
    --reset-local-changes        Reset local changes (git reset HEAD --hard)
    --run-storybook              Start Storybook development server after build
    --update-snapshots           Update existing test snapshots
    --skip-tests                 Skip running tests (faster build)
    --skip-snapshot-tests        Skip running snapshot tests
    --skip-docker                Skip Docker image build
    --verbose                    Enable verbose output
    --help                       Show this help message

Incompatible Option Combinations (script will exit early if detected):
    ❌ --update-snapshots + --skip-snapshot-tests
       → Cannot update snapshots if snapshot tests are skipped

    ❌ --update-snapshots + --skip-docker
       → Cannot update snapshots without Docker (snapshot tests run in Docker)

    ℹ️  Auto-adjustments:
    • --skip-docker automatically enables --skip-snapshot-tests
      (since snapshot tests require Docker to run)

Examples:
    ./local_build_script.sh                              # Standard build
    ./local_build_script.sh --reset-local-changes --skip-tests
    ./local_build_script.sh --update-snapshots --verbose
    ./local_build_script.sh --skip-docker --skip-tests   # Fast local development
    ./local_build_script.sh --run-storybook --verbose    # Full build with Storybook
EOF
}

# Parse command line arguments
parse_arguments() {
    while [[ $# -gt 0 ]]; do
        case $1 in
            --reset-local-changes)
                RESET_LOCAL_CHANGES=true
                shift
                ;;
            --update-snapshots)
                UPDATE_SNAPSHOTS=true
                shift
                ;;
            --run-storybook)
                RUN_STORYBOOK=true
                shift
                ;;
            --skip-tests)
                SKIP_TESTS=true
                shift
                ;;
            --skip-snapshot-tests)
                SKIP_SNAPSHOT_TESTS=true
                shift
                ;;
            --skip-docker)
                SKIP_DOCKER=true
                shift
                ;;
            --verbose)
                VERBOSE=true
                shift
                ;;
            --help|-h)
                show_help
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                show_help
                exit 1
                ;;
        esac
    done
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to validate environment
validate_environment() {
    print_info "Validating environment..."

    # Check required commands
    local required_commands=("npm" "docker" "docker-compose" "git")
    for cmd in "${required_commands[@]}"; do
        if ! command_exists "$cmd"; then
            print_error "Required command '$cmd' is not installed or not in PATH"
            exit 1
        fi
    done

    # Check Node.js version (optional warning)
    if command_exists "node"; then
        local node_version=$(node --version | sed 's/v//')
        local major_version=$(echo "$node_version" | cut -d. -f1)
        if [[ $major_version -lt 22 ]]; then
            print_warning "Node.js version $node_version detected. Consider upgrading to v22 or higher."
        fi
    fi

    print_success "Environment validation completed"
}

# ---------------------------------------------------------------------------
# Trivy configuration — v0.69.3
# ---------------------------------------------------------------------------
readonly TRIVY_VERSION="0.69.3"
readonly TRIVY_BASE_URL="https://github.com/aquasecurity/trivy/releases/download/v${TRIVY_VERSION}"

# Hard-coded SHA256 checksums (sourced from the official trivy_0.69.3_checksums.txt)
readonly TRIVY_SHA256_LINUX_AMD64="1816b632dfe529869c740c0913e36bd1629cb7688bd5634f4a858c1d57c88b75"
readonly TRIVY_SHA256_LINUX_ARM64="7e3924a974e912e57b4a99f65ece7931f8079584dae12eb7845024f97087bdfd"
readonly TRIVY_SHA256_LINUX_ARM="d76d7c30829af5349aa2461f6703c56b3e392f7de691a231850c9a4e57827c2b"
readonly TRIVY_SHA256_MACOS_AMD64="fec4a9f7569b624dd9d044fca019e5da69e032700edbb1d7318972c448ec2f4e"
readonly TRIVY_SHA256_MACOS_ARM64="a2f2179afd4f8bb265ca3c7aefb56a666bc4a9a411663bc0f22c3549fbc643a5"

# Outputs "<archive-filename>|<expected-sha256>" for the current OS/arch.
get_trivy_asset_info() {
    local os arch sha256

    case "$(uname -s)" in
        Darwin) os="macOS" ;;
        Linux)  os="Linux"  ;;
        *)
            print_error "Unsupported OS for trivy download: $(uname -s)"
            exit 1
            ;;
    esac

    case "$(uname -m)" in
        x86_64|amd64)
            arch="64bit"
            if [[ "$os" == "macOS" ]]; then sha256="$TRIVY_SHA256_MACOS_AMD64"
            else                              sha256="$TRIVY_SHA256_LINUX_AMD64"; fi
            ;;
        aarch64|arm64)
            arch="ARM64"
            if [[ "$os" == "macOS" ]]; then sha256="$TRIVY_SHA256_MACOS_ARM64"
            else                              sha256="$TRIVY_SHA256_LINUX_ARM64"; fi
            ;;
        armv7l|armv6l|arm*)
            if [[ "$os" == "Linux" ]]; then
                arch="ARM"
                sha256="$TRIVY_SHA256_LINUX_ARM"
            else
                print_error "ARM architecture is not supported on $os"
                exit 1
            fi
            ;;
        *)
            print_error "Unsupported CPU architecture for trivy: $(uname -m)"
            exit 1
            ;;
    esac

    echo "trivy_${TRIVY_VERSION}_${os}-${arch}.tar.gz|${sha256}"
}

# Download the platform-appropriate trivy archive, verify its SHA256, and
# extract the binary.  Sets TRIVY_BINARY_PATH and TRIVY_TEMP_DIR.
setup_trivy() {
    print_info "Setting up trivy v${TRIVY_VERSION} for vulnerability scanning..."

    local asset_info filename expected_sha archive_path actual_sha
    asset_info=$(get_trivy_asset_info)
    filename="${asset_info%|*}"
    expected_sha="${asset_info#*|}"

    print_info "Platform asset: ${filename}"

    TRIVY_TEMP_DIR=$(mktemp -d)
    archive_path="${TRIVY_TEMP_DIR}/${filename}"

    # --- Download ---
    print_info "Downloading ${TRIVY_BASE_URL}/${filename} ..."
    if ! curl -fsSL "${TRIVY_BASE_URL}/${filename}" -o "$archive_path"; then
        print_error "Failed to download trivy binary"
        rm -rf "$TRIVY_TEMP_DIR"; TRIVY_TEMP_DIR=""
        exit 1
    fi

    # --- Verify SHA256 ---
    print_info "Verifying SHA256 checksum..."
    if command_exists shasum; then
        actual_sha=$(shasum -a 256 "$archive_path" | awk '{print $1}')
    elif command_exists sha256sum; then
        actual_sha=$(sha256sum "$archive_path" | awk '{print $1}')
    else
        print_error "No SHA256 tool found (shasum or sha256sum required)"
        rm -rf "$TRIVY_TEMP_DIR"; TRIVY_TEMP_DIR=""
        exit 1
    fi

    if [[ "$actual_sha" != "$expected_sha" ]]; then
        print_error "SHA256 checksum mismatch for trivy archive!"
        print_error "  Expected : $expected_sha"
        print_error "  Actual   : $actual_sha"
        rm -rf "$TRIVY_TEMP_DIR"; TRIVY_TEMP_DIR=""
        exit 1
    fi
    print_success "SHA256 checksum verified"

    # --- Extract ---
    print_info "Extracting trivy binary..."
    tar -xzf "$archive_path" -C "$TRIVY_TEMP_DIR" trivy
    TRIVY_BINARY_PATH="${TRIVY_TEMP_DIR}/trivy"
    chmod +x "$TRIVY_BINARY_PATH"
    print_success "Trivy binary ready: ${TRIVY_BINARY_PATH}"
}

# Remove the trivy binary and its containing temp directory.
cleanup_trivy() {
    if [[ -n "${TRIVY_TEMP_DIR:-}" && -d "${TRIVY_TEMP_DIR}" ]]; then
        print_info "Removing trivy binary and temporary files..."
        rm -rf "$TRIVY_TEMP_DIR"
        TRIVY_TEMP_DIR=""
        TRIVY_BINARY_PATH=""
        print_success "Trivy binary removed"
    fi
}

# Scan a Docker image with trivy for HIGH/CRITICAL vulnerabilities.
# The binary is always deleted before this function returns — even on failure.
scan_docker_image_with_trivy() {
    local image_name="$1"
    print_info "Scanning Docker image '${image_name}' with trivy (HIGH + CRITICAL)..."

    local scan_exit_code=0

    if [[ "$VERBOSE" == true ]]; then
        "$TRIVY_BINARY_PATH" image \
            --severity HIGH,CRITICAL \
            --exit-code 1 \
            --no-progress \
            "$image_name" || scan_exit_code=$?
    else
        local scan_output
        scan_output=$("$TRIVY_BINARY_PATH" image \
            --severity HIGH,CRITICAL \
            --exit-code 1 \
            --no-progress \
            "$image_name" 2>&1) || scan_exit_code=$?
        # Always print the report so developers can act on findings
        echo "$scan_output"
    fi

    # Delete the binary BEFORE deciding whether to fail the build
    cleanup_trivy

    if [[ $scan_exit_code -ne 0 ]]; then
        print_error "HIGH or CRITICAL vulnerabilities detected in '${image_name}'."
        print_error "Please remediate the findings reported above before proceeding."
        exit 1
    fi

    print_success "No HIGH or CRITICAL vulnerabilities found in '${image_name}'"
}
# ---------------------------------------------------------------------------

parse_arguments "$@"

# Validate argument combinations
validate_arguments() {
    local has_conflicts=false

    print_info "Validating argument combinations..."

    # Check for conflicting combinations
    if [[ "$UPDATE_SNAPSHOTS" == true && "$SKIP_SNAPSHOT_TESTS" == true ]]; then
        print_error "Conflicting options detected:"
        print_error "   --update-snapshots requires snapshot tests to run"
        print_error "   --skip-snapshot-tests prevents snapshot tests from running"
        print_error "   These options cannot be used together."
        has_conflicts=true
    fi

    if [[ "$UPDATE_SNAPSHOTS" == true && "$SKIP_DOCKER" == true ]]; then
        print_error "Problematic combination detected:"
        print_error "   --update-snapshots requires Docker to run snapshot tests"
        print_error "   --skip-docker prevents Docker from running"
        print_error "   Consider removing --skip-docker if you need to update snapshots"
        has_conflicts=true
    fi

    # Auto-enable skip snapshot tests if Docker is skipped (only if no conflicts)
    if [[ "$SKIP_DOCKER" == true && "$SKIP_SNAPSHOT_TESTS" == false && "$has_conflicts" == false ]]; then
        print_info "Auto-adjustment: Enabling --skip-snapshot-tests since --skip-docker was specified"
        print_info "   (Snapshot tests require Docker to run)"
        SKIP_SNAPSHOT_TESTS=true
    fi

    if [[ "$has_conflicts" == true ]]; then
        echo ""
        print_error "Cannot proceed with conflicting options. Please fix the above issues and try again."
        echo ""
        print_info "Suggested fixes:"
        echo "   • Remove conflicting flags"
        echo "   • Use ./local_build_script.sh --help to see compatible combinations"
        echo "   • For fast development: --skip-docker --skip-tests"
        echo "   • For snapshot updates: --update-snapshots (without --skip-docker)"
        echo ""
        exit 1
    fi

    print_success "Argument validation passed"
}

# Main execution
main() {
    local start_time=$(date +%s)

    validate_arguments
    validate_environment

    # Get and validate project root directory
    readonly PROJECT_ROOT="$(pwd)"
    readonly CORE_COMPONENTS_DIR="$PROJECT_ROOT/packages/core-components"

    print_info "Project root: $PROJECT_ROOT"

    # Display configuration state
    print_info "Configuration Summary:"
    echo "  Reset local changes:        $(if [[ "$RESET_LOCAL_CHANGES" == true ]]; then echo -e "${YELLOW}ENABLED${NC}"; else echo -e "${RED}DISABLED${NC}"; fi)"
    echo "  Update snapshots:           $(if [[ "$UPDATE_SNAPSHOTS" == true ]]; then echo -e "${GREEN}ENABLED${NC}"; else echo -e "${RED}DISABLED${NC}"; fi)"
    echo "  Run Storybook:              $(if [[ "$RUN_STORYBOOK" == true ]]; then echo -e "${GREEN}ENABLED${NC}"; else echo -e "${RED}DISABLED${NC}"; fi)"
    echo "  Skip tests:                 $(if [[ "$SKIP_TESTS" == true ]]; then echo -e "${YELLOW}ENABLED${NC}"; else echo -e "${GREEN}DISABLED${NC}"; fi)"
    echo "  Skip snapshot tests:        $(if [[ "$SKIP_SNAPSHOT_TESTS" == true ]]; then echo -e "${YELLOW}ENABLED${NC}"; else echo -e "${GREEN}DISABLED${NC}"; fi)"
    echo "  Skip Docker Build:          $(if [[ "$SKIP_DOCKER" == true ]]; then echo -e "${YELLOW}ENABLED${NC}"; else echo -e "${GREEN}DISABLED${NC}"; fi)"
    echo "  Verbose output:             $(if [[ "$VERBOSE" == true ]]; then echo -e "${GREEN}ENABLED${NC}"; else echo -e "${RED}DISABLED${NC}"; fi)"
    echo ""

    if [[ ! -f "$PROJECT_ROOT/package.json" ]]; then
        print_error "No package.json found in $PROJECT_ROOT"
        print_error "Please run this script from the project root directory"
        exit 1
    fi

    # Clean up previous builds
    print_info "Cleaning up previous builds..."
    if [[ "$RESET_LOCAL_CHANGES" == true ]]; then
        print_warning "Resetting local changes..."
        git reset HEAD --hard
    fi

    rm -rf "$CORE_COMPONENTS_DIR/docs-build"

    # Run linting, building, and testing
    print_info "Running lint and build..."
    cd "$PROJECT_ROOT"

    if [[ "$VERBOSE" == true ]]; then
        cd "$CORE_COMPONENTS_DIR"
        npm run lint:fix
        cd "$PROJECT_ROOT"
        npm run lint
        npm run build
    else
        cd "$CORE_COMPONENTS_DIR"
        npm run lint:fix > /dev/null 2>&1 || { print_error "Linting fixing failed"; exit 1; }
        cd "$PROJECT_ROOT"
        npm run lint > /dev/null 2>&1 || { print_error "Linting failed"; exit 1; }
        npm run build > /dev/null 2>&1 || { print_error "Build failed"; exit 1; }
    fi

    if [[ "$SKIP_TESTS" == false ]]; then
        print_info "Running tests..."
        if [[ "$VERBOSE" == true ]]; then
            npm run test
        else
            npm run test > /dev/null 2>&1 || { print_error "Tests failed"; exit 1; }
        fi
    else
        print_warning "Skipping tests (--skip-tests flag used)"
    fi

    # Build Storybook
    print_info "Building Storybook..."
    if [[ ! -d "$CORE_COMPONENTS_DIR" ]]; then
        print_error "Directory $CORE_COMPONENTS_DIR does not exist"
        exit 1
    fi

    cd "$CORE_COMPONENTS_DIR"
    if [[ "$VERBOSE" == true ]]; then
        npm run build:storybook
    else
        npm run build:storybook > /dev/null 2>&1 || { print_error "Storybook build failed"; exit 1; }
    fi

    # Copy dist to docs-build
    if [[ ! -d "dist" ]]; then
        print_error "dist directory not found in $CORE_COMPONENTS_DIR"
        exit 1
    fi

    mkdir -p docs-build
    cp -r dist docs-build/design-system
    print_success "Storybook built and copied to docs-build"

    # Build Docker image if flags allow
    if [[ "$SKIP_DOCKER" == true ]]; then
        print_warning "Skipping Docker build (--skip-docker flag used)"
    else
        print_info "Building Docker image..."
        cd "$PROJECT_ROOT"
        if [[ ! -f "Dockerfile" ]]; then
            print_error "Dockerfile not found in $PROJECT_ROOT"
            exit 1
        fi

        # Download and verify trivy BEFORE building the image so the binary is
        # immediately available for scanning once the build completes.
        setup_trivy

        if [[ "$VERBOSE" == true ]]; then
            docker build -f Dockerfile -t b2bds-docs .
        else
            docker build -f Dockerfile -t b2bds-docs . > /dev/null 2>&1 || { print_error "Docker build failed"; exit 1; }
        fi

        # Scan the freshly built image; the binary is deleted inside this call.
        scan_docker_image_with_trivy "b2bds-docs"
    fi

    # Run snapshot tests
    if [[ "$SKIP_SNAPSHOT_TESTS" == true ]]; then
        print_warning "Skipping snapshot tests (--skip-snapshot-tests flag used)"
    else
        if [[ "$UPDATE_SNAPSHOTS" == true ]]; then
            print_info "Regenerating test snapshots..."
            docker-compose run run-tests npx test-storybook --verbose --url http://storybook.local:6006 -u
        else
            print_info "Running snapshot tests..."
            docker-compose up --build --abort-on-container-exit
        fi
    fi

    # Start development server
    print_info "Starting development server..."
    cd "$CORE_COMPONENTS_DIR"

    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    print_success "Build completed successfully in ${duration}s"
    print_info "Starting Storybook development server..."

    # This will block and start the dev server
    if [[ "$RUN_STORYBOOK" == true ]]; then
        print_info "Running Storybook instead of Stencil..."
        cd "$CORE_COMPONENTS_DIR"
        npm run storybook
        cd "$PROJECT_ROOT"
    else
        print_info "Running Stencil..."
        npm start
    fi
}

# Trap to cleanup on script exit (handles unexpected termination too)
cleanup() {
    cleanup_trivy
    if [[ -n "${PROJECT_ROOT:-}" ]]; then
        cd "$PROJECT_ROOT"
    fi
}
trap cleanup EXIT

# Run main function
main "$@"
