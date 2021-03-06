import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    blogs: blogReducer,
    user: loginReducer,
    users: userReducer,
    notification: notificationReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

console.log(store.getState())

export default store