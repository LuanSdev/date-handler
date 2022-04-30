module.exports = {
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ['airbnb-base'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'class-methods-use-this': 'off',
    'no-underscore-dangle': 'off',
    'lines-between-class-members': 'off',
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'spaced-comment': 'off',
  },
};
