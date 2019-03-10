const notificationReducer = (state = { message: null, type: null }, action) => {
    switch (action.type) {
        case 'SHOW_NOTIFICATION':
            return { message: action.data.message, type: action.data.type }
        case 'HIDE_NOTIFICATION':
            return { message: null, type: null }
        default:
            return state
    }

}


export const showNotification = (message, type) => {
    return async (dispatch) => {
        dispatch({
            type: 'SHOW_NOTIFICATION',
            data: {
                message,
                type
            }
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE_NOTIFICATION'
            })
        }, 5000)
    }
}

    // const notify = (message, type = 'success') => {
    //     setNotification({ message, type })
    //     setTimeout(() => setNotification({ message: null }), 10000)
    // }
export default notificationReducer
