import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Menu, Header } from 'semantic-ui-react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogCreation from './components/BlogCreation'
import User from './components/User'
import Users from './components/Users'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import { initBlogs } from './reducers/blogReducer'
import { loginFromLocalStorage, logout } from './reducers/userReducer'
import { initUsers } from './reducers/userbaseReducer'

const Nav = ({ logout }) => (
  <Menu pointing>
    <Menu.Item link><Link to='/'>Blogs</Link></Menu.Item>
    <Menu.Item link><Link to='/users'>Users</Link></Menu.Item>
    <Menu.Item link position='right'><Link to='/' onClick={logout}>Logout</Link></Menu.Item>
  </Menu>
)

const BlogOverview = () => (
  <div>
    <BlogCreation />
    <BlogList />
  </div>
)

const Footer = () => (
  <div>
    <br/>
    <p style={{ textAlign: 'center' }}>
      The source for this blog can be found on <a href='https://github.com/pcjens/fullstack-blog-fe'>GitHub</a>.
    </p>
    <br/>
  </div>
)

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
        <Route exact path='/' render={() => <BlogOverview />}></Route>
        <Route exact path='/users' render={() => <Users />}></Route>
        <Route exact path='/users/:id' render={({ match }) => <User id={match.params.id} />}></Route>
        <Route exact path='/blogs/:id' render={({ match }) => <Blog id={match.params.id} />}></Route>
      </div>
    )

    return (
      <Container>
        <Router>
          <div>
            <br/>
            <Header as='h1'>Blogs</Header>
            { loggedIn && <Nav logout={this.logout} /> }
            <Notification />
            { !loggedIn ? <LoginForm login={this.login} /> : routes() }
            <Footer />
          </div>
        </Router>
      </Container>
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

export default ConnectedApp
