module.exports = {
  extends: ['tuya-panel'],
  plugins: ['literal-check'],
  rules: {
    'literal-check/literal-check': [
      2,
      ['tuya.'],
      ['tuya.m.device.media.latest', 'tuya.m.device.media.detail'],
    ],
  },
};
