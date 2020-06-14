// 这里的node代码，会用babel处理

import React from 'react'
import { renderToString } from 'react-dom/server'
import express from 'express'
import { Provider } from 'react-redux'

import App from '../src/App'
import { StaticRouter } from 'react-router-dom'
import store from '../src/store/store'

const app = express()
app.use(express.static('public'))

app.get('*', (req, res) => {
    // const Page = <App title="ssr"></App>
    // 把react组件解析成html
    const content = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url}>
                {App}
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
            <script src="/index.js"></script>
        </body>
    </html>
    `)
})

app.listen(9093, () => {
    console.log('监听完毕')
})

