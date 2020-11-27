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
      <div>
        {(notificationObject.text &&
          <Alert severity={notificationObject.type}>
            {notificationObject.text}
          </Alert>
        )}
      </div>

    )
  }
}

export default Notification