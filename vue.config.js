const host = '0.0.0.0'
const port = 8080

const webpack = require('webpack');

module.exports = {
  devServer: {
    host: host,
    port: port,
    publicPath: '/',
    disableHostCheck: true,
    hotOnly: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
  }
}