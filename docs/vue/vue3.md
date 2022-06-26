---
title: vue3
date: 2022-04-05 20:16:42
permalink: /pages/9c644a/
categories:
  - 其他笔记
tags:
  - 
---
## vue3

### vue-devtools

vue-devtools安装好后

vue3是需要使用meta版本，其他的版本，有可能不兼容

在vue3.2以下的版本，需要手动挂载给插件挂载app对象，

```javascript
// 解决 vue3+vite+typescript项目下，vue-devtools不生效问题
// *需要安装vue-devtools beta版
const app = createApp(App)
const win: any = window // 
if (process.env.NODE_ENV === 'development') {
  if ('__VUE_DEVTOOLS_GLOBAL_HOOK__' in win) {
    // 这里__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue赋值一个createApp实例
    win.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app
  }
}
```

3.2以上的版本，作者应该是已经加上去了，在去挂载的时候，页面会报很多的错误

### vite-plugin-pages

一款vite生成路由的插件，这个是一个扫描目录下的插件，

npm:https://www.npmjs.com/package/vite-plugin-pages

**安装**

```
$ npm install -D vite-plugin-pages
$ npm install vue-router@next
```

```javascript
// vite.config.js
import Pages from 'vite-plugin-pages'
export default {
  plugins: [
    Pages({
      dirs: [
        { dir: "src/pages", baseRoute: "" },
        { dir: "src/features/**/pages", baseRoute: "features" },
        { dir: "src/admin/pages", baseRoute: "admin" },
      ],
    }),
  ],
};
```

```javascript
// rotuer.js
import routes from "virtual:generated-pages";
import { createWebHashHistory } from "vue-router";
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

```

