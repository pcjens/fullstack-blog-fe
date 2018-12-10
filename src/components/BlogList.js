import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => (
  <div className='blog'>
    <Link to={'/blogs/' + blog.id}>
      <em className='title'>{blog.title}</em> by <span className='author'>{blog.author}</span>
    </Link>
  </div>
)

const BlogList = ({ blogs, user, likeBlog, deleteBlog, filterUserId }) => {
  const renderBlog = blog => (
    <Blog key={blog.id} blog={blog} />
  )
  const sort = (a, b) => b.likes - a.likes
  const filter = blog => filterUserId === undefined || filterUserId === blog.user._id

  return (
    <div>
      { blogs.filter(filter).sort(sort).map(renderBlog) }
    </div>
  )
}

const ConnectedBlogList = connect((store) => {
  return {
    user: store.user, blogs: store.blogs
  }
}, {
  likeBlog, deleteBlog
})(BlogList)

export default ConnectedBlogList
