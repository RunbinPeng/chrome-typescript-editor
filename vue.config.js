const monacoWebpackPlugin = require('monaco-editor-webpack-plugin')
module.exports = {
  lintOnSave: false,
  pages: {
    devtools: {
      template: 'public/browser-extension.html',
      entry: './src/devtools/main.js',
      title: 'Devtools'
    }
  },
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background.js'
        },
        contentScripts: {
          entries: {
            'content-script': [
              'src/content-scripts/content-script.js'
            ]
          }
        }
      }
    }
  },
  configureWebpack: {
    plugins: [
      new monacoWebpackPlugin()
    ]
  }
}
