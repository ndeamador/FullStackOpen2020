import React from 'react'
import { useSelector } from 'react-redux'

import {
  Alert
} from '@material-ui/lab'

const Notification = () => {

  const notificationObject = useSelector(store => store.notification)

   if (notificationObject.type === null) {
    return null
  }
  else {
    return (
      // Add two class names, one common for all notifications and one for the specific type (error, success, exception)

      // <Alert className={`notification ${notificationObject.type}`}>
      //   {notificationObject.text}
      // </Alert>
      <div>
        {      (notificationObject.text &&
          <Alert severity={notificationObject.type}>
            {notificationObject.text}
          </Alert>
        )}
      </div>

    )
  }
}

export default Notification