module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'plugin:vue/recommended',
    'eslint:recommended',
    'prettier/vue',
    'plugin:prettier/recommended',
    'prettier/standard'
  ],
  plugins: ['prettier', 'standard'],
  // add your custom rules here
  rules: {
    'no-unused-vars': 'warn',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          normal: 'never'
        }
      }
    ],
    'no-console': 'warn',
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never'
        },
        svg: 'always',
        math: 'always'
      }
    ]
  },
  globals: {}
}
