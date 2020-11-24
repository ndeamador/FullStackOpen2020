import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notificationObject = useSelector(store => store.notification)

  if (notificationObject.type === null) {
    return null
  }
  else {
    return (
      // Add two class names, one common for all notifications and one for the specific type (error, success, exception)
      <div className={`notification ${notificationObject.type}`}>
        {notificationObject.text}
      </div>
    )
  }
}

export default Notification