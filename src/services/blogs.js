import axios from 'axios'
const baseUrl = '/api/blogs'
let token = ''

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const clearToken = () => {
  token = ''
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const post = async (blog) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const res = await axios.post(baseUrl, blog, config)
  return res.data
}

const put = async (id, data) => {
  const res = await axios.put(baseUrl + '/' + id, data)
  return res.data
}

const del = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const res = await axios.delete(baseUrl + '/' + id, config)
  return res.data
}

export default { setToken, clearToken, getAll, post, put, del }
