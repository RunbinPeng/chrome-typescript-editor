
const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
const ChromeExtensionReloader  = require('webpack-extension-reloader')

const path = require('path')

const isDevelopment = process.env.NODE_ENV === 'development'
const isAnalyzeMode = process.env.ANALYZE || false

const config = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    vendor: path.resolve(__dirname, 'src/main.ts'),
    background: path.resolve(__dirname, 'src/background/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new VueLoaderPlugin(),
    isDevelopment ? null : new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        { from: path.resolve(__dirname, 'template') }
      ]
    }),
    new MonacoWebpackPlugin({
      languages: ['typescript', 'javascript'], // ensure bundle this two languages type to lighten final size
    }),
    isDevelopment ? new webpack.HotModuleReplacementPlugin() : null,
    isAnalyzeMode ? new BundleAnalyzerPlugin() : null,
    isDevelopment ? new ChromeExtensionReloader() : null,
  ].filter(Boolean),
  optimization: isDevelopment ? {} : {
    minimize: true,
    minimizer: [new TerserPlugin({
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        }
      },
      extractComments: false,
      exclude: /node_modules/,
      parallel: true, // Use multi-process parallel running to improve the build speed
    })],
  },
  module: {
    rules: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader:'ts-loader',
            options: {
              transpileOnly: true,
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s[ac]ss$/i,
        use: [ "vue-style-loader", "css-loader", "sass-loader" ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    port: 9000, // Visit localhost:9000/webpack-dev-server, and  You can see all files here
    hot: true,
  },
  watch: isDevelopment,
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000
  }
}

module.exports = config