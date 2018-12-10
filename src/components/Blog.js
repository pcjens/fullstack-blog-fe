import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

class Blog extends React.Component {
  render() {
    const { user, blogs, id, deleteBlog, likeBlog } = this.props
    const blog = blogs.find(blog => blog.id === id)
    if (blog === undefined) {
      return (<div>Blog not found.</div>)
    } else {
      const canRemove = blog.user.username === undefined ||
            blog.user.username === user.username
      const remove = () => window.confirm(`Delete '${blog.title}' by ${blog.author}?`) && deleteBlog(blog)
      const removeButton = () => (<button onClick={remove}>Delete</button>)
      const like = () => likeBlog(blog)

      return (
        <div>
          <h3><em className='title'>{blog.title}</em> by <span className='author'>{blog.author}</span></h3>
          <p><a href={blog.url}>{blog.url}</a></p>
          <p><span className='likes'>{blog.likes}</span> likes <button onClick={like}>Like</button></p>
          <p>added by <Link to={'/users/' + blog.user._id}>{blog.user.name}</Link></p>
          <p>{canRemove && removeButton()}</p>
        </div>
      )
    }
  }
}

const ConnectedBlog = connect(store => ({
  user: store.user,
  blogs: store.blogs
}), {
  likeBlog, deleteBlog
})(Blog)

export default ConnectedBlog
