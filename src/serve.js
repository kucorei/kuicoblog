/* global VUEPRESS_TEMP_PATH */
import Vue from 'vue'
import Router from 'vue-router'
import dataMixin from '@/utlis/dataMixin'
import {routes} from '@/routes'
// import appEnhancers from '@internal/app-enhancers'
import globalUIComponents from '@/layout/global-ui.js'
import ClientComputedMixin from '@/layout/ClientComputedMixin'
// built-in components
import Content from '@/components/Content.js'
import ContentSlotsDistributor from '@/components/ContentSlotsDistributor.js'
import OutboundLink from '@/components/OutboundLink.vue'
import ClientOnly from '@/components/ClientOnly.js'
import SWUpdatePopup from "@/components/SWUpdatePopup.vue"
import BackToTop from "@/components/BackToTop.vue"

import VuePress from '@/plugins/VuePress'
import {handleRedirectForCleanUrls} from '@/utlis/redirect.js'

import {GetPageConfig, GetConfig} from "../api/blog"
import VueMarkdown from "@adapttive/vue-markdown"


import Layout from "@theme-default/layouts/Layout"
import NotFound from "@theme-default/layouts/404"


Vue.config.productionTip = false
Vue.use(Router)
Vue.use(VuePress)
Vue.component('Content', Content)
Vue.component('vue-markdown', VueMarkdown)
Vue.component('ContentSlotsDistributor', ContentSlotsDistributor)
Vue.component('OutboundLink', OutboundLink)
Vue.component('ClientOnly', ClientOnly)
Vue.component('SWUpdatePopup', SWUpdatePopup)
Vue.component('BackToTop', BackToTop)


Vue.component('Layout', Layout)
Vue.component('NotFound', NotFound)

const backList = ['js']

Vue.prototype.$withBase = function (path) {
    if (path.charAt(0) === '/') {
        if (backList.includes(path.split(".")[1])) {
            return path.slice(1)
        }
        return path.slice(1)
    } else {
        return path
    }
}

// 注入需要的参数
export async function createApp(server , pages, config, context) {
    const serveType = ['ssr']
    const isServer = serveType.includes(server)
    const configData = {}
    const routerBase = typeof window !== 'undefined' && window.__VUEPRESS_ROUTER_BASE__
        ? window.__VUEPRESS_ROUTER_BASE__
        : (configData.routerBase || configData.base)
    // spa单页的时候，预览接口
    if (server==='spa') {
        await GetPageConfig().then(res => {
            configData.pages = res
        })
        await GetConfig().then(res => {
            Vue.mixin(dataMixin(ClientComputedMixin, Object.assign(configData, res)))
        })
    }
    // 服务端渲染的时候调用
    if(isServer){
        configData.pages = pages
        Vue.mixin(dataMixin(ClientComputedMixin, Object.assign(configData, config)))
    }
    Vue.prototype.isServer = isServer
    const router = new Router({
        base: routerBase,
        mode: 'history',
        fallback: false,
        routes,
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) {
                return savedPosition
            } else if (to.hash) {
                if (Vue.$vuepress.$get('disableScrollBehavior')) {
                    return false
                }
                return {
                    selector: decodeURIComponent(to.hash)
                }
            } else {
                return {x: 0, y: 0}
            }
        }
    })
    // enhanceApp({Vue, siteData: configData, isServer, router})

    handleRedirectForCleanUrls(router)

    const options = {}


    const app = new Vue(
        Object.assign(options, {
            router,
            render(h) {
                return h('div', {attrs: {id: 'app'}}, [
                    h('RouterView', {ref: 'layout'}),
                    h('div', {class: 'global-ui'}, globalUIComponents.map(component => h(component)))
                ])
            }
        })
    )
    if (isServer) {
        app.$vuepress.setServeConfig(context)
    }
    return {app,router}
}
