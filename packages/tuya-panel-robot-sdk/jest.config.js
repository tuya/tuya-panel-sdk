const base = require('../../jest.config.base.js');
const pkg = require('./package');
module.exports = {
  ...base,
  name: pkg.name,
  displayName: pkg.name,
  rootDir: '../..',
  testMatch: ['<rootDir>/packages/tuya-panel-robot-sdk/src/**/__tests__/?(*.)+(test).[jt]s?(x)'],
  coverageDirectory: '<rootDir>/packages/tuya-panel-robot-sdk/coverage/',
  collectCoverageFrom: ['<rootDir>/packages/tuya-panel-robot-sdk/src/**/*.[jt]s?(x)'],
};
