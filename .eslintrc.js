module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: [
          './src',
        ],
      },
    },
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'import/extensions': ['error', 'never'],
    'react/prop-types': 'off', // No usamos proptypes
    'react/require-default-props': 'off', // No usamos proptypes
    'import/prefer-default-export': 'off', // capaz la habilito
    'react-hooks/rules-of-hooks': 'off', // investigar para que es
    'react-hooks/exhaustive-deps': 'off', // investigar para que es
    'react/function-component-definition': 'off', // investigar para que es
    'react/jsx-props-no-spreading': 'off', // investigar para que es
    'react/jsx-filename-extension': 'off', // investigar para que es
    'object-curly-newline': 'off',
    'import/no-extraneous-dependencies': 'off',
    'react/jsx-one-expression-per-line': 0,
    'react/no-unescaped-entities': 0,
  },
};
