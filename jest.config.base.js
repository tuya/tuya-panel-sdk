module.exports = {
  preset: 'react-native',
  verbose: true,
  collectCoverage: true,
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  moduleNameMapper: {
    '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
    '^[@./a-zA-Z0-9$_-]+\\.(png|gif)$': 'RelativeImageStub',
    // 'tuya-panel-kit$': '<rootDir>/__mocks__/tuya-panel-kit',
  },
  modulePathIgnorePatterns: [
    '<rootDir>/example',
    '<rootDir>/example/node_modules',
    '<rootDir>/__mock__/tuya-panel-kit',
    '<rootDir>/__mock__/tuya-panel-kit/components',
  ],
  testEnvironment: 'node',
  globals: {
    __DEV__: true,
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: ['node_modules/(?!react-native|react-native-svg/)'],
  testPathIgnorePatterns: ['node_modules'],
};
