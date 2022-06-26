const VueSSRServerPlugin = require("vue-server-renderer/server-plugin");
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const nodeExternals = require("webpack-node-externals");
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const merge = require("lodash.merge");
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const target = TARGET_NODE ? "server" : "client";
const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: '/',
    lintOnSave: false,

    productionSourceMap: false,
    runtimeCompiler:true,
    css: {
        extract: false,
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
    outputDir: "./dist/" + target,
    configureWebpack: (config) => {
        Object.assign(config,{
            resolve: {
                alias: {
                    '@': resolve('src'),
                    '@theme': resolve('theme'),
                    '@theme-default': resolve('theme-default'),
                    '@plugins': resolve('src/plugins'),
                    '@components': resolve('src/components')
                },
                extensions: [
                    '.mjs',
                    '.js',
                    '.jsx',
                    '.vue',
                    '.json',
                    '.wasm'
                ],
            },
        })
        if (process.env.WEBPACK_TARGET !== "node") return
        return ({
            entry: `/src/entry-${target}.js`,
            devtool: "source-map",
            target: TARGET_NODE ? "node" : "web",
            node: TARGET_NODE ? undefined : false,

            output: {
                libraryTarget: TARGET_NODE ? "commonjs2" : undefined
            },
            externals: TARGET_NODE ?
                nodeExternals({
                    // whitelist
                    allowlist: [/\.css$/]
                }) : undefined,
            // 关闭分包
            optimization: {
                splitChunks: TARGET_NODE ? false : undefined,
            },
            plugins: [
                new VueSSRServerPlugin()
            ]
        })
    },
    chainWebpack: config => {
        config.module.rule("vue").use("vue-loader").tap(options => {
            merge(options, { optimizeSSR: false })
        })
        config.module
            .rule('js')
            .use('babel-loader')
            .loader("babel-loader")
            .end()

        config.plugin('preload').tap(() => [
            {
                rel: 'preload',
                fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
                include: 'initial'
            }
        ])

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
    },
};
