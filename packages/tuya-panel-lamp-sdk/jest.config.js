// Jest configuration for api
const base = require('../../jest.config.base.js');
const pkg = require('./package');
module.exports = {
  ...base,
  name: pkg.name,
  displayName: pkg.name,
  rootDir: '../..',
  testMatch: [
    '<rootDir>/packages/tuya-panel-lamp-sdk/src/components/**/**/__tests__/?(*.)+(test).[jt]s?(x)',
  ],
  coverageDirectory: '<rootDir>/packages/tuya-panel-lamp-sdk/coverage/',
  collectCoverageFrom: [
    '<rootDir>/packages/tuya-panel-lamp-sdk/src/components/**/**/*.[jt]s?(x)',
    '!<rootDir>/packages/tuya-panel-lamp-sdk/src/components/picker/rect-color-and-bright-picker/icons/index.ts',
  ],
};
