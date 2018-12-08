import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
  it('only renders title and author by default', () => {
    const user = {
      username: "fauxuser",
      name: "Faux User"
    }
    const blog = {
      title: 'Wonderful Title That Should Be Rendered',
      author: 'The Testing Authorist',
      likes: 12,
      user
    }

    const mockLike = jest.fn()
    const mockRemove = jest.fn()
    const blogComponent = shallow(<Blog blog={blog} user={user} like={mockLike} remove={mockRemove} />)
    const titleDiv = blogComponent.find('.title')
    const authorDiv = blogComponent.find('.author')
    const moreInfoDiv = blogComponent.find('.moreInfo')

    expect(titleDiv.text()).toContain(blog.title)
    expect(authorDiv.text()).toContain(blog.author)
    expect(moreInfoDiv.length).toBe(0)
  })

  it('displays more information when clicked', () => {
    const user = {
      username: "fauxuser",
      name: "Faux User"
    }
    const blog = {
      title: 'Wonderful Title That Should Be Rendered',
      author: 'The Testing Authorist',
      likes: 12,
      user
    }

    const mockLike = jest.fn()
    const mockRemove = jest.fn()
    const blogComponent = shallow(<Blog blog={blog} user={user} like={mockLike} remove={mockRemove} />)

    const testContent = (expectMoreInfo) => {
      const titleDiv = blogComponent.find('.title')
      const authorDiv = blogComponent.find('.author')
      const moreInfoDiv = blogComponent.find('.moreInfo')

      expect(titleDiv.text()).toContain(blog.title)
      expect(authorDiv.text()).toContain(blog.author)
      if (expectMoreInfo) {
        expect(moreInfoDiv.length).toBe(1)

        const likesDiv = blogComponent.find('.likes')
        expect(parseInt(likesDiv.text())).toBe(blog.likes)
      } else {
        expect(moreInfoDiv.length).toBe(0)
      }
    }

    testContent(false)
    blogComponent.find('.expander').simulate('click')
    testContent(true)
  })
})
