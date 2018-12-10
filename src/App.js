import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogCreation from './components/BlogCreation'
import Users from './components/Users'
import { initBlogs, likeBlog, deleteBlog } from './reducers/blogReducer'
import { loginFromLocalStorage, logout } from './reducers/userReducer'
import { initUsers } from './reducers/userbaseReducer'

const Nav = ({ name, logout }) => (
  <div>
    <p>Logged in as: {name} <button onClick={logout}>logout</button></p>
  </div>
)

const UnconnectedBlogOverview = ({ likeBlog, deleteBlog, user, blogs }) => {
  const renderBlog = blog => (
    <Blog key={blog.id} user={user} blog={blog} like={() => likeBlog(blog)}
          remove={() => window.confirm(`Delete '${blog.title}' by ${blog.author}?`) && deleteBlog(blog)} />
  )

  return (
    <div>
      <BlogCreation />
      { blogs.sort((a, b) => b.likes - a.likes).map(renderBlog) }
    </div>
  )
}

const BlogOverview = connect((store) => {
  return {
    user: store.user, blogs: store.blogs
  }
}, {
  likeBlog, deleteBlog
})(UnconnectedBlogOverview)

class App extends React.Component {
  componentDidMount() {
    this.props.initBlogs()
    this.props.initUsers()
    this.props.loginFromLocalStorage()
  }

  logout = (event) => {
    event.preventDefault()
    this.props.logout()
  }

  render() {
    const loggedIn = this.props.user.token.length > 0
    const routes = () => (
      <div>
        <Route exact path='/' render={() => <BlogOverview />} />
        <Route exact path='/users' render={() => <Users />} />
      </div>
    )

    return (
      <div>
        <Router>
          <div>
            <h2>Blogs</h2>
            { loggedIn && <Nav name={this.props.user.name} logout={this.logout} /> }
            <Notification />
            { !loggedIn ? <LoginForm login={this.login} /> : routes() }
          </div>
        </Router>
      </div>
    )
  }
}

const ConnectedApp = connect((store) => {
  return {
    user: store.user
  }
}, {
  initBlogs, initUsers, loginFromLocalStorage, logout
})(App)

export default ConnectedApp;
