import React from 'react'
import { connect } from 'react-redux'
import { login } from '../reducers/userReducer'
import { Form, Button } from 'semantic-ui-react'

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
        <Form onSubmit={this.login}>
          <Form.Field>
            <label>
              Username: <input type='text' name='username' />
            </label>
          </Form.Field>
          <Form.Field>
            <label>
              Password: <input type='password' name='password' />
            </label>
          </Form.Field>
          <Button type='submit'>Login</Button>
        </Form>
        <br/>
      </div>
    )
  }
}

export default connect(null, { login })(LoginForm)
