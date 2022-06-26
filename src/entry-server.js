// entry-server.js ==> 将来渲染首屏
import {createApp} from './serve'
export default (context) => {
    return new Promise((resolve, reject) => {
        createApp('ssr',context.pages,context.config,context.context).then(({ app, router })=>{
            // 进入到首屏
            router.push(context.url)
            router.onReady(() => {
                resolve(app);
            }, reject)
        });

    });
}
