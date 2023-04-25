# 003. Release strategy

## 3.1 Semantic Release

Date: 28.03.2022

### Status

accepted

### Context

With the support of npm packages distributions we want to automate our release process as early as possible.

We would like to follow the [semver](https://semver.org/spec/v0.1.0.html) specification for versioning of releases. 
To automate this process we implemented the tool [semantic-release](https://github.com/semantic-release/semantic-release).


### How does it work

In the file release.config.js we can configure semantic-release to do the following:

1. Analyse all available commits in the current branch (@semantic-release/commit-analyzer)

    This will determine the next version number for the release following these rules:
   
   **breaking change**: major

   **feat**: minor

   **fix**: patch

2. Generate the changelog (@semantic-release/release-notes-generator, @semantic-release/changelog)
3. Execute a script to automatically update all package.json files in the monorepo to the new version 
   (@semantic-release/exec)
3. Execute a script to publish the new version npm packages to GitHub packages of our distributions 
   (@semantic-release/exec)
4. Create a new commit that will push the changelog file and package.json fields (@semantic-release/git)
5. Publish on our GitHub repo the [release notes](https://github.com/otto-ec/b2b-design-system/releases) 
   (@semantic-release/github) 

### Development Options

1. Until we reach base maturity in our product, we will release to branch beta, which will create releases in the 
   format `x.x.x-beta`. Once we have priority 1 components ready, we can merge beta to main and then just continue 
   with normal feature branches 
2. Not using `beta` branch. We run the risk reaching early big release numbers as we could potentially be 
   making many breaking changes.

## Decision
We are using a GitHub workflow `release.yml` that is triggered manually from GH Actions ui, by choosing from 
which branch we
are releasing. With this information the semantic-release tool will run as expected and release a new version
depending on the branch selected.


## Consequences

This automation will help us speed up our release process by eliminating all manual steps involved including tagging,
creating change logs and publishing packages.

Later down the road this will facilitate contribution as teams can contribute to separate pr-release branches until 
they are ready to publish.

## Links

[semver](https://semver.org/spec/v0.1.0.html)

[semantic-release](https://github.com/semantic-release/semantic-release)

[Publishing pre-releases](https://github.com/semantic-release/semantic-release/blob/master/docs/recipes/release-workflow/pre-releases.md#publishing-pre-releases)
