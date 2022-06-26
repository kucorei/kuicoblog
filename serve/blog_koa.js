const koa = require("koa")
const getAllfile = require("./getiAllfile")
const path = require("path")
const App = new koa()
const router = require("./routers")
const static = require("koa-static")
const koabody = require("koa-body")
getAllfile()
App.use(static(path.join(__dirname,"../dist/client/static"),{
    index:false,       // 默认为true  访问的文件为index.html  可以修改为别的文件名或者false
    hidden:true,      // 是否同意传输隐藏文件
    defer:true,		   // 如果为true，则在返回next()之后进行服务，从而允许后续中间件先进行响应
}))
App.use(koabody())
// console.log(path.join(__dirname,"../dist/client/static"))


App.use(router.routes())
App.use(router.allowedMethods())

//监听端口
App.listen(8000, () => {
    console.log('The server is running at http://localhost:8000');
});
