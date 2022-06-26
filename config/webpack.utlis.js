const path = require("path")
// 重新编辑打包函数给require使用
module.exports = {
    mode: 'development',
    entry: './src/utlis/shared-utlis.js',
    output: {
        filename:"utlis-build.js",//打包后的名字
        path: path.resolve(__dirname, '../src/utlis'),
        libraryTarget: "commonjs2"
    },
    optimization:{
        splitChunks: false
    },
    node:undefined,
    target: "node",
}
