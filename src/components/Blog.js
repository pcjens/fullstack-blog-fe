import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
  }

  toggleExpansion = () => {
    this.setState(previousState => {
      return { expanded: !previousState.expanded }
    })
  }

  render() {
    const { blog, like } = this.props

    const likeButton = () => (
      <button onClick={like}>like</button>
    )
    const moreInformation = () => (
      <div className='moreInfo'>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>{blog.likes} likes {likeButton()}</p>
        <p>added by {blog.user.name}</p>
      </div>
    )

    return (
      <div className='blog'>
        <div onClick={this.toggleExpansion}>
          <em>{blog.title}</em> by {blog.author}
        </div>
        {this.state.expanded && moreInformation()}
      </div>
    )
  }
}

export default Blog
