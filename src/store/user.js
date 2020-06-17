//  首页的逻辑

import axios from 'axios'
const GET_USER_INFO = 'USER/GET_USER_INFO'

// actionCreator
const changeUserInfo = userinfo => ({
    type: GET_USER_INFO,
    userinfo
})

export const getUserInfo = server => {
    return (dispatch, getState, axiosInstance) => {
        return axios.get('http://localhost:9090/api/user/info').then(res => {
            const { data } = res.data;
            dispatch(changeUserInfo(data))
        })
    }
}

const defaultState = {
    userinfo: {}
}

export default (state = defaultState, action) => {
    switch (action.type) {
        case GET_USER_INFO:
            // console.log(124, action)
            const newState = {
                ...state,
                userinfo: action.userinfo
            }
            return newState
        default:
            return state
    }
}
