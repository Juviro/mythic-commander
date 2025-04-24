module.exports = {
  extends: ['airbnb-base', 'prettier', 'node'],
  plugins: ['import', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-new': 0,
    camelcase: 0,
    'no-underscore-dangle': 0,
    'import/no-import-module-exports': 0,
    'no-restricted-syntax': 0,
    'no-continue': 0,
    'no-await-in-loop': 0,
    'no-process-exit': 0,
    'no-console': "error",
    'import/no-nodejs-modules': 0,
    'import/prefer-default-export': 0,
    'import/no-namespace': 0,
    'arrow-body-style': 0,
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
  },
  ignorePatterns: ['dist/', 'node_modules/', ".eslintrc.js"],
  env: {
    es6: true,
  },
};
