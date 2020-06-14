import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from '../src/App'
import store from '../src/store/store'


// 注水
// 默认不能用render 因为 server端已经渲染好dom结构，不需要render初始化dom
const Page = (<Provider store={store}>
    <BrowserRouter>
        {App}
    </BrowserRouter>
</Provider>)
ReactDom.hydrate(Page, document.getElementById('root'))