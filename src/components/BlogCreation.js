import React from 'react'
import { connect } from 'react-redux'
import { Button, Form } from 'semantic-ui-react'
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
        <Button onClick={() => { this.setState({ visible: true }) }}>Create Blog</Button>
      </div>
    )

    const blogCreationForm = () => (
      <div>
        <Form onSubmit={this.createBlog}>
          <Form.Field><label>
              Title: <input type='text' name='title' required />
          </label></Form.Field>
          <Form.Field><label>
              Author: <input type='text' name='author' />
          </label></Form.Field>
          <Form.Field><label>
              URL: <input type='text' name='url' required />
          </label></Form.Field>
          <Button type='submit'>Create</Button>
          <Button type='button' onClick={() => {
            this.setState({ visible: false })}}>Close</Button>
        </Form>
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
