module.exports = {
  extends: [
    'airbnb-typescript',
    'plugin:jest/recommended',
    'plugin:react-native/all',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  parserOptions: {
    project: 'tsconfig.eslint.json',
  },
  env: {
    'react-native/react-native': true,
    'jest/globals': true,
  },
  rules: {
    'global-require': 0,
    'lines-between-class-members': [
      // 要求或禁止在类成员之间出现空行
      2,
      'always',
      {
        exceptAfterSingleLine: true, //  跳过对单行类成员之后的空行的检查
      },
    ],
    'no-useless-constructor': 1,
    'no-nested-ternary': 0, // 禁止使用嵌套的三元表达式
    'no-restricted-globals': 0, // 禁用特定的全局变量
    'no-use-before-define': 0, // 禁止定义前使用
    'no-unused-expressions': 0, // 禁止未使用过的表达式
    'max-classes-per-file': 0,
    'prefer-destructuring': [
      2,
      {
        array: false,
        object: true,
      },
    ],
    'import/prefer-default-export': 0, // When there is only a single export from a module, prefer using default export over named export.
    'import/extensions': 0, // Ensure consistent use of file extension within the import path
    'import/no-extraneous-dependencies': 0, // Forbid the use of extraneous packages
    'import/no-named-as-default-member': 0,
    'jsx-a11y/accessible-emoji': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prefer-stateless-function': 0,
    'react/destructuring-assignment': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/static-property-placement': 0,
    'react/no-unescaped-entities': 0,
    'react-hooks/exhaustive-deps': 0,
    'react-native/no-color-literals': 0,
    'react-native/no-raw-text': 0,
    'react-native/no-inline-styles': 0,
    'react-native/split-platform-components': 0,
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-empty-function': 0,
    '@typescript-eslint/explicit-function-return-type': [
      0,
      {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-empty-interface': 1,
    '@typescript-eslint/explicit-member-accessibility': [2, { accessibility: 'no-public' }],
    '@typescript-eslint/no-use-before-define': [
      2,
      {
        functions: true,
        classes: true,
        variables: false,
      },
    ],
  },
};
