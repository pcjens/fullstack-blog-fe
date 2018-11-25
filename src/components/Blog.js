import React from 'react'

const Blog = ({ blog }) => (
  <div>
    <em>{blog.title}</em> by {blog.author}
  </div>
)

export default Blog
