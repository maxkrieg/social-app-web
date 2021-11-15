module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['jsx-a11y', '@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'prettier'
  ],
  rules: {
    semi: 0,
    'prettier/prettier': 2,
    '@typescript-eslint/no-unused-vars': ['error', { varsIgnorePattern: '^_' }]
  }
}
