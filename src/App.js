import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      username: '',
      password: '',
      user: null,
      error: null
    }
  }

  componentDidMount() {
    const blogs = blogService.getAll().then(blogs =>
      this.setState({ blogs })
                                           )
    const localStorageUser = window.localStorage.getItem('user')
    if (localStorageUser !== null) {
      const user = JSON.parse(localStorageUser)
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
      this.setState({ username: '', password: '', user, error: null })
      window.localStorage.setItem('user', JSON.stringify(user))
    } catch (exception) {
      this.setState({ error: 'Invalid username or password.' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    this.setState({ user: null })
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    const loginForm = () => (
      <div>
        <p>Please login to use the service.</p>
        <form onSubmit={this.login}>
          <p>
            <label>
              Username:
              <input type='text' name='username'
                     value={this.state.username}
                     onChange={this.handleLoginFieldChange}/>
            </label>
          </p>
          <p>
            <label>
              Password:
              <input type='password' name='password'
                     value={this.state.password}
                     onChange={this.handleLoginFieldChange}/>
            </label>
          </p>
          <button type='submit'>Login</button>
        </form>
      </div>
    )

    const blogInterface = () => (
      <div>
        <p>Logged in as: {this.state.user.name}</p>
        <button onClick={this.logout}>logout</button>
        {this.state.blogs.map(
          blog =>
            <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    )

    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={ this.state.error }/>
        {this.state.user === null && loginForm()}
        {this.state.user !== null && blogInterface()}
      </div>
    )
  }
}

export default App;
