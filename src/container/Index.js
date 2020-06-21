import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getIndexList } from '../store/index'
import store from '../store/store'

import styles from './Index.css'

import withStyle from '../withStyle'

function Index(props) {
    // 按道理function里边是不能写副作用的
    // if (props.staticContext) {
    //     props.staticContext.css.push(styles._getCss())
    // }

    const [count, setCount] = useState(1)

    // 在server端进行
    useEffect(() => {
        if (!props.list.length) {
            // 客户端获取数据
            props.getIndexList()
        }
    }, []);

    return <div className={styles.container}>
        <h1 className={styles.title}>hello,{props.title}</h1>

        <button onClick={() => setCount(count + 1)}>{count}</button>
        <hr />

        <ul>
            {
                props.list.map(item => <li key={item.id}>{item.name}</li>)
            }
        </ul>
    </div>
}

Index.loadData = (store) => {
    return store.dispatch(getIndexList())
}

export default connect(
    state => ({ list: state.index.list }),
    { getIndexList }
)(withStyle(Index, styles))

// 方案一
// let NewIndex = connect(
//     state => ({ list: state.index.list }),
//     { getIndexList }
// )(withStyle(Index, styles))

// NewIndex.loadData = (store) => {
//     return store.dispatch(getIndexList())
// }
// export default NewIndex
