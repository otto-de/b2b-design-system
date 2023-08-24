module.exports = {
  "branches": [
    '+([0-9])?(.{+([0-9]),x}).x',
    'main',
    'next',
    'next-major',
    {name: 'beta', prerelease: true},
    {name: 'alpha', prerelease: true}
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/exec',
      {
        // Updates package.json files to next version
        "prepareCmd": "node ./scripts/update-packages-version.mjs ${nextRelease.version}",
      }
    ],
    [
      '@semantic-release/exec',
      {
        "publishCmd": "./scripts/publish.sh ${branch.name}",
      }
    ],
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', ['./**/package.json','!**/node_modules/**']]
      }
    ],
    '@semantic-release/github',
  ]
}
