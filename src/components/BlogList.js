import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const BlogList = ({ blogs, user, likeBlog, deleteBlog, filterUserId }) => {
  const renderBlog = blog => (
    <Blog key={blog.id} user={user} blog={blog} like={() => likeBlog(blog)}
      remove={() => window.confirm(`Delete '${blog.title}' by ${blog.author}?`) && deleteBlog(blog)} />
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
