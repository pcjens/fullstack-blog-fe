import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

describe('<App />', () => {
  describe('when user is logged out', () => {
    let app
    beforeEach(() => {
      app = mount(<App />)
    })

    it('only renders the login form if the user is not logged in', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toBe(0)
      const loginForm = app.find(LoginForm)
      expect(loginForm.length).toBe(1)
    })
  })

  describe('when the user is logged in', () => {
    let app
    beforeEach(() => {
      const user = {
        username: 'newuser',
        name: 'New User',
        token: 'mocktoken'
      }
      window.localStorage.setItem('user', JSON.stringify(user))
      app = mount(<App />)
    })

    it('only renders the blogs if the user is logged in', () => {
      app.update()
      const blogComponents = app.find(Blog)
      expect(blogComponents.length).toBe(blogService.blogs.length)
      const loginForm = app.find(LoginForm)
      expect(loginForm.length).toBe(0)
    })
  })
})
