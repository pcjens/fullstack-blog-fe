let initialState = {
  message: '',
  error: false
}

const reducer = (store = initialState, action) => {
  switch (action.type) {
  case 'NOTIFY':
    return { message: action.message, error: false }
  case 'NOTIFY_ERROR':
    return { message: action.message, error: true }
  case 'CLEAR_NOTIFICATION':
    return { ...initialState }
  default:
    return store
  }
}

export const notify = (message, length) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(clearNotification())
    }, length * 1000)
    dispatch({
      type: 'NOTIFY',
      message
    })
  }
}

export const notifyError = (message, length) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(clearNotification())
    }, length * 1000)
    dispatch({
      type: 'NOTIFY_ERROR',
      message
    })
  }
}

export const clearNotification = () => {
  return { type: 'CLEAR_NOTIFICATION' }
}

export default reducer
