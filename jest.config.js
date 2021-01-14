const JEST_TEST_DIR = process.argv[2];

let testMatchDir =
  '<rootDir>/packages/tuya-panel-animation-sdk/src/components/**/__tests__/?(*.)+(test).[jt]s?(x)';
let coverageDirectoryDir = 'packages/tuya-panel-animation-sdk/coverage/';
let collectCoverageFromDir = 'packages/tuya-panel-animation-sdk/src/components/**/*.tsx';
if (JEST_TEST_DIR) {
  testMatchDir = `<rootDir>/packages/${JEST_TEST_DIR}/src/components/**/__tests__/?(*.)+(test).[jt]s?(x)`;
  coverageDirectoryDir = `<rootDir>/packages/${JEST_TEST_DIR}/coverage`;
  collectCoverageFromDir = `packages/${JEST_TEST_DIR}/src/components/**/*.[jt]s?(x)`;
}

module.exports = {
  preset: 'react-native',
  verbose: true,
  collectCoverage: true,
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  moduleNameMapper: {
    '^image![a-zA-Z0-9$_-]+$': 'GlobalImageStub',
    '^[@./a-zA-Z0-9$_-]+\\.(png|gif)$': 'RelativeImageStub',
    'tuya-panel-kit$': '<rootDir>/__mock__/tuya-panel-kit',
  },
  coverageDirectory: coverageDirectoryDir,
  collectCoverageFrom: [collectCoverageFromDir],
  testMatch: [testMatchDir],
  modulePathIgnorePatterns: ['<rootDir>/example/node_modules', '<rootDir>/example'],
  testEnvironment: 'node',
  globals: {
    __DEV__: true,
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  transformIgnorePatterns: ['node_modules/(?!react-native|react-native-svg/)'],
  testPathIgnorePatterns: ['node_modules'],
};
