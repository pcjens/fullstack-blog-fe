import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogCreation from './components/BlogCreation'
import User from './components/User'
import Users from './components/Users'
import BlogList from './components/BlogList'
import { initBlogs } from './reducers/blogReducer'
import { loginFromLocalStorage, logout } from './reducers/userReducer'
import { initUsers } from './reducers/userbaseReducer'

const Nav = ({ name, logout }) => (
  <div>
    <p>Logged in as: {name} <button onClick={logout}>logout</button></p>
  </div>
)

const BlogOverview = () => (
  <div>
    <BlogCreation />
    <BlogList />
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
