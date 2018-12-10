import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { likeBlog, deleteBlog, commentOnBlog } from '../reducers/blogReducer'
import CommentsList from './CommentsList'

class Blog extends React.Component {
  render() {
    const { user, blogs, id, deleteBlog, likeBlog, commentOnBlog } = this.props
    const blog = blogs.find(blog => blog.id === id)
    if (blog === undefined) {
      return (<div>Blog not found.</div>)
    } else {
      const canRemove = blog.user.username === undefined ||
            blog.user.username === user.username
      const remove = () => window.confirm(`Delete '${blog.title}' by ${blog.author}?`) && deleteBlog(blog)
      const removeButton = () => (<button onClick={remove}>Delete</button>)
      const like = () => likeBlog(blog)
      const comment = (event) => {
        event.preventDefault()
        console.log("Func:", commentOnBlog)
        console.log("Id:", blog.id)
        console.log("Value:", event.target.comment.value)
        commentOnBlog(blog.id, event.target.comment.value)
        event.target.comment.value = ''
      }

      return (
        <div>
          <h3><em className='title'>{blog.title}</em> by <span className='author'>{blog.author}</span></h3>
          <p><a href={blog.url}>{blog.url}</a></p>
          <p><span className='likes'>{blog.likes}</span> likes <button onClick={like}>Like</button></p>
          <p>added by <Link to={'/users/' + blog.user._id}>{blog.user.name}</Link></p>
          <p>{canRemove && removeButton()}</p>
          <h3>Comments</h3>
          <form onSubmit={comment}>
            <input type='text' name='comment' placeholder='Great post!' />
            <button type='submit'>Comment</button>
          </form>
          <CommentsList id={blog.id} />
        </div>
      )
    }
  }
}

const ConnectedBlog = connect(store => ({
  user: store.user,
  blogs: store.blogs
}), {
  likeBlog, deleteBlog, commentOnBlog
})(Blog)

export default ConnectedBlog
