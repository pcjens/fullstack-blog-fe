import axios from 'axios'
const baseUrl = '/api/blogs'
let token = ''

const setToken = (newToken) => {
  token = `bearer ${newToken}`
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

export default { setToken, getAll, post, put }
