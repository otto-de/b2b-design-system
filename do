#!/usr/bin/env bash

set -euo pipefail

task_usage() {
  cat <<HEREDOC
Available commands:

  rm-deps             remove all node-modules directories in the monorepo
  build-test-image    build docker image to run visual regression tests
  visual-tests        runs visual tests in docker container. Needs storybook running in local machine
  visual-tests-update runs visual tests as previous command and updates snapshots that need to change

HEREDOC
exit 1
}

task_cmd_dep() {
  find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
}

task_cmd_test_visual_build_docker_image() {
  docker build -f test.Dockerfile -t test-docker .
}

task_cmd_test_visual_run_tests() {
  #Needs storybook running on the host machine
  #Needs access to host storage for snapshot comparison, hence the -v flag and host dir
  docker run -it -v $(pwd):/b2b --network="host" test-docker
}

task_cmd_test_visual_update_tests() {
  #Needs storybook running on the host machine
  #Needs access to host storage for snapshot comparison, hence the -v flag and host dir
  docker run -it -v $(pwd):/b2b --network="host" test-docker -- --updateSnapshot
}

CMD=${1:-}
shift || true
case ${CMD} in
  rm-deps)                      task_cmd_dep ;;
  build-test-image)             task_cmd_test_visual_build_docker_image ;;
  visual-tests)                 task_cmd_test_visual_run_tests ;;
  visual-tests-update)          task_cmd_test_visual_update_tests ;;
  *)                            task_usage ;;
esac
