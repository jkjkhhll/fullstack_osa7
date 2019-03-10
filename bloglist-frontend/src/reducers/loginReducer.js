import loginService from '../services/login'
import { showNotification } from './notificationReducer'

const loginReducer = (state = null, action) => {
    switch (action.type) {
        case 'LOGIN':
            return action.data
        case 'LOGOUT':
            return null 
        case 'INIT_USER':
            return action.data
        default:
            return state
    }
}

export const loginUser = (credentials) => {
    return async dispatch => {
        try {
            const user = await loginService.login({
                username: credentials.username,
                password: credentials.password
            })
            window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
            dispatch({
                type: 'LOGIN',
                data: user
            })
        } catch (exception) {
            showNotification('wrong username or password', 'error')(dispatch)
        }
    }
}

export const logoutUser = () => {
    return async dispatch => {
        window.localStorage.removeItem('loggedBlogAppUser')    
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export const initUser = () => {
    console.log('inituser called')
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            dispatch({
                type: 'INIT_USER',
                data: user
            })
        }
    }
}


// const handleLogin = async (event) => {
//     event.preventDefault()
//     try {
//         const user = await loginService.login({
//             username: username.value,
//             password: password.value
//         })

//         window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
//     } catch (exception) {
//         notify('wrong username of password', 'error')
//     }
// }

// const handleLogout = () => {
//     window.localStorage.removeItem('loggedBlogAppUser')
// }

export default loginReducer