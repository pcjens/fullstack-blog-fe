import React from 'react'
import { connect } from 'react-redux'
import { Feed, Icon } from 'semantic-ui-react'

const CommentsList = ({ blogs, id }) => {
  const blog = blogs.find(blog => blog.id === id)
  if (blog === undefined) return (<div></div>)
  const comments = blog.comments
  if (comments.length === 0) return <p><br/>No comments yet. You could make the first one!</p>

  let commentIndex = 0
  const enumerateComment = comment => {
    commentIndex += 1
    return { comment, i: commentIndex }
  }
  const renderComment = comment => (
    <Feed.Event key={comment.i}>
      <Feed.Label>
        <Icon name='user' size='large' />
      </Feed.Label>
      <Feed.Content>
        {comment.comment}
      </Feed.Content>
    </Feed.Event>
  )

  return (
    <Feed>
      { comments.reverse().map(enumerateComment).map(renderComment) }
    </Feed>
  )
}

const ConnectedCommentsList = connect(store => ({
  blogs: store.blogs
}))(CommentsList)

export default ConnectedCommentsList
