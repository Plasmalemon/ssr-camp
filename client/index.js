import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import App from '../src/App'


// 注水
// 默认不能用render 因为 server端已经渲染好dom结构，不需要render初始化dom
const Page = <BrowserRouter>
    {App}
</BrowserRouter>
ReactDom.hydrate(Page, document.getElementById('root'))