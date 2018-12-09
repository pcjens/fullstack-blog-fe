import blogService from '../services/blogs'

const reducer = (store = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.blogs
  default:
    return store
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      blogs
    })
  }
}

export default reducer
