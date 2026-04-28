#!/usr/bin/env bash
set -euo pipefail

_verify_trivy_action_sha() {
    TRIVY_ACTION_VERSION="0.35.0"
    TRIVY_ACTION_EXPECTED_SHA="57a97c7e7821a5776cebc9bb87c984fa69cba8f1"
    TRIVY_ACTION_ACTUAL_SHA=$(curl -sf \
        -H "Accept: application/vnd.github+json" \
        "https://api.github.com/repos/aquasecurity/trivy-action/git/ref/tags/${TRIVY_ACTION_VERSION}" \
        | jq -r '.object.sha')

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
