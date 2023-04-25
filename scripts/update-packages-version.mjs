/*
This script will update all workspaces dependency packages from @otto/b2b-
to the next release version. As well as the package version.
 */

import PackageJson from "@npmcli/package-json";

const updateDependency = (packageJson, packageName, version) => {
  packageJson.update({
    dependencies: {
      ...packageJson.content.dependencies,
      [packageName]: version
    }
  });
}

const updateDependencyVersions = (workspace, workspacePackageJson, nextReleaseVersion) => {
  const workspaceDependencies = workspacePackageJson.content.dependencies

  if (workspaceDependencies) {
    const b2bPackages = Object.keys(workspaceDependencies).filter(dependency => dependency.includes('b2b'))
    if (b2bPackages) {
      b2bPackages.map(b2bPackage => {
        updateDependency(workspacePackageJson, b2bPackage, nextReleaseVersion)
        console.log(`Dependencies updated: ${b2bPackage} to version ${nextReleaseVersion}`)
      })
    }
  }
}

const updatePackageVersion = (packageJson, nextReleaseVersion) => {
  packageJson.update({
    version: nextReleaseVersion
  });
  console.log(`Updated to version ${nextReleaseVersion}`)
}

const updatePackagesVersion = async (nextReleaseVersion) => {
  const packageJson = await PackageJson.load("./")
  const workspaces = packageJson.content.workspaces

  await workspaces.map(async workspace => {
    const workspacePackageJson = await PackageJson.load(workspace)

    console.log(`\nWorkspace ${workspacePackageJson.content.name}:`)
    updatePackageVersion(workspacePackageJson, nextReleaseVersion)
    updateDependencyVersions(workspace, workspacePackageJson, nextReleaseVersion)

    await workspacePackageJson.save()
  })
}

const nextReleaseVersion = process.argv[2]; // first argument
if (nextReleaseVersion) {
  await updatePackagesVersion(nextReleaseVersion)
}
