const base = require('./jest.config.base.js');

// Guide to use Jest with Lerna
module.exports = {
  ...base,
  projects: ['<rootDir>/packages/*/jest.config.js'],
  coverageDirectory: '<rootDir>/coverage/',
};
