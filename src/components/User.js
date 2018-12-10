import React from 'react'
import { connect } from 'react-redux'
import BlogList from './BlogList'

const User = ({ id, userbase }) => {
  const user = userbase.find(user => user.id === id)
  if (user !== undefined) {
    return (
      <div>
        <h2>{user.name}</h2>
        <h3>Added blogs</h3>
        <BlogList filterUserId={user.id} />
      </div>
    )
  } else {
    return (
      <div>User not found.</div>
    )
  }
}

const ConnectedUser = connect(store => ({ userbase: store.userbase }))(User)

export default ConnectedUser
