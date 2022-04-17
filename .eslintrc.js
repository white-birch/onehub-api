module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'prettier/prettier': ['error'],
  },
};
