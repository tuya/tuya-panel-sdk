module.exports = {
  extends: ['tuya-panel'],
  plugins: ['literal-check'],
  rules: {
    'literal-check/literal-check': [
      2,
      ['tuya.ai', 'tuya.ia', 'tuya.m', 'tuya.industry', 'tuya.smarthome'],
      ['tuya.m.device.media.latest', 'tuya.m.device.media.detail', 'tuya.m.s'],
    ],
  },
};
