import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Header, Form, Button, Input, Card, Icon, Label } from 'semantic-ui-react'
import { likeBlog, deleteBlog, commentOnBlog } from '../reducers/blogReducer'
import { notify } from '../reducers/notificationReducer'
import CommentsList from './CommentsList'

class Blog extends React.Component {
  render() {
    const { user, blogs, id, deleteBlog, likeBlog, commentOnBlog } = this.props
    const blog = blogs.find(blog => blog.id === id)
    if (blog === undefined) {
      return (<div>Blog not found.</div>)
    } else {
      const canRemove = blog.user.username === undefined ||
            blog.user.username === user.username
      const remove = () => {
        if (window.confirm(`Delete '${blog.title}' by ${blog.author}?`)) {
          deleteBlog(blog)
        }
      }

      const removeButton = () => (<Button onClick={remove} as='span' floated='right'>Delete</Button>)
      const like = () => {
        likeBlog(blog)
        this.props.notify('Liked!', 2)
      }
      const comment = (event) => {
        event.preventDefault()
        commentOnBlog(blog.id, event.target.comment.value)
        event.target.comment.value = ''
      }

      return (
        <div>
          <Card>
            <Card.Content>
              <Card.Header>
                <a href={blog.url} rel='noopener noreferrer' target='_blank'>
                  <em className='title'>{blog.title}</em>
                </a>
              </Card.Header>
              <Card.Meta>By <span className='author'>{blog.author}</span></Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Icon name='user'/>
              Added by <Link to={'/users/' + blog.user._id}>{blog.user.name}</Link>
            </Card.Content>
            <Card.Content extra>
              <Button onClick={like} as='span' labelPosition='right'>
                <Button icon>
                  <Icon name='star'/> Like
                </Button>
                <Label as='a' basic pointing='left'>
                  {blog.likes}
                </Label>
              </Button>
              {canRemove && removeButton()}
            </Card.Content>
          </Card>
          <Header as='h3'>Comments</Header>
          <Form onSubmit={comment}>
            <Input type='text' name='comment' placeholder='Great post!' label={<Button type='submit'>Comment</Button>} labelPosition='right' />
          </Form>
          <CommentsList id={blog.id} />
        </div>
      )
    }
  }
}

const ConnectedBlog = connect(store => ({
  user: store.user,
  blogs: store.blogs
}), {
  likeBlog, deleteBlog, commentOnBlog, notify
})(Blog)

export default ConnectedBlog
