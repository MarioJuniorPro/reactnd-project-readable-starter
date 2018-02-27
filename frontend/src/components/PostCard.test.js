import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'

import PostCard, { PostCard as PostCardClear } from './PostCard'

describe('<PostCard />', () => {
  const props = {
    post: {
      id: 'yy12gy12',
      title: 'Udacity is the best place to learn React',
      body:
        'Body of post --- Body of post --- Body of post --- Body of post --- Body of post --- Body of post ---',
      voteScore: 66,
      timestamp: 1467166872634
    }
  }

  let defaultWrapper = null
  let clearWrapper = null
  let store = null

  beforeEach(() => {
    store = createStore(() => {})
    defaultWrapper = (
      <Provider store={store}>
        <Router>
          <PostCard {...props} />
        </Router>
      </Provider>
    )
    clearWrapper = <PostCardClear {...props} />
  })

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = mount(defaultWrapper)
    const actual = wrapper
    expect(actual).toBePresent()
  })

  it('should render the <VoteScore />', () => {
    expect.assertions(1)
    const wrapper = mount(defaultWrapper)
    const actual = wrapper.find('VoteScore')
    expect(actual).toBePresent()
  })

  it('should render the <Card />', () => {
    expect.assertions(1)
    const wrapper = mount(defaultWrapper)
    const actual = wrapper.find('Card')
    expect(actual).toBePresent()
  })

  it('should have all property passed ', () => {
    expect.assertions(1)

    const wrapper = mount(defaultWrapper)
    const actual = wrapper.find('PostCard')
    const expected = {
      id: 'yy12gy12',
      title: 'Udacity is the best place to learn React',
      body:
        'Body of post --- Body of post --- Body of post --- Body of post --- Body of post --- Body of post ---',
      voteScore: 66,
      timestamp: 1467166872634
    }
    expect(actual).toHaveProp('post', expected)
  })

  describe('integration tests', () => {
    it('should display post card optins', () => {
      expect.assertions(3)
      const wrapper = shallow(<PostCardClear {...props} />)
      expect(wrapper.state().promptDelete).toBe(false)
      wrapper.instance().promptDelete()
      wrapper.update()
      expect(wrapper.state().promptDelete).toBe(true)
      wrapper.instance().promptDeleteClose()
      wrapper.update()
      expect(wrapper.state().promptDelete).toBe(false)
    })

    it('should delete a post', () => {
      expect.assertions(1)
      const mockProps = {
        deletePost: jest.fn()
      }
      const wrapper = mount(
        <Provider store={store}>
          <Router>
            <PostCardClear {...props} {...mockProps} />
          </Router>
        </Provider>
      )
      wrapper
        .find('PostCard')
        .first()
        .instance()
        .promptDelete()
      wrapper.update()
      wrapper.find('.simplert__confirm').simulate('click')
      expect(mockProps.deletePost).toHaveBeenCalledTimes(1)
    })
  })
})
