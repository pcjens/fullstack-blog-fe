import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login, username, password, handleFieldChange }) => (
  <div>
    <p>Please login to use the service.</p>
    <form onSubmit={login}>
      <p>
        <label>
          Username:
          <input type='text' name='username' value={username}
                 onChange={handleFieldChange} />
        </label>
      </p>
      <p>
        <label>
          Password:
          <input type='password' name='password' value={password}
                 onChange={handleFieldChange} />
        </label>
      </p>
      <button type='submit'>Login</button>
    </form>
  </div>
)

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleFieldChange: PropTypes.func.isRequired
}

export default LoginForm
