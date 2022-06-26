'use strict'

/**
 * Module dependencies.
 */

// const Config = require('markdown-it-chain')
import Config from "markdown-it-chain"
import {highlight} from "./lib/highlight"
import { PLUGINS, REQUIRED_PLUGINS }  from './lib/constant'
import {highlightLines as highlightLinesPlugin} from './lib/highlightLines'
import {preWrapper as preWrapperPlugin} from './lib/preWrapper'
import {lineNumbers as lineNumbersPlugin} from './lib/lineNumbers'
import componentPlugin from './lib/component'
import {hoist as hoistScriptStylePlugin} from './lib/hoist'
import {link as convertRouterLinkPlugin} from './lib/link'
import {snippetPlugin}  from './lib/snippet'
import markdownIt from "markdown-it/index"
import emojiPlugin from "markdown-it-emoji"
import anchorPlugin from "markdown-it-anchor"
import tocPlugin from "markdown-it-table-of-contents"
// const tocPlugin = require('markdown-it-table-of-contents')
import {slugify as _slugify} from "../src/utlis/slugify"
import parseHeaders from "../src/utlis/parseHeaders"
import normalizeConfig from "../src/utlis/normalizeConfig"
// const { normalizeConfig,
//     moduleResolver: { getMarkdownItResolver }
// } = require('@vuepress/shared-utils')

/**
 * Create markdown by config.
 */


export function createMarkdown (markdown = {})  {
    const {
        externalLinks,
        pageSuffix,
        anchor,
        toc,
        plugins,
        lineNumbers,
        beforeInstantiate,
        afterInstantiate
    } = markdown

    // const resolver = getMarkdownItResolver()

    // allow user config slugify
    const slugify = markdown.slugify || _slugify

    // using chainedAPI
    const config = new Config()
    config
        .options
        .html(true)
        .highlight(highlight)
        .end()

        .plugin(PLUGINS.COMPONENT)
        .use(componentPlugin)
        .end()

        .plugin(PLUGINS.HIGHLIGHT_LINES)
        .use(highlightLinesPlugin)
        .end()

        .plugin(PLUGINS.PRE_WRAPPER)
        .use(preWrapperPlugin)
        .end()

        .plugin(PLUGINS.SNIPPET)
        .use(snippetPlugin)
        .end()

        .plugin(PLUGINS.CONVERT_ROUTER_LINK)
        .use(convertRouterLinkPlugin, [Object.assign({
            target: '_blank',
            rel: 'noopener noreferrer'
        }, externalLinks), pageSuffix])
        .end()

        .plugin(PLUGINS.HOIST_SCRIPT_STYLE)
        .use(hoistScriptStylePlugin)
        .end()

        .plugin(PLUGINS.EMOJI)
        .use(emojiPlugin)
        .end()

        .plugin(PLUGINS.ANCHOR)
        .use(anchorPlugin, [Object.assign({
            slugify,
            permalink: true,
            permalinkBefore: true,
            permalinkSymbol: '#'
        }, anchor)])
        .end()

        .plugin(PLUGINS.TOC)
        .use(tocPlugin, [Object.assign({
            slugify,
            includeLevel: [2, 3],
            format: parseHeaders
        }, toc)])
        .end()

    if (lineNumbers) {
        config
            .plugin(PLUGINS.LINE_NUMBERS)
            .use(lineNumbersPlugin)
    }

    beforeInstantiate && beforeInstantiate(config)
    const md = config.toMd(markdownIt, markdown)

    // const pluginsConfig = normalizeConfig(plugins || [])
    // pluginsConfig.forEach(([pluginRaw, pluginOptions]) => {
    //     const plugin = resolver.resolve(pluginRaw)
    //     if (plugin.entry) {
    //         md.use(plugin.entry, pluginOptions)
    //     } else {
    //         // TODO: error handling
    //     }
    // })

    afterInstantiate && afterInstantiate(md)

    dataReturnable(md)

    // expose slugify
    md.slugify = slugify
    return md
}

export const dataReturnable = function dataReturnable (md) {
    // override render to allow custom plugins return data
    const render = md.render
    md.render = (...args) => {
        md.$data = {}
        md.$data.__data_block = {}
        md.$dataBlock = md.$data.__data_block
        const html = render.call(md, ...args)
        return {
            html,
            data: md.$data,
            dataBlockString: toDataBlockString(md.$dataBlock)
        }
    }
}

function toDataBlockString (ob) {
    if (Object.keys(ob).length === 0) {
        return ''
    }
    return `<data>${JSON.stringify(ob)}</data>`
}

function isRequiredPlugin (plugin) {
    return REQUIRED_PLUGINS.includes(plugin)
}

function removePlugin (config, plugin) {
    config.plugins.delete(plugin)
}

function removeAllBuiltInPlugins (config) {
    Object.keys(PLUGINS).forEach(key => {
        if (!isRequiredPlugin(PLUGINS[key])) {
            removePlugin(config, PLUGINS[key])
        }
    })
}

export default {
    isRequiredPlugin,
    removePlugin,
    createMarkdown,
    removeAllBuiltInPlugins,
    PLUGINS
}
