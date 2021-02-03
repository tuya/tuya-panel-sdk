module.exports = {
  extends: '../.eslintrc.js',
  settings: {
    'import/core-modules': [
      '@tuya-smart/tuya-panel-sdk',
      '@tuya-smart/tuya-panel-lamp-sdk',
      '@tuya-smart/tuya-panel-robot-sdk',
      '@tuya-smart/tuya-panel-standard-sdk',
      '@tuya-smart/tuya-panel-os-sdk',
      '@tuya-smart/tuya-panel-health-sdk',
      '@tuya-smart/tuya-panel-fullroom-sdk',
      '@tuya-smart/tuya-panel-gateway-sdk',
      '@tuya-smart/tuya-panel-cbt-sdk',
      '@tuya-smart/tuya-panel-remote-sdk',
      '@tuya-smart/tuya-panel-animation-sdk',
      '@tuya-smart/tuya-panel-animation-sdk',
      '@tuya-smart/tuya-panel-electrician-sdk',
    ],
    'import/no-unresolved': [2, { ignore: ['.png$', '.webp$', '.jpg$'] }],
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
  },
};
