import React from 'react'

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
    const { blog, like, remove, user } = this.props

    const emojiLike = (<span role='img' aria-label='star'>⭐</span>)
    const emojiDelete = (<span role='img' aria-label='wastebasket'>🗑️</span>)
    const canRemove = blog.user.username === undefined ||
          blog.user.username === user.username
    const removeButton = () => (<button onClick={remove}>Delete {emojiDelete}</button>)
    const moreInformation = () => (
      <div className='moreInfo'>
        <p><a href={blog.url}>{blog.url}</a></p>
        <p>{blog.likes} likes <button onClick={like}>Like {emojiLike}</button></p>
        <p>added by {blog.user.name}</p>
        <p>{canRemove && removeButton()}</p>
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
