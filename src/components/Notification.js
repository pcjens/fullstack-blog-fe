import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Notification = ({ notification }) => (
  <div>
    { notification.message.length > 0 &&
      <h4 className={notification.error ? 'error' : 'info'}>{notification.message}</h4> }
  </div>
)

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

const ConnectedNotification = connect((store) => {
  return {
    notification: store.notification
  }
})(Notification)

export default ConnectedNotification
