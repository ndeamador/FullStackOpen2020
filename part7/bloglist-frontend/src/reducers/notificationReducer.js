const reducer = (state = {}, action) => {
  switch(action.type) {

    case 'SET_NOTIFICATION':
      return action.data
    
    case 'CLEAR_NOTIFICATION':
      return {}

    default: 
    return state
  }
}

export const setNotification = (notification, timer = 5) => {
  // clear the current notification deadline to avoid overlapping (prevent that an earlier timeout clears a later notification ahead of time)
  clearTimeout(setNotification.timeoutID)

  return async dispatch => {

      dispatch({
          type: 'SET_NOTIFICATION',
          data: notification
      })
      setNotification.timeoutID = setTimeout(() => dispatch(clearNotification()), timer * 1000)
  }
}


export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'  }
}

export default reducer