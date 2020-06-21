// 这里的node代码，会用babel处理

import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import { Provider } from 'react-redux'
import { createProxyMiddleware } from 'http-proxy-middleware'
import routes from '../src/App'
import { StaticRouter, matchPath, Route, Switch } from 'react-router-dom'
import { getServerStore } from '../src/store/store'
import Header from '../src/component/Header'

const store = getServerStore()

const app = express()
app.use(express.static('public'))
// console.log()


// 客户端来的api开头的请求
app.use(
    '/api',
    createProxyMiddleware({ target: "http://localhost:9090/", changeOrigin: true })
)

app.get('*', (req, res) => {
    // 根据路由渲染组件，并且拿到loadDate方法 获取数据
    // 存储所有网络请求
    const promises = []
    routes.map(route => {
        const match = matchPath(req.path, route)
        if (match) {
            const { loadData } = route.component
            if (loadData) {
                const promise = new Promise((resolve, reject) => {
                    loadData(store).then(resolve).catch(resolve)
                })
                promises.push(promise)
                // promises.push(loadData(store))
            }
        }
    })
    // console.log(promises)
    // 等待所有网络请求
    Promise.all(promises).then(() => {
        const context = {
            css: []
        }
        // const Page = <App title="ssr"></App>
        // 把react组件解析成html
        const content = renderToString(
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <Header />
                    <Switch>
                        {routes.map(route => <Route {...route} />)}
                    </Switch>
                </StaticRouter>
            </Provider>
        )
        // console.log('context', context)
        if (context.statusCode) {
            res.status(context.statusCode)
        }

        if (context.action == "REPLACE") {
            res.redirect(301, context.url)
        }

        const css = context.css.join('\n')
        // console.log(css)

        // 字符串模板
        res.send(`
            <html>
                <head>
                    <meta charset="utf-8" />
                    <title>react ssr</title>
                    <style>
                        ${css}
                    </style>
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

