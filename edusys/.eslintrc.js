const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'));

module.exports = {
  root: true,
  plugins: ['prettier'],
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:@angular-eslint/recommended'],
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'linebreak-style': ['error', 'windows'],
    'max-len': [0],
    'prettier/prettier': ['error', prettierOptions],
    'no-explicit-any': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@angular-eslint/directive-class-suffix': 'off',
    '@angular-eslint/no-output-on-prefix': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-case-declarations': 'off',
    'no-prototype-builtins': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-async-promise-executor': 'off',
    'comma-dangle': ['error', 'always-multiline'],
    'no-empty': [0, 'allow-empty-functions', 'allow-empty-catch'],
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: { 'prettier/prettier': ['warn', prettierOptions] },
    },
  ],
};
