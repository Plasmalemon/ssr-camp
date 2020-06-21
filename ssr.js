const express = require('express')

const app = express()

const puppeteer = require('puppeteer');




app.get('*', async (req, res) => {
    console.log(req.url)
    const url = 'http://localhost:9093' + req.url
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, {
        waitUntil: ['networkidle0']//等网络空闲执行
    });

    const html = await page.content()

    res.send(html)
})


app.listen(8081, () => {
    console.log('ssr server start')
})

