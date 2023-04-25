// Jest configuration to run test directly with jest and not with stencil test command

module.exports = {
  "testEnvironment": "jsdom",
  "preset": "ts-jest/presets/js-with-babel",
  "testRegex": "(/__tests__/.*|\\.(test|spec))\\.(ts|tsx)$",
  "transform": {
    "node_modules/variables/.+\\.(j|t)sx?$": "ts-jest"
  },
  "transformIgnorePatterns": [
    "node_modules/(?!variables/.*)"
  ]
}
