// entry-client.js ==> 挂载、激活app
import {createApp} from './serve'

createApp('web').then(({ app, router })=>{
    router.onReady(() => {
        app.$mount('#app');
    })
});



