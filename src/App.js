import React from 'react'
import { connect } from 'react-redux'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import blogService from './services/blogs'
import { clearNotification, notify, notifyError } from './reducers/notificationReducer'
import { initBlogs, postBlog, likeBlog, deleteBlog } from './reducers/blogReducer'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      user: null,
      inBlogCreation: false
    }
  }

  componentDidMount() {
    this.props.initBlogs()
    const localStorageUser = window.localStorage.getItem('user')
    if (localStorageUser !== null) {
      const user = JSON.parse(localStorageUser)
      blogService.setToken(user.token)
      this.setState({ user })
    }
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
      this.props.clearNotification()
      window.localStorage.setItem('user', JSON.stringify(user))
    } catch (exception) {
      this.props.notifyError('Invalid username or password.', 5)
    }
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    this.setState({ user: null })
  }

  createBlog = (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value
    this.props.postBlog(title, author, url, this.state.user)
    this.props.notify(`Added a new blog: '${title}' by ${author}`, 5)
    this.setState({ inBlogCreation: false })
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  like = (blog) => async () => {
    this.props.likeBlog(blog)
  }

  remove = (blog) => async () => {
    if (window.confirm(`Delete '${blog.title}' by ${blog.author}?`)) {
      this.props.deleteBlog(blog.id)
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const blogCreationOpener = () => (
      <div>
        <button onClick={() => {
          this.setState({ inBlogCreation: true }) }}>Create Blog</button>
      </div>
    )

    const blogCreationForm = () => (
      <div>
        <form onSubmit={this.createBlog}>
          <p><label>
              Title: <input type='text' name='title' required />
          </label></p>
          <p><label>
              Author: <input type='text' name='author' />
          </label></p>
          <p><label>
              URL: <input type='text' name='url' required />
          </label></p>
          <button type='submit'>Create</button>
          <button type='button' onClick={() => {
            this.setState({ inBlogCreation: false })}}>Close</button>
        </form>
      </div>
    )

    const blogInterface = () => (
      <div>
        <p>Logged in as: {this.state.user.name}</p>
        <button onClick={this.logout}>logout</button>
        {this.state.inBlogCreation ? blogCreationForm() : blogCreationOpener()}
        {this.props.blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => <Blog key={blog.id} blog={blog} like={this.like(blog)}
                               remove={this.remove(blog)} user={this.state.user} />
        )}
      </div>
    )

    return (
      <div>
        <h2>Blogs</h2>
        <Notification />
        {this.state.user === null &&
          <LoginForm login={this.login}
                     username={this.state.username}
                     password={this.state.password}
                     handleFieldChange={this.handleFieldChange} />}
        {this.state.user !== null && blogInterface()}
      </div>
    )
  }
}

const ConnectedApp = connect((store) => {
  return {
    blogs: store.blogs
  }
}, {
  clearNotification, notify, notifyError,
  initBlogs, postBlog, likeBlog, deleteBlog
})(App)

export default ConnectedApp;
