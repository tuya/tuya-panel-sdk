module.exports = {
  extends: '../.eslintrc.js',
  settings: {
    'import/core-modules': [
      'tuya-panel-sdk',
      'tuya-panel-lamp-sdk',
      'tuya-panel-robot-sdk',
      'tuya-panel-standard-sdk',
      'tuya-panel-os-sdk',
      'tuya-panel-health-sdk',
      'tuya-panel-fullroom-sdk',
      'tuya-panel-gateway-sdk',
      'tuya-panel-cbt-sdk',
      'tuya-panel-remote-sdk',
      'tuya-panel-animation-sdk',
      'tuya-panel-ipc-sdk',
    ],
    'import/no-unresolved': [2, { ignore: ['.png$', '.webp$', '.jpg$'] }],
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
  },
};
