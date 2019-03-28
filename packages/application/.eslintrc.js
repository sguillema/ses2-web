module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['@nuxtjs', 'plugin:prettier/recommended', 'plugin:vue/recommended'],
  plugins: ['prettier'],
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
    ]
  },
  globals: {}
}
