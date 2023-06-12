# 003. Release strategy

## 3.1 Semantic Release

Date: 28.03.2022

Updated: 12.06.2023

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

### Release types

As we have released a stable version of the library, our release strategy works as follows:

- Any releases run from branch `main` will publish a stable version of the npm package with format `vx.x.x` and tag 
  `latest`.
- Any releases run from `beta` will publish a pre-release version of the npm package with format `vx.x.x-beta.n` and 
  tag `beta`. Where `n` will increase for any new beta release on that `x` version. 

- Beta can be merged into `main` once this pre-release has been tested and approved. Then a new Release should be triggered from `main` to publish a stable release.

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
