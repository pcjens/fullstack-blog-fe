import React from 'react'

const Notification = ({ message }) => (
  <div>
    { message !== null && <h4>{message}</h4> }
  </div>
)

export default Notification
