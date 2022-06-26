export default {
  data () {
    return {
      recoShowModule: true
    }
  },
  mounted () {
    this.recoShowModule = true
  },
  watch: {
    '$route' (newV, oldV) {
      if (newV.path === oldV.path) return

      this.recoShowModule = false

      setTimeout(() => {
        this.recoShowModule = true
      }, 200)
    }
  }
}
