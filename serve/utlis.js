const path = require("path")
const fs = require("fs")
const matter = require("gray-matter")
const hash = require('hash-sum')
const toml = require("toml")
function resolve(dir) {
    return path.join(__dirname, dir)
}
function parseForntmatter(content){
    return matter(content,{
        excerpt_separator: '<!-- more -->',
        engines: {
            toml: toml.parse.bind(toml)
        }
    })
}
function getFileUpdateDate(path) {
    const stats = fs.statSync(path)
    return stats.mtime
}

module.exports = {
    resolve,
    parseForntmatter,
    hash,
    getFileUpdateDate
}
