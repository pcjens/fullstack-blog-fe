import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'

class LoginForm extends React.Component {
  login = (event) => {
    event.preventDefault()
    this.props.login(event.target.username.value, event.target.password.value)
    event.target.username.value = ''
    event.target.password.value = ''
  }

  render() {
    return (
      <div>
        <p>Please login to use the service.</p>
        <form onSubmit={this.login}>
          <p>
            <label>
              Username: <input type='text' name='username' />
            </label>
          </p>
          <p>
            <label>
              Password: <input type='password' name='password' />
            </label>
          </p>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }
}

export default connect(null, { login })(LoginForm)
