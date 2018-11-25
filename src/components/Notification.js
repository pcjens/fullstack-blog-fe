import React from 'react'

const Notification = ({ message, error }) => (
  <div>
    { message !== null &&
      <h4 className={error ? 'error' : 'info'}>{message}</h4> }
  </div>
)

export default Notification
