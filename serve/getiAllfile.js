
const siteData = require("./siteData")
const fs = require('fs')
const globby = require("globby")
const path = require("path")
const {resolve,parseForntmatter,hash,getFileUpdateDate} = require("./utlis")
const backDir = ['.vuepress','node_modules']
const {extractHeaders} = require("../src/utlis/utlis-build")
const {createMarkdown} = require("../markdown/markdown-build")

class Page{
    constructor({
        filePath,
        relativePath,
        extractHeaders=['h2', 'h3']
        }) {
        this.filePath = filePath
        this.relativePath = "/"+relativePath
        this.title = ""
        this.key = 'v-'+hash(this.relativePath)
        this.frontmatter = {}
        this.extractHeaders = extractHeaders
    }
    generate(){
        const file_content = fs.readFileSync(this.filePath,"utf-8")
        const {data}= parseForntmatter(file_content)
        this.frontmatter = data
        // 如果没有标题就只拿文件名称
        this.title = data.title||this.filePath.split("/").pop().split(".")[0]
        this.title = this.title.indexOf("README")>-1?"home":this.title
        const regularPath = this.relativePath.split(".")[0]+".html"
        const lastUpdated = getFileUpdateDate(this.filePath)
        const lastUpdatedTimestamp = new Date(getFileUpdateDate(this.filePath)).getTime()
        const path = this.relativePath.replace("README.md","").replace(".md",".html")
        const headers = extractHeaders(
            file_content,
            this.extractHeaders,
            createMarkdown({
                siteConfig:{
                    markdown:{}
                }
            })
        )
        return{
            title:this.title,
            frontmatter:this.frontmatter,
            key:this.key,
            headers,
            regularPath,
            relativePath:this.relativePath,
            path,
            lastUpdated,
            lastUpdatedTimestamp
        }
    }
}
const getAllfile = async () =>{
    const relative_path = resolve("../docs")
    const patterns = siteData.patterns?siteData.patterns:['**/*.md']
    const pageinfo = []
    patterns.push('!.vuepress', '!node_modules')
    const _alldosc = await globby(patterns,{
        cwd:relative_path
    })
    const alldosc = _alldosc.map((filePath) => ({
        filePath:path.join(relative_path, filePath),
        relativePath:filePath
    }))
    alldosc.forEach(dosc=>{
        const page = new Page({...dosc})
        const page_info = page.generate()
        pageinfo.push(page_info)
    })
    const page_data = `module.exports = ${JSON.stringify(pageinfo,null,4)}`
    fs.writeFileSync("./pageinfo.js",page_data)
    return pageinfo
}
module.exports = getAllfile

