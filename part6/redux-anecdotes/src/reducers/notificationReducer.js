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

export const setNotification = (notification) => {
    return {
        type: 'SET',
        data: { text: notification}
    }
}

export const clearNotification = () => {
    return {
        type: 'CLEAR'
    }
}


export default notificationReducer