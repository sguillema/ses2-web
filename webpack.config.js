// For Webstorm
// This webpack config is invalid for nuxt, but not for WEBSTORM
// It is purely for IDE module resolution

const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
      '~': path.resolve(__dirname)
    }
  }
}
