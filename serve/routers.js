const Router = require('koa-router')
const config = require("./siteData")
const pageInfo = require("./pageInfo")
const fs = require("fs")
const path = require("path")
const {parseForntmatter} = require("./utlis")
const router = new Router()
const createBundleRenderer = require("vue-server-renderer").createBundleRenderer
const clientManifest = require("../dist/client/vue-ssr-client-manifest.json");
const serverBundle = require("../dist/server/vue-ssr-server-bundle.json")
// const serverBundle = JSON.parse(fs.readFileSync(path.join(__dirname,"../dist/server/vue-ssr-server-bundle.json"),"utf-8"  ))
const renderer = createBundleRenderer(serverBundle, {
    runInNewContext: false,
    template: fs.readFileSync("../public/index.ssr.html", "utf-8"), // 宿主文件
    clientManifest
})

router.get("/config", async(ctx)=>{
    ctx.body = config.siteData
})
router.get("/pageInfo", async(ctx)=>{
    ctx.body = pageInfo
})

router.post("/page", async(ctx)=>{
    const _path = ctx.request.body.path
    if(!_path){
        ctx.body = " "
        return
    }

    const __path = path.join(path.resolve(__dirname,"../","docs"),_path)
    // 读取文件并返回
    if(!fs.existsSync(__path)){
        ctx.body = " "
        return
    }

    const _content = fs.readFileSync(__path,"utf-8")
    const {content} = parseForntmatter(_content)
    ctx.body = content
})
router.get("/static/*", async(ctx)=>{
    const url = ctx.request.url
    const __path = path.join(__dirname,"../dist/client",url)
    // 读取文件并返回
    if(!fs.existsSync(__path)){
        ctx.body = " "
        return
    }
    ctx.body = fs.readFileSync(__path,"utf-8")
})
router.get("/js/*", async(ctx)=>{
    const url = ctx.request.url
    const __path = path.join(__dirname,"../dist/client",url)
    // 读取文件并返回
    if(!fs.existsSync(__path)){
        ctx.body = " "
        return
    }
    ctx.body = fs.readFileSync(__path,"utf-8")
})
router.get("/code/*",async (ctx)=>{
    const pages = pageInfo
    const _config = config.siteData
    let url = ctx.request.url
    if(url.split(".")[1]==="html"){
        url = url.split('.')[0]+".md"
    }
    const __path = path.join(__dirname,"../","docs",url)
    const _context = {
        context:"",
        url:url
    }

    if(!fs.existsSync(__path)){
        ctx.body = undefined
        return
    }
    _context.context = fs.readFileSync(__path,"utf-8")

    try {
        const context = {
            url: ctx.url,
            version:"1",
            title: 'test title',
            pages,
            config:_config,
            context:_context,
            userHeadTags:"",
            pageMeta:"",
            canonicalLink:"",
            renderResourceHints:()=>"",
            renderStyles:()=>"",
            renderScripts:()=>"",
        }
        ctx.body = await renderer.renderToString(context);
    } catch (error) {
        console.log(error,'error')
    }
})
module.exports = router
