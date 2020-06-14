import React from 'react'
import ReactDom from 'react-dom'

import App from '../src/app'


// 默认不能用render 因为 server端已经渲染好dom结构，不需要render初始化dom
ReactDom.hydrate(App, document.getElementById('root'))