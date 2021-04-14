
const { VueLoaderPlugin } = require('vue-loader')
const CopyPlugin = require("copy-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require("terser-webpack-plugin")
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
const ChromeExtensionReloader  = require('webpack-extension-reloader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssWebpackPlugin = require('mini-css-extract-plugin')
const NodePolyfillWebpackPlugin = require('node-polyfill-webpack-plugin')

const path = require('path')

const isDevelopment = process.env.NODE_ENV === 'development'
const isAnalyzeMode = process.env.ANALYZE || false

const config = {
  mode: isDevelopment ? 'development' : 'production',
  entry: {
    vendor: path.resolve(__dirname, 'src/main.ts'),
    background: path.resolve(__dirname, 'src/background/index.ts'),
    devtools: path.resolve(__dirname, 'src/devtools/index.ts'),
    ['content-script']: path.resolve(__dirname, 'src/content-script/index.ts')
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
        { from: path.resolve(__dirname, 'src/manifest.json') },
        { from: path.resolve(__dirname, 'template') }
      ]
    }),
    new MonacoWebpackPlugin({
      languages: ['typescript', 'javascript'], // ensure bundle this two languages type to lighten final size
    }),
    isDevelopment ? new webpack.HotModuleReplacementPlugin() : null,
    isAnalyzeMode ? new BundleAnalyzerPlugin() : null,
    isDevelopment ? new ChromeExtensionReloader() : null,
    new HtmlWebpackPlugin({
      filename: 'devtools.html',
      template: 'template/index.html',
      inject: 'body',
      chunks: ['vendor', 'devtools']
    }),
    new MiniCssWebpackPlugin(),
    new NodePolyfillWebpackPlugin(),
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
        test: /\.js$/,
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
        use: [MiniCssWebpackPlugin.loader, "css-loader", "sass-loader" ],
      },
      {
        test: /\.css$/,
        use: [MiniCssWebpackPlugin.loader, 'css-loader']
      },
      {
        test: /\.ttf$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      fs: false,
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    port: 9001, // Visit /webpack-dev-server, and  You can see all files here
    hot: true,
  },
  watch: isDevelopment,
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000
  }
}

module.exports = config