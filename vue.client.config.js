const path = require('path')
const VueSSRClientPlugin = require("vue-server-renderer/client-plugin");
const clientConfig = require("./vue.config")
function resolve(dir) {
    return path.join(__dirname, dir)
}
const TARGET_NODE = process.env.WEBPACK_TARGET === "node";
const port = process.env.port || process.env.npm_config_port || 9527 // dev port
clientConfig.outputDir = "dist/client"
clientConfig.pages = {
    index:{
        entry:resolve("./src/entry-client.js"),
        template:"public/index.html",
        filename: 'index.html',
        chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
}
clientConfig.configureWebpack.plugins.push(new VueSSRClientPlugin())
// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = clientConfig
