/* eslint-disable no-proto */
import postMixin from '@theme/mixins/posts'
import localMixin from '@theme/mixins/locales'

import { addLinkToHead, addScriptToHead } from '@theme/helpers/utils'
import { registerCodeThemeCss, interceptRouterError } from '@theme/helpers/other'
import VueCompositionAPI from '@vue/composition-api'
// import "./styles/theme.styl"
// import VuepressPluginComments from "@vuepress-reco/vuepress-plugin-comments/bin/enhanceAppFile"
// import VuepressPluginLoadingPage from "@vuepress-reco/vuepress-plugin-loading-page/bin/enhanceAppFile"
// import VuepressPluginPagation from "@vuepress-reco/vuepress-plugin-pagation/bin/enhanceAppFile"
import copy from "./mixins/copy";
// import sakura from "./mixins/sakura"

export default ({
  Vue,
  siteData,
  isServer,
  router
}) => {
  Vue.use(VueCompositionAPI)
  Vue.mixin(postMixin)
  Vue.mixin(localMixin)
  // VuepressPluginPagation({Vue})
  // VuepressPluginComments({Vue})
  // VuepressPluginLoadingPage({Vue})

  // if (!isServer) {
  //   addLinkToHead('//at.alicdn.com/t/font_1030519_2ciwdtb4x65.css')
  //   addScriptToHead('//kit.fontawesome.com/51b01de608.js')
  //   registerCodeThemeCss(siteData.themeConfig.codeTheme)
  // }

  interceptRouterError(router)

  // (function(){
  //   let oIndexOf = String.prototype.indexOf;
  //   return function(value,from) {
  //     if(value === 'eval') {
  //       debugger;
  //       return -1;
  //     } else {
  //       return oIndexOf.call(this,value,from);
  //     }
  //   }
  // })();

  setTimeout(() => {
    try {
      document && (() => { //对document的判断是防止编译的时候报错
        copy()
      })()
    } catch (e) {
      console.error(e.message)
    }
  },500)
}
