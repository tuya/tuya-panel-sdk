module.exports = {
  preset: 'react-native',
  verbose: true,
  collectCoverage: true,
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  moduleNameMapper: {
    '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
    '^[@./a-zA-Z0-9$_-]+\\.(png|gif)$': 'RelativeImageStub',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/example',
    '<rootDir>/example/node_modules',
    '<rootDir>/packages/*/lib',
    '<rootDir>/packages/tuya-panel-api',
  ],
  testEnvironment: 'node',
  globals: {
    __DEV__: true,
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: [
    'node_modules/(?!react-native|react-native-svg/|@react-native-community/blur/|tuya-panel-theme)',
  ],
  testPathIgnorePatterns: ['node_modules'],
};
