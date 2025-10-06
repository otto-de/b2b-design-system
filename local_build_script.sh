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

parse_arguments "$@"

# Validate argument combinations
validate_arguments() {
    local has_conflicts=false
    
    print_info "Validating argument combinations..."
    
    # Check for conflicting combinations
    if [[ "$UPDATE_SNAPSHOTS" == true && "$SKIP_SNAPSHOT_TESTS" == true ]]; then
        print_error "❌ Conflicting options detected:"
        print_error "   --update-snapshots requires snapshot tests to run"
        print_error "   --skip-snapshot-tests prevents snapshot tests from running"
        print_error "   These options cannot be used together."
        has_conflicts=true
    fi
    
    if [[ "$UPDATE_SNAPSHOTS" == true && "$SKIP_DOCKER" == true ]]; then
        print_error "❌ Problematic combination detected:"
        print_error "   --update-snapshots requires Docker to run snapshot tests"
        print_error "   --skip-docker prevents Docker from running"
        print_error "   Consider removing --skip-docker if you need to update snapshots"
        has_conflicts=true
    fi
    
    # Auto-enable skip snapshot tests if Docker is skipped (only if no conflicts)
    if [[ "$SKIP_DOCKER" == true && "$SKIP_SNAPSHOT_TESTS" == false && "$has_conflicts" == false ]]; then
        print_info "🔧 Auto-adjustment: Enabling --skip-snapshot-tests since --skip-docker was specified"
        print_info "   (Snapshot tests require Docker to run)"
        SKIP_SNAPSHOT_TESTS=true
    fi
    
    if [[ "$has_conflicts" == true ]]; then
        echo ""
        print_error "Cannot proceed with conflicting options. Please fix the above issues and try again."
        echo ""
        print_info "💡 Suggested fixes:"
        echo "   • Remove conflicting flags"
        echo "   • Use ./local_build_script.sh --help to see compatible combinations"
        echo "   • For fast development: --skip-docker --skip-tests"
        echo "   • For snapshot updates: --update-snapshots (without --skip-docker)"
        echo ""
        exit 1
    fi
    
    print_success "✅ Argument validation passed"
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
        npm run lint
        npm run build
    else
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
        
        if [[ "$VERBOSE" == true ]]; then
            docker build -f Dockerfile -t b2bds-docs .
        else
            docker build -f Dockerfile -t b2bds-docs . > /dev/null 2>&1 || { print_error "Docker build failed"; exit 1; }
        fi
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

# Trap to cleanup on script exit
cleanup() {
    if [[ -n "${PROJECT_ROOT:-}" ]]; then
        cd "$PROJECT_ROOT"
    fi
}
trap cleanup EXIT

# Run main function
main "$@"