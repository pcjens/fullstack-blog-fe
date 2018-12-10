import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = ({ notification }) => (
  <p>
    { notification.message.length > 0 &&
      <Message success={!notification.error} error={notification.error}>
          {notification.message}
        </Message>
      }
  </p>
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
