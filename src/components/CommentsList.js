import React from 'react'
import { connect } from 'react-redux'

const CommentsList = ({ blogs, id }) => {
  const blog = blogs.find(blog => blog.id === id)
  if (blog === undefined) return (<div></div>)
  const comments = blog.comments
  if (comments.length === 0) return <p>No comments yet.</p>

  let commentIndex = 0
  const enumerateComment = comment => {
    commentIndex += 1
    return { comment, i: commentIndex }
  }
  const renderComment = comment => (
    <li key={comment.i}>{comment.comment}</li>
  )

  return (
    <ul>
      { comments.reverse().map(enumerateComment).map(renderComment) }
    </ul>
  )
}

const ConnectedCommentsList = connect(store => ({
  blogs: store.blogs
}))(CommentsList)

export default ConnectedCommentsList
