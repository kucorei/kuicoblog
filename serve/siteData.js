/**
 * Generated by "@vuepress/internal-site-data"
 */
module.siteData = {
    title: "Kuico的踩坑工厂",
    description: "记录踩坑和有趣的事情",
    base: "/",
    headTags: [
        [
            "link",
            {
                "rel": "icon",
                "href": "/favicon.ico"
            }
        ],
        [
            "meta",
            {
                "name": "viewport",
                "content": "width=device-width,initial-scale=1,user-scalable=no"
            }
        ]
    ],
    themeConfig: {
        mode: "light",
        modePicker: true,
        nav: [
            {text: '首页', link: '/'},
            {
                "text": "学习笔记",
                "icon": "reco-api",
                "items": [
                    {
                        "text": "基础 ｜ Python",
                        "link": "/code/python"
                    }
                ]
            },
            {
                text: '技术',
                link: '/python/',
                items: [
                    {text: 'python', link: '/python/python'},
                ],
            },
        ],
        "type": "blog",
        "isShowComments": true,
        "logo": "/logo.png",
        "authorAvatar": "/logo.png",
        "search": true,
        "searchMaxSuggestions": 10,
        "subSidebar": "auto",
        "sidebar": {
            "/accurate": [
                {
                    "title": "精准测试",
                    "collapsable": false,
                    "sidebarDepth": 2,
                    "children": [
                        "/accurate/base",
                        "/accurate/coverage"
                    ]
                }
            ]
        },
        "sidebarDepth": 2,
        "lastUpdated": "上次更新",
    },
    "locales": {
        "/": {
            "lang": "zh-CN",
            "path": "/"
        }
    }
}
module.exports = {
    siteData: module.siteData
}