const path = require("path")
// 重新编辑打包函数给require使用
module.exports = {
    mode: 'development',
    entry: './markdown/createMarkdown.js',
    output: {
        filename:"markdown-build.js",//打包后的名字
        path: path.resolve(__dirname, '../markdown'),
        libraryTarget: "commonjs2"
    },
    optimization:{
        splitChunks: false
    },
    node:undefined,
    target: "node",
}
