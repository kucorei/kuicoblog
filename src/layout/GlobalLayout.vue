<template>
  <component :is="layout" />
</template>

<script>
import Vue from 'vue'
import { setGlobalInfo } from '@/utlis'

export default {
  name: 'GlobalLayout',

  computed: {
    layout () {
      const layout = this.getLayout()
      setGlobalInfo('layout', layout)
      console.log(layout)
      return Vue.component(layout)
    }
  },

  methods: {
    getLayout () {
      console.log(this.$page)
      if (this.$page.path) {
        const layout = this.$page.frontmatter.layout
        if (layout && (this.$vuepress.getLayoutAsyncComponent(layout)
          || this.$vuepress.getVueComponent(layout))) {
          return layout
        }
        return 'Layout'
      }
      return 'NotFound'
    }
  }
}
</script>
