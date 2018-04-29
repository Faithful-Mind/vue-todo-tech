const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.styl/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader'
        ]
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: '[name].[ext]',
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // similar to C-lang's #define keyword. Hence string need to be in quotes
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"' // Defines here. So you can refer to it in this project.
      }
    }),
    new HTMLPlugin()
  ]
}

if (isDev) {
  config.devtool = '#cheap-module-eval-source-map' // map the compiled code to source code in browser's dev tool
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true, // show errors on web page
    },
    hot: true, // only refresh changed components instead of whole page. Need to pair with corresponding plugins.
    // histoyFallback: {} // used to map unknown path to index.html
  },
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin
  )
}

module.exports = config