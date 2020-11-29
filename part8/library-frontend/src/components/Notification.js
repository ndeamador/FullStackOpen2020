import React from 'react'

const Notification = ({errorMessage}) => {
  console.log('not:', errorMessage);

  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  )
}

export default Notification