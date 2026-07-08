module.exports = {
  root: true,

  parser: '@typescript-eslint/parser',

  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },

  plugins: [
    '@typescript-eslint',
  ],

  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],

  env: {
    node: true,
    jest: true,
  },

  ignorePatterns: [
    'dist/',
    'node_modules/',
    'coverage/',
  ],

  rules: {
    semi: [
      'error',
      'always',
    ],

    quotes: [
      'error',
      'single',
    ],

    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
      },
    ],

    '@typescript-eslint/explicit-function-return-type': 'off',

    'class-methods-use-this': 'off',

    'no-console': 'warn',

    'max-classes-per-file': 'off',

    'import/prefer-default-export': 'off',

    // Autorise les propriétés privées comme _value dans les Value Objects
    'no-underscore-dangle': [
      'error',
      {
        allow: [
          '_value',
        ],
        allowAfterThis: true,
      },
    ],
  },
};