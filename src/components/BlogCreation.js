import React from 'react'
import { connect } from 'react-redux'
import { postBlog } from '../reducers/blogReducer'

class BlogCreation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false
    }
  }

  createBlog = (event) => {
    event.preventDefault()
    this.props.postBlog(event.target.title.value, event.target.author.value, event.target.url.value, this.props.user)
    this.setState({ visible: false })
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  render() {
    const blogCreationOpener = () => (
      <div>
        <button onClick={() => {
          this.setState({ visible: true }) }}>Create Blog</button>
      </div>
    )

    const blogCreationForm = () => (
      <div>
        <form onSubmit={this.createBlog}>
          <p><label>
              Title: <input type='text' name='title' required />
          </label></p>
          <p><label>
              Author: <input type='text' name='author' />
          </label></p>
          <p><label>
              URL: <input type='text' name='url' required />
          </label></p>
          <button type='submit'>Create</button>
          <button type='button' onClick={() => {
            this.setState({ visible: false })}}>Close</button>
        </form>
      </div>
    )

    return (
      <div>
        { this.state.visible ? blogCreationForm() : blogCreationOpener() }
      </div>
    )
  }
}

const ConnectedBlogCreation = connect((store) => {
  return {
    user: store.user
  }
}, {
  postBlog
})(BlogCreation)

export default ConnectedBlogCreation
