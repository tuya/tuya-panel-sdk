const base = require('./jest.config.base.js');

/**
 * Guide to use Jest with Lerna: https://github.com/facebook/jest/issues/3112
 */
module.exports = {
  ...base,
  projects: ['<rootDir>/packages/*/jest.config.js'],
  coverageDirectory: '<rootDir>/coverage/',
};
