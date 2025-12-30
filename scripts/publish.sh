#! /usr/bin/env bash

branch="${1}"

tag=$branch
if [[ $branch = 'main' ]] || [[ ! -n $branch ]];
then
  tag="latest"
fi

echo publishing on tag ${tag}

# Configure npm authentication if NODE_AUTH_TOKEN or NPM_TOKEN is set
if [ -n "$NODE_AUTH_TOKEN" ] || [ -n "$NPM_TOKEN" ]; then
  TOKEN="${NODE_AUTH_TOKEN:-$NPM_TOKEN}"
  echo "//registry.npmjs.org/:_authToken=${TOKEN}" > ~/.npmrc
  echo "registry=https://registry.npmjs.org/" >> ~/.npmrc
  echo "NPM authentication configured"
fi

npm publish --workspace packages/ --tag=$tag
