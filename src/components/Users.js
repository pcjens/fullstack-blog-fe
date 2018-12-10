import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Users extends React.Component {
  render() {
    const renderUser = user => (
      <tr key={user.id}>
        <td><Link to={'/users/' + user.id}>{user.name}</Link></td><td>{user.blogs.length}</td>
      </tr>
    )

    return (
      <div>
        <h2>Users</h2>
        <table>
          <thead>
            <tr><td>User</td><td>Blogs added</td></tr>
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
