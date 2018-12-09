import blogService from '../services/blogs'

const reducer = (store = [], action) => {
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.blogs
  case 'NEW_BLOG':
    return store.concat(action.blog)
  case 'UPDATE_LIKES':
    return store.map(blog => blog.id === action.id ? { ...blog, likes: action.likes } : blog)
  case 'DELETE_BLOG':
    return store.filter(blog => blog.id !== action.id)
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

export const postBlog = (title, author, url, user) => {
  return async (dispatch) => {
    const blog = await blogService.post({ title, author, url })
    /* TODO: check if this is actually needed
    blog.user = {
      username: user.username,
      name: user.name
    }*/
    dispatch({ type: 'NEW_BLOG', blog })
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const id = blog.id
    const res = await blogService.put(id, { likes: blog.likes + 1 })
    const likes = res.likes
    dispatch({ type: 'UPDATE_LIKES', id, likes })
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.del(id)
    dispatch({ type: 'DELETE_BLOG', id })
  }
}

export default reducer
