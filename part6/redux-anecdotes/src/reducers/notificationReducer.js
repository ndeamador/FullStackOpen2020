const initialState = []

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {

        case 'SET':
            return [action.data.text]

        case 'CLEAR':
            return initialState

        default:
            return state
    }
}

export const setNotification = (notification, timer) => {
    // clear the current notification deadline to avoid overlapping (prevent that an earlier timeout clears a later notification ahead of time)
    clearTimeout(setNotification.timeoutID)

    return dispatch => {

        dispatch({
            type: 'SET',
            data: { text: notification }
        })
        setNotification.timeoutID = setTimeout(() => dispatch(clearNotification()), timer * 1000)
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR'
    }
}


export default notificationReducer