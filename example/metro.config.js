const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

const modules = [
  'tuya-panel-kit',
  'react',
  'react-native',
  'react-native-svg',
  'react-native-gesture-handler',
];

const root = path.resolve(__dirname, '..');

const blacklistRE = blacklist([
  ...modules.map(m => new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)),
  new RegExp(`^${escape(path.join(root, 'packages/tuya-panel-lamp-sdk/node_modules'))}\\/.*$`),
]);

const extraNodeModules = modules.reduce((acc, name) => {
  acc[name] = path.join(__dirname, 'node_modules', name);
  return acc;
}, {});

module.exports = {
  projectRoot: __dirname,
  watchFolders: [root],
  resolver: {
    blacklistRE,
    extraNodeModules,
  },
};
