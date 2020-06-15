import React, { useState } from 'react'

import { Route } from 'react-router-dom'

import Index from './container/Index'
import About from './container/About'


// export default (
//     <div>
//         <Route path="/" exact component={Index} />
//         <Route path="/about" exact component={About} />
//     </div>
// )

// 改造成js配置
export default [
    {
        path: '/',
        component: Index,
        // loadData: Index.loadData,
        exact: true,
        key: 'index'
    },
    {
        path: '/about',
        component: About,
        exact: true,
        key: 'about'
    }
]
