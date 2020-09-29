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
    // else if (message.type === 'success') {
    //     return (
    //         <div className='notification'>
    //             {message.text}
    //         </div>
    //     )
    // }
    // else if (message.type === 'exception') {
    //     return (
    //         <div className='notification'>
    //             {message.text}
    //         </div>
    //     )
    // }
    // else if (message.type === 'error') {
    //     return (
    //         <div className='notification'>
    //             {message.text}
    //         </div>
    //     )
    // }
}

export default Notification