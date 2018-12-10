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
  case 'UPDATE_BLOG_COMMENTS':
    return store.map(blog => blog.id === action.id ? { ...blog, comments: action.comments } : blog)
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
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
    try {
      const blog = await blogService.post({ title, author, url })
      blog.user = {
        username: user.username,
        name: user.name
      }
      dispatch({ type: 'NOTIFY', message: `Added a new blog: '${title}' by ${author}` })
      dispatch({ type: 'NEW_BLOG', blog })
    } catch (exception) {
      dispatch({ type: 'NOTIFY_ERROR', message: `Not logged in!` })
    }
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

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.del(blog.id)
    dispatch({ type: 'DELETE_BLOG', id: blog.id })
  }
}

export const commentOnBlog = (id, comment) => {
  return async (dispatch) => {
    console.log("Sending comment: '" + comment + "' to '" + id + "'")
    const comments = await blogService.postComment(id, comment)
    console.log("Got new comments:", comments)
    dispatch({ type: 'UPDATE_BLOG_COMMENTS', id, comments })
  }
}

export default reducer
