## Usage

### Local Test Script

For the ease of development and testing process, a new script has been added named `local_build_script.sh` in the root
directory. This script helps with automating the build and test process to speed up local testing post development.


The script can be executed using `./local_build_script.sh` or `sh local_build_script.sh` commands.

Option currently supported by the script:
```text
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
```

### Build

Whenever you make changes to a component or create a new one, you need to rebuild the storybook image
to include possible differences to test existing screenshots against. To build, run:

`docker-compose up --build` 

This rebuilds the storybook and test-runner services to include recent changes and run the tests against them.

### Update Snapshots

If there is a new component, simply rebuilding starting the services is enough as the normal entrypoint automatically adds new screenshots.
However, if you made intended visual changes to an existing component, you will need to run: 

`docker-compose run run-tests npx test-storybook --verbose --url http://storybook.local:6006 -u`

to override the default command and update the snapshots.