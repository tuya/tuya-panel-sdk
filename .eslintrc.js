module.exports = {
  extends: ['tuya-panel'],
  plugins: ['literal-blacklist'],
  rules: {
    'literal-blacklist/literal-blacklist': [
      2,
      ['tuya.ai', 'tuya.ia', 'tuya.m', 'tuya.industry', 'tuya.smarthome'],
    ],
  },
};
