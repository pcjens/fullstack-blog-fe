import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'semantic-ui-react'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => (
  <Table.Row>
    <Table.Cell>
      <Link to={'/blogs/' + blog.id}>
        <em>{blog.title}</em>
      </Link>
    </Table.Cell>
    <Table.Cell>
      {blog.author}
    </Table.Cell>
  </Table.Row>
)

const BlogList = ({ blogs, user, likeBlog, deleteBlog, filterUserId }) => {
  const renderBlog = blog => (
    <Blog key={blog.id} blog={blog} />
  )
  const sort = (a, b) => b.likes - a.likes
  const filter = blog => filterUserId === undefined || filterUserId === blog.user._id

  return (
    <Table striped celled>
      { blogs.filter(filter).sort(sort).map(renderBlog) }
    </Table>
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
