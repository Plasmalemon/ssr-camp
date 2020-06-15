import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from "redux-thunk"

import indexReducer from './index'

const reducer = combineReducers({
    index: indexReducer
})

// const store = createStore(reducer, applyMiddleware(thunk))

// export default store

export const getServerStore = () => {
    // 通过dispatch来获取
    return createStore(reducer, applyMiddleware(thunk))
}

export const getClientStore = () => {
    // 通过window.__context获取数据
    const defaultState = window.__context ? window.__context : {}
    return createStore(reducer, defaultState, applyMiddleware(thunk))
}