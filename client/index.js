import React from 'react'
import ReactDom from 'react-dom'
import { BrowserRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import routes from '../src/App'
import App from '../src/App'
import { getClientStore } from '../src/store/store'
import Header from '../src/component/Header'



// 注水
// 默认不能用render 因为 server端已经渲染好dom结构，不需要render初始化dom
const Page = (<Provider store={getClientStore()}>
    <BrowserRouter>
        <Header />
        {routes.map(route => <Route {...route} />)}
    </BrowserRouter>
</Provider>)
ReactDom.hydrate(Page, document.getElementById('root'))