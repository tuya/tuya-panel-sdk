module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          // 'tuya-panel-sdk': '../packages/tuya-panel-sdk/lib/index.js',
          // 'tuya-panel-cbt-sdk': '../packages/tuya-panel-cbt-sdk/lib/index.js',
          // 'tuya-panel-lamp-sdk': '../packages/tuya-panel-lamp-sdk/lib/index.js',
          '@tuya-smart/tuya-panel-robot-sdk': '../packages/tuya-panel-robot-sdk/lib/index.js',
          // 'tuya-panel-standard-sdk': '../packages/tuya-panel-standard-sdk/lib/index.js',
          // 'tuya-panel-os-sdk': '../packages/tuya-panel-os-sdk/lib/index.js',
          // 'tuya-panel-theme': '../packages/tuya-panel-theme/lib/index.js',
          // 'tuya-panel-health-sdk': '../packages/tuya-panel-health-sdk/lib/index.js',
          // 'tuya-panel-fullroom-sdk': '../packages/tuya-panel-fullroom-sdk/lib/index.js',
          // 'tuya-panel-gateway-sdk': '../packages/tuya-panel-gateway-sdk/lib/index.js',
          '@tuya-smart/tuya-panel-ipc-sdk': '../packages/tuya-panel-ipc-sdk/lib/index.js',
          // 'tuya-panel-lock-sdk': '../packages/tuya-panel-lock-sdk/lib/index.js',
          // 'tuya-panel-electrician-sdk/lib/index.js': '../packages/tuya-panel-electrician-sdk/lib/index.js',
          // 'tuya-panel-remote-sdk': '../packages/tuya-panel-remote-sdk/lib/index.js',
          '@tuya-smart/tuya-panel-animation-sdk':
            '../packages/tuya-panel-animation-sdk/lib/index.js',
        },
      },
    ],
  ],
};
