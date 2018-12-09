import React from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogCreation from './components/BlogCreation'
import { initBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { loginFromLocalStorage, logout } from './reducers/userReducer'

class App extends React.Component {
  componentDidMount() {
    this.props.initBlogs()
    this.props.loginFromLocalStorage()
  }

  logout = (event) => {
    event.preventDefault()
    this.props.logout()
  }

  like = (blog) => async () => {
    this.props.likeBlog(blog)
  }

  remove = (blog) => async () => {
    if (window.confirm(`Delete '${blog.title}' by ${blog.author}?`)) {
      this.props.deleteBlog(blog.id)
    }
  }

  render() {
    const blogInterface = () => (
      <div>
        <p>Logged in as: {this.props.user.name}</p>
        <button onClick={this.logout}>logout</button>
        <BlogCreation />
        {this.props.blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => <Blog key={blog.id} blog={blog} like={this.like(blog)}
                               remove={this.remove(blog)} user={this.props.user} />
        )}
      </div>
    )

    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        { this.props.user.token.length > 0 ? blogInterface() : <LoginForm login={this.login} /> }
      </div>
    )
  }
}

const ConnectedApp = connect((store) => {
  return {
    blogs: store.blogs, user: store.user
  }
}, {
  initBlogs, likeBlog, deleteBlog,
  loginFromLocalStorage, logout
})(App)

export default ConnectedApp;
