import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'

import PostCardInfo, { PostCardInfo as PostCardInfoClear } from './PostCardInfo'

describe('<PostCardInfo />', () => {
  const props = {
    post: {
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      commentCount: 77,
      author: 'Mario Costa Junior'
    }
  }

  let defaultWrapper = null
  let clearWrapper = null

  beforeEach(() => {
    const store = createStore(() => {})
    defaultWrapper = (
      <Provider store={store}>
        <Router>
          <PostCardInfo {...props} />
        </Router>
      </Provider>
    )
    clearWrapper = <PostCardInfoClear {...props} />
  })

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = shallow(clearWrapper)
    const actual = wrapper
    expect(actual).toBePresent()
  })

  it('should render the <PostCardTitle />', () => {
    expect.assertions(1)
    const wrapper = shallow(clearWrapper)
    const actual = wrapper.find('PostCardTitle')
    expect(actual).toBePresent()
  })

  it('should render the <PostCardAuthor />', () => {
    expect.assertions(1)
    const wrapper = shallow(clearWrapper)
    const actual = wrapper.find('PostCardAuthor')
    expect(actual).toBePresent()
  })

  it('should render the <CommentCount />', () => {
    expect.assertions(1)
    const wrapper = shallow(clearWrapper)
    const actual = wrapper.find('CommentCount')
    expect(actual).toBePresent()
  })

  it('should have all property passed ', () => {
    expect.assertions(1)
    const store = createStore(() => {})
    const wrapper = mount(defaultWrapper)
    const actual = wrapper.find('PostCardInfo')
    const expected = {
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      commentCount: 77,
      author: 'Mario Costa Junior'
    }
    expect(actual).toHaveProp('post', expected)
  })
})
