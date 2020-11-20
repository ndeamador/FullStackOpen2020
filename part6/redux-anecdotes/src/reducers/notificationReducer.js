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

    return dispatch => {

        dispatch({
            type: 'SET',
            data: { text: notification }
        })

        // note that calling timeouts in quick succession makes them overlap, so the first call might clear the last call notification ahead of the inteded tiem.
        setTimeout(() => dispatch(clearNotification()), timer * 1000)
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR'
    }
}


export default notificationReducer