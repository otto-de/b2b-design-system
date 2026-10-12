#!/usr/bin/env bash
set -euo pipefail

_verify_trivy_action_sha() {
    TRIVY_ACTION_VERSION="v0.36.0"
    TRIVY_ACTION_EXPECTED_SHA="ed142fd0673e97e23eac54620cfb913e5ce36c25"
    TRIVY_ACTION_ACTUAL_SHA=$(git ls-remote https://github.com/aquasecurity/trivy-action \
        "refs/tags/${TRIVY_ACTION_VERSION}^{}" | cut -f1)

    echo "Expected SHA : $TRIVY_ACTION_EXPECTED_SHA"
    echo "Actual SHA   : $TRIVY_ACTION_ACTUAL_SHA"

    if [ "$TRIVY_ACTION_ACTUAL_SHA" != "$TRIVY_ACTION_EXPECTED_SHA" ]; then
        echo "❌ SHA mismatch for aquasecurity/trivy-action@$TRIVY_ACTION_VERSION – aborting pipeline."
        exit 1
    fi

    echo "✅ SHA verified – aquasecurity/trivy-action@$TRIVY_ACTION_VERSION matches pinned SHA."
}

# Allow direct invocation: ./ci/init.sh <function_name>
if [[ "${BASH_SOURCE[0]}" == "${0}" ]]; then
    "$@"
fi
