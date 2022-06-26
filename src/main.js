import {createApp} from "./serve"
createApp('spa').then(({app}) => {
    app.$mount('#app')
})
