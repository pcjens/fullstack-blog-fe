import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  it('renders title', () => {
    const blog = {
      title: 'Wonderful Title That Should Be Rendered',
      author: 'The Testing Authorist',
      likes: 12
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const titleDiv = blogComponent.find('.title')

    expect(titleDiv.text()).toContain(blog.title)
  })

  it('renders author', () => {
    const blog = {
      title: 'Wonderful Title That Should Be Rendered',
      author: 'The Testing Authorist',
      likes: 12
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const authorDiv = blogComponent.find('.author')

    expect(authorDiv.text()).toContain(blog.author)
  })

  it('renders likes', () => {
    const blog = {
      title: 'Wonderful Title That Should Be Rendered',
      author: 'The Testing Authorist',
      likes: 12
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const likesDiv = blogComponent.find('.likes')

    expect(parseInt(likesDiv.text())).toBe(blog.likes)
  })

  it('calls the event handler twice when clicked twice', () => {
    const blog = {
      title: 'Wonderful Title That Should Be Rendered',
      author: 'The Testing Authorist',
      likes: 12
    }

    const mockHandler = jest.fn()
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
    const button = blogComponent.find('button')
    const clicks = 2
    for (let i = 0; i < clicks; i++)
      button.simulate('click')
    expect(mockHandler.mock.calls.length).toBe(clicks)
  })
})
