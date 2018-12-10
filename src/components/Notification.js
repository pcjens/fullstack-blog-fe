import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Message } from 'semantic-ui-react'

const Notification = ({ notification }) => {
  const { message, error } = notification
  const messageExists = message.length > 0
  return (
    <p>
      { messageExists && <Message success={!error} error={error}>{message}</Message> }
    </p>
  )
}

Notification.propTypes = {
  notification: PropTypes.object.isRequired
}

const ConnectedNotification = connect((store) => {
  return {
    notification: store.notification
  }
})(Notification)

export default ConnectedNotification
