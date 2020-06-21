import React from 'react'
import { Link } from 'react-router-dom'

export default () => {
    return <>
        <Link to="/">首页</Link>|<Link to="/about">关于页面</Link>|<Link to="/user">user</Link>| <Link to="/sdfas">不存在</Link>|
    </>
}
