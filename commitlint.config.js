module.exports = {
  extends: ['cz'],
  rules: {
    // must add these rules
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'scope-case': [2, 'always', 'pascal-case'],
  },
};
