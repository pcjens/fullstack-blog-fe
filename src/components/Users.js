import React from 'react'
import { connect } from 'react-redux'

class Users extends React.Component {
  render() {
    const renderUser = user => (
      <tr><td>{user.name}</td><td>{user.blogs.length}</td></tr>
    )

    return (
      <div>
        <h3>Users</h3>
        <table>
          <thead>
            <tr><td></td><td>Blogs added</td></tr>
          </thead>
          <tbody>
            { this.props.userbase.map(renderUser) }
          </tbody>
        </table>
      </div>
    )
  }
}

const ConnectedUsers = connect(store => ({
  userbase: store.userbase
}))(Users)

export default ConnectedUsers
