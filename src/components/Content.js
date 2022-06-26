import Vue from 'vue'
import { setGlobalInfo, getPageAsyncComponent } from '../utlis'
import {createMarkdown} from "../../markdown/createMarkdown"
import 'markdown-it-vue/dist/markdown-it-vue-light.css'
import {pageContent} from "../../api/blog"
export default {
  data(){
    return {
      content:""
    }
  },
  watch:{
    "$parent.$page.relativePath":function (value) {
      this.setContent(value)
    }
  },
  methods:{
    setContent(relativePath){
      if(this.isServer) {
        this.content = this.$vuepress.store.serve.html
      }else{
        const pagePath = relativePath||this.$page.relativePath
        pageContent({
          path:pagePath
        }).then( (res=>{
          // this.content = res
          const {html} = createMarkdown({
            siteConfig:{
              markdown:{}
            }
          }).render(res)
          this.content = html
        }))
      }

    }
  },
  created() {
    this.setContent()
  },
  render (h) {
    const pageKey = this.$parent.$page.key
    setGlobalInfo('pageKey', pageKey)
    // if (!Vue.component(pageKey)) {
    //   Vue.component(pageKey, getPageAsyncComponent(pageKey))
    // }
    //
    // if (Vue.component(pageKey)) {
    //   console.log(MarkdownItVueLight,h)
    //   return h({
    //     template:"<vue-markdown>11111111111</vue-markdown>"
    //   })
    // }
    return h('div',{
      domProps: {
        innerHTML: this.content
      }
    })
  }
}
