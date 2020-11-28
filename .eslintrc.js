module.exports = {
  extends: ['tuya-panel'],
  plugins: ['literal-blacklist', 'optimize-regex'],
  rules: {
    'literal-blacklist/literal-blacklist': [
      2,
      ['tuya.ai', 'tuya.ia', 'tuya.industry', 'tuya.smarthome'],
    ],
  },
};
