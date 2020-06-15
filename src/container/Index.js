import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { getIndexList } from '../store/index'
import store from '../store/store'

function Index(props) {
    const [count, setCount] = useState(1)

    // 在server端进行
    // useEffect(() => {
    //     props.getIndexList()
    // }, []);

    return <div>
        <h1>hello,{props.title}</h1>

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
)(Index)
