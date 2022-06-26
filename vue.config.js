const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const port = process.env.port || process.env.npm_config_port || 9527 // dev port
const config = {
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: false,
  productionSourceMap: false,
  runtimeCompiler:true,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // 设置proxy
      '/api': {
        target:  "http://localhost:8000",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  css: {
    sourceMap: true,
    loaderOptions:{
      stylus:{
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        import: [path.join(__dirname,"./src/style/index.styl")],
        globalVars: {
          primary: '#fff'
        }
      },
    }
  },
  configureWebpack: {
    name: "blog",
    resolve: {
      alias: {
        '@': resolve('src'),
        '@theme': resolve('theme'),
        '@theme-default': resolve('theme-default'),
        '@plugins': resolve('src/plugins'),
        '@components': resolve('src/components')
      }
    },
    plugins:[]
  },
  chainWebpack(config) {
    config.module
        .rule('js')
        .use('babel-loader')
        .loader("babel-loader")
        .end()

    // config.plugin('preload').tap(() => [
    //   {
    //     rel: 'preload',
    //     fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
    //     include: 'initial'
    //   }
    // ])

    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
        .rule('svg')
        .exclude.add(resolve('src/icons'))
        .end()
    config.module
        .rule('icons')
        .test(/\.svg$/)
        .include.add(resolve('src/icons'))
        .end()
        .use('svg-sprite-loader')
        .loader('svg-sprite-loader')
        .options({
          symbolId: 'icon-[name]'
        })
        .end()
    config.module
        .rule('md')
        .test(/\.md/)
        .use('vue-loader')
        .loader('vue-loader')
        .end()
        .use('vue-markdown-loader')
        .loader('vue-markdown-loader/lib/markdown-compiler')
        .options({
          raw: true
        })
  }
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = config
