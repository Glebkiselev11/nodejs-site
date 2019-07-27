module.exports = {
    env: {
      node: true,
      'jest/globals': true,
    },
    extends: ['airbnb-base', 'prettier'],
    plugins: ['jest'],
    overrides: [
      {
        files: ['**/?(*.)+(test|unit).js'],
        env: {
          jest: true,
        },
      },
    ],
    rules: {
      'no-console': 'off',
      'class-methods-use-this': 'off',
      'no-param-reassign': ['error', { props: false }],
      'no-plusplus': 'off',
      "no-param-reassign" : 'off',
      "prefer-destructuring" : 'off',
      "camelcase" : 'off'
    },
  };