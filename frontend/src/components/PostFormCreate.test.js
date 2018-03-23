import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'

import PostFormCreate, { PostFormCreate as PostFormCreateClear } from './PostFormCreate'

describe('<Comment />', () => {
  const props = {
  }

  let defaultWrapper = null
  let clearWrapper = null
  let store = null

  beforeEach(() => {
    store = createStore(() => {})
    defaultWrapper = (
      <Provider store={store}>
        <Router>
          <PostFormCreate {...props} />
        </Router>
      </Provider>
    )
    clearWrapper = <PostFormCreateClear {...props} />
  })

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = shallow(defaultWrapper)
    const actual = wrapper
    expect(actual).toBePresent()
  })
})
