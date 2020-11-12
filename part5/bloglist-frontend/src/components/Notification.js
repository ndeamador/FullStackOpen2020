import React from 'react'

const Notification = ({ message }) => {
  if (message.type === null) {
    return null
  }
  else {
    return (
      // Add two class names, one common for all notifications and one for the specific type (error, success, exception)
      <div className={`notification ${message.type}`}>
        {message.text}
      </div>
    )
  }
}

export default Notification