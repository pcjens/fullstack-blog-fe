import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message, error }) => (
  <div>
    { message !== null &&
      <h4 className={error ? 'error' : 'info'}>{message}</h4> }
  </div>
)

Notification.propTypes = {
  error: PropTypes.bool.isRequired
}

export default Notification
