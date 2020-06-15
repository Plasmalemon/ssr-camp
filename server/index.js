// 这里的node代码，会用babel处理

import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import { Provider } from 'react-redux'

import routes from '../src/App'
import { StaticRouter, matchPath, Route } from 'react-router-dom'
import { getServerStore } from '../src/store/store'
import Header from '../src/component/Header'

const store = getServerStore()

const app = express()
app.use(express.static('public'))

app.get('*', (req, res) => {
    // 根据路由渲染组件，并且拿到loadDate方法 获取数据
    // 存储所有网络请求
    const promises = []
    routes.map(route => {
        const match = matchPath(req.path, route)
        if (match) {
            const { loadData } = route.component
            if (loadData) {
                promises.push(loadData(store))
            }
        }
    })
    // 等待所有网络请求
    Promise.all(promises).then(() => {
        // const Page = <App title="ssr"></App>
        // 把react组件解析成html
        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url}>
                    <Header />
                    {routes.map(route => <Route {...route} />)}
                </StaticRouter>
            </Provider>
        )
        // 字符串模板
        res.send(`
            <html>
                <head>
                    <meta charset="utf-8" />
                    <title>react ssr</title>
                </head>
                <body>
                    <div id="root">${content}</div>
                    <script>
                        window.__context = ${JSON.stringify(store.getState())}
                    </script>
                    <script src="/index.js"></script>
                </body>
            </html>
    `)
    })
})

app.listen(9093, () => {
    console.log('监听完毕')
})

