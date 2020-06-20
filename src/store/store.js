import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from "redux-thunk"
import axios from 'axios'

import indexReducer from './index'
import userInfoReducer from './user'

const reducer = combineReducers({
    index: indexReducer,
    user: userInfoReducer
})

const serverAxios = axios.create({
    baseURL: 'http://localhost:9090/'
})

const clientAxios = axios.create({
    baseURL: '/'
})

// const store = createStore(reducer, applyMiddleware(thunk))

// export default store

export const getServerStore = () => {
    // 通过dispatch来获取
    return createStore(reducer, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}

export const getClientStore = () => {
    // 通过window.__context获取数据
    const defaultState = window.__context ? window.__context : {}
    return createStore(reducer, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}
