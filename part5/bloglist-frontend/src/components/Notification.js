import React from 'react'

const Notification = ({ message }) => {
  if (message.type === null) {
    return null
  }
  else {
    return (
      <div className={message.type}>
        {message.text}
      </div>
    )
  }
}

export default Notification