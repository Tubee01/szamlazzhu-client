/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  collectCoverage: true,
  setupFiles: ['dotenv/config'],
  globals: {
    'ts-jest': {
      diagnostics: {
        exclude: ['**'],
      },
    },
  },
};
