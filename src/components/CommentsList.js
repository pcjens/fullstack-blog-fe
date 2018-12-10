import React from 'react'
import { connect } from 'react-redux'

const CommentsList = ({ blogs, id }) => {
  const blog = blogs.find(blog => blog.id === id)
  if (blog === undefined) return (<div></div>)
  const comments = blog.comments
  if (comments.length === 0) return "No comments yet."

  const renderComment = comment => (
    <li>{comment}</li>
  )

  return (
    <ul>
      { comments.map(renderComment) }
    </ul>
  )
}

const ConnectedCommentsList = connect(store => ({
  blogs: store.blogs
}))(CommentsList)

export default ConnectedCommentsList
