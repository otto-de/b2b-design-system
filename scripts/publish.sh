#! /usr/bin/env bash

branch="${1}"

tag=$branch
if [[ $branch = 'main' ]] || [[ ! -n $branch ]];
then
  tag="latest"
fi

echo publishing on tag ${tag}
NPM_AUTH_TOKEN="" npm publish --provenance --workspace packages/ --tag=$tag