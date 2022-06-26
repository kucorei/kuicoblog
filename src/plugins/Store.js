import Vue from 'vue'
import {createMarkdown} from "../../markdown/createMarkdown"

export default class Store {
  constructor () {
    this.store = new Vue({
      data: {
        state: {},
        serve:{
          url:"",
          context:"",
          html:""
        }
      }
    })
  }
  setServeConfig({context,url}){
    const {html} = createMarkdown({
      siteConfig:{
        markdown:{}
      }
    }).render(context)
    this.store.serve.html = html
    this.store.serve.url = url
    this.store.serve.context = context
  }
  $get (key) {
    return this.store.state[key]
  }

  $set (key, value) {
    Vue.set(this.store.state, key, value)
  }

  $emit (...args) {
    this.store.$emit(...args)
  }

  $on (...args) {
    this.store.$on(...args)
  }
}
