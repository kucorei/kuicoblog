import Vue from 'vue'
import layoutComponents from '../layout/layout-components'

const asyncComponents = Object.assign({}, layoutComponents)
const asyncComponentsGetter = name => asyncComponents[name]
const layoutComponentsGetter = layout => layoutComponents[layout]
const globalComponentsGetter = name => Vue.component(name)

/*
    * Config: : 'Text'
* Normalized Config: 'Text'
*
* Config: : { '/': 'Text', '/zh/': '文本' }
* Normalized Config: 'Text' or '文本'
*
* @param {Vue} component
* @param {any} rawConfig
* @returns {any}
*/
export function normalizeConfig (component, rawConfig) {
    const { $localePath } = component
    if (typeof rawConfig === 'object' && rawConfig[$localePath]) {
        return rawConfig[$localePath]
    }
    return rawConfig
}


/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
    const cache = Object.create(null)
    // eslint-disable-next-line func-names
    return function cachedFn (str) {
        const hit = cache[str]
        // eslint-disable-next-line no-return-assign
        return hit || (cache[str] = fn(str))
    }
}

/**
 * Hyphenate a camelCase string.
 */
const hyphenateRE = /\B([A-Z])/g
const hyphenate = cached(str => {
    return str.replace(hyphenateRE, '-$1').toLowerCase()
})

/**
 * Capitalize a string.
 */
const capitalize = cached(str => {
    return str.charAt(0).toUpperCase() + str.slice(1)
})

const camelizeRE = /-(\w)/g
const camelize = cached(str => {
    return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : '')
})


export function getComponent (getter, name) {

    if (!name) return
    if (getter(name)) return getter(name)

    const isKebabCase = name.includes('-')
    if (isKebabCase) return getter(capitalize(camelize(name)))

    return getter(capitalize(name)) || getter(hyphenate(name))
}
export function getLayoutAsyncComponent (layout) {
    return getComponent(layoutComponentsGetter, layout)
}

export function getAsyncComponent (name) {
    return getComponent(asyncComponentsGetter, name)
}

export function getVueComponent (name) {
    return getComponent(globalComponentsGetter, name)
}

/**
 * Set global info in `window.__VUEPRESS__` for debugging.
 *
 * @param {string}key
 * @param {any} value
 */
export function setGlobalInfo (key, value) {
    if (typeof window === 'undefined' || !window.__VUEPRESS__) {
        return
    }
    window.__VUEPRESS__[key] = value
}


/**
 * Inject option to Vue SFC
 * @param {object} options
 * @param {string} key
 * @param {any} value
 */
export function injectComponentOption (options, key, value) {
    const arrayInject = () => {
        if (!options[key]) options[key] = []
        options[key].push(...value)
    }
    const objectInject = () => {
        if (!options[key]) options[key] = {}
        Object.assign(options[key], value)
    }

    switch (key) {
        case 'components': objectInject(); break
        case 'mixins': arrayInject(); break
        default: throw new Error('Unknown option name.')
    }
}
