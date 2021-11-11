module.exports = {
  extends: ['../.eslintrc.js','plugin:react/recommended'],
  settings: {
    'import/core-modules': [
      '@tuya/tuya-panel-sdk',
      '@tuya/tuya-panel-lamp-sdk',
      '@tuya/tuya-panel-robot-sdk',
      '@tuya/tuya-panel-standard-sdk',
      '@tuya/tuya-panel-os-sdk',
      '@tuya/tuya-panel-health-sdk',
      '@tuya/tuya-panel-fullroom-sdk',
      '@tuya/tuya-panel-gateway-sdk',
      '@tuya/tuya-panel-cbt-sdk',
      '@tuya/tuya-panel-remote-sdk',
      '@tuya/tuya-panel-animation-sdk',
      '@tuya/tuya-panel-ipc-sdk',
      '@tuya/tuya-panel-electrician-sdk',
      '@tuya/tuya-panel-outdoor-sdk',
    ]
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'import/no-cycle': 0,
    'import/no-unresolved': [2, { ignore: ['.png$', '.webp$', '.jpg$'] }],
  },
};
