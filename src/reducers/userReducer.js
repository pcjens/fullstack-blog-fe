import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = {
  username: '',
  name: '',
  ofAge: false,
  token: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.user
  case 'LOGOUT':
    return { ...initialState }
  default:
    return state
  }
}

export const loginFromLocalStorage = () => {
  const localStorageUser = window.localStorage.getItem('user')
  if (localStorageUser !== null) {
    const user = JSON.parse(localStorageUser)
    blogService.setToken(user.token)
    return {
      type: 'LOGIN',
      user
    }
  } else {
    return { type: '' }
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('user', JSON.stringify(user))
      dispatch({ type: 'CLEAR_NOTIFICATION' })
      dispatch({ type: 'LOGIN', user })
    } catch (exception) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
      dispatch({ type: 'NOTIFY_ERROR', message: 'Invalid username or password.' })
    }
  }
}

export const logout = () => {
  window.localStorage.clear()
  blogService.clearToken()
  return {
    type: 'LOGOUT'
  }
}

export default reducer
