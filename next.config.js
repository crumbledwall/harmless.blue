// eslint-disable-next-line @typescript-eslint/no-var-requires
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

module.exports = {
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
  images: {
    domains: ['thirdqq.qlogo.cn']
  },
  experimental: {
    images: {
      unoptimized: true
    }
  }
}
