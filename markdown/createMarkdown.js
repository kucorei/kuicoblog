'use strict'

/**
 * Module dependencies.
 */

import {createMarkdown as _createMarkdown} from "./index"

/**
 * Expose createMarkdown.
 */


export function createMarkdown (ctx) {
    const { markdown: markdownConfig = {}} = ctx.siteConfig
    const { chainMarkdown, extendMarkdown } = markdownConfig

    const beforeInstantiate = config => {
        chainMarkdown && chainMarkdown(config)
        // ctx.pluginAPI.applySyncOption('chainMarkdown', config)
    }

    const afterInstantiate = md => {
        extendMarkdown && extendMarkdown(md)
        // ctx.pluginAPI.applySyncOption('extendMarkdown', md)
    }
    return _createMarkdown(
        Object.assign(markdownConfig, {
            beforeInstantiate,
            afterInstantiate
        })
    )
}
export default {
    createMarkdown
}
