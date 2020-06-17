import React from 'react'
import { connect } from 'react-redux'
import { getUserInfo } from '../store/user'
// import store from '../store/store'

function User(props) {
    // console.log(props, 1111)
    return (
        <div>你们好{props.userinfo.name}，你们中最棒的人是{props.userinfo.user}</div>
    )
}

User.loadData = (store) => {
    return store.dispatch(getUserInfo())
}

export default connect(
    state => {
        // console.log(123, state)
        return { userinfo: state.user.userinfo }
    },
    // { getUserInfo }
)(User)