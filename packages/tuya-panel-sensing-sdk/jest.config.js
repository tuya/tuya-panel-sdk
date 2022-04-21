// Jest configuration for api
const base = require('../../jest.config.base.js');
const pkg = require('./package.json');

module.exports = {
  ...base,
  name: pkg.name,
  displayName: pkg.name,
  rootDir: '../..',
  testMatch: ['<rootDir>/packages/tuya-panel-sensing-sdk/src/**/__tests__/?(*.)+(test).[jt]s?(x)'],
  coverageDirectory: '<rootDir>/packages/tuya-panel-sensing-sdk/coverage/',
  collectCoverageFrom: ['<rootDir>/packages/tuya-panel-sensing-sdk/src/**/*.[jt]s?(x)'],
  errorOnDeprecated: true, // 抛出有用的错误
};
