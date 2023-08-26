module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'prettier'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.ts'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'prettier'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/jsx-filename-extension': [1, { 'extensions': ['.tsx', '.jsx'] }],
    'react/react-in-jsx-scope': 'off',
    'prettier/prettier': ['error', {
      singleQuote: true,
    }],
    'no-console': 'off',
    'no-unused-vars': 'off',
  },
}
