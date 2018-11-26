import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
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
      error: null,
      info: null,
      blogTitle: '',
      blogAuthor: '',
      blogUrl: '',
      inBlogCreation: false
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs => this.setState({ blogs })
                                           )
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
      this.setState({ username: '', password: '', user, error: null })
      window.localStorage.setItem('user', JSON.stringify(user))
    } catch (exception) {
      this.setState({ error: 'Invalid username or password.' })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    this.setState({ user: null })
  }

  createBlog = async (event) => {
    event.preventDefault()
    try {
      const title = this.state.blogTitle
      const author = this.state.blogAuthor
      const url = this.state.blogUrl
      const newBlog = await blogService.post({ title, author, url })
      newBlog.user = {
        username: this.state.user.username,
        name: this.state.user.name
      }

      setTimeout(() => {
        this.setState({ info: null })
      }, 5000)
      this.setState(previousState => {
        return {
          info: `Added a new blog: '${title}' by ${author}`,
          blogs: previousState.blogs.concat(newBlog),
          inBlogCreation: false
        }
      })
    } catch (exception) {
      console.log(exception)
    }
  }

  like = (blog) => async () => {
    const res = await blogService.put(blog.id, { likes: blog.likes + 1 })
    const likes = res.likes
    const id = blog.id
    this.setState(previousState => {
      const blogs = previousState.blogs
            .map(blog => {
              if (blog.id === id) blog.likes = likes
              return blog
            })
      return {
        blogs
      }
    })
  }

  remove = (blog) => async () => {
    if (window.confirm(`Delete '${blog.title}' by ${blog.author}?`)) {
      const res = await blogService.del(blog.id)
      const id = blog.id
      this.setState(previousState => {
        const blogs = previousState.blogs
              .filter(blog => blog.id !== id)
        return {
          blogs
        }
      })
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
              Title:
              <input type='text' name='blogTitle' required
                     value={this.blogTitle}
                     onChange={this.handleFieldChange} />
          </label></p>
          <p><label>
              Author:
              <input type='text' name='blogAuthor'
                     value={this.blogAuthor}
                     onChange={this.handleFieldChange} />
          </label></p>
          <p><label>
              URL:
              <input type='text' name='blogUrl' required
                     value={this.blogUrl}
                     onChange={this.handleFieldChange} />
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
        {this.state.blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => <Blog key={blog.id} blog={blog} like={this.like(blog)}
                               remove={this.remove(blog)} user={this.state.user} />
        )}
      </div>
    )

    return (
      <div>
        <h2>Blogs</h2>
        <Notification message={ this.state.error } error={true} />
        <Notification message={ this.state.info } error={false} />
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

export default App;
