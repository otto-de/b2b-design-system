#! /usr/bin/env bash

branch="${1}"

tag=$branch
if [[ $branch = 'main' ]] || [[ ! -n $branch ]];
then
  tag="latest"
fi

if [[ -f ~/.npmrc ]];
then
  echo Backing up .npmrc before publishing
  mv ~/.npmrc ~/backup.npmrc
fi

echo publishing on tag ${tag}
npm publish --provenance --workspace packages/ --tag=$tag

if [[ -f ~/backup.npmrc ]];
then
  echo Restoring .npmrc after publishing
  mv ~/backup.npmrc ~/.npmrc
fi