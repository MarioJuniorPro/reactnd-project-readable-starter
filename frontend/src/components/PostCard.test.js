import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'

import PostCard, { PostCard as PostCardClear } from './PostCard'

describe('<PostCard />', () => {

  const props = {
    post: { id: 'yy12gy12', title: 'Udacity is the best place to learn React', body: 'Body of post --- Body of post --- Body of post --- Body of post --- Body of post --- Body of post ---' }
  }
  
  let defaultWrapper = null
  let clearWrapper = null
  let store= null

  beforeEach(() => {
    store = createStore(() => {})
    defaultWrapper = <Provider store={store}><Router><PostCardClear  {...props} /></Router></Provider>
    clearWrapper = <PostCard {...props} />
  })

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = mount(defaultWrapper)
    const actual = wrapper
    expect(actual).toBePresent();
  });

  
  it('should render the <VoteScore />', () => {
    expect.assertions(1)
    const wrapper = mount(defaultWrapper)
    const actual = wrapper.find('Connect(VoteScore)')
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
    const expected = { id: 'yy12gy12', title: 'Udacity is the best place to learn React', body: 'Body of post --- Body of post --- Body of post --- Body of post --- Body of post --- Body of post ---' }
    expect(actual).toHaveProp('post', expected)
  })

  describe('integration tests', () => {
    it('should delete a post', () => {
      expect.assertions(4)
      const mockProps = {
        deletePost: jest.fn()
      }
      const wrapper = shallow(<PostCardClear {...props} {...mockProps}/>)
      // const postCardWrapper = wrapper.find('Simplert')
      expect(wrapper.state().promptDelete).toBe(false);
      wrapper.instance().promptDelete()
      wrapper.update()
      expect(wrapper.state().promptDelete).toBe(true);
      // wrapper.find('.simplert__confirm').first().simulate('click')
      wrapper.instance().promptDeleteClose()
      wrapper.update()
      expect(wrapper.state().promptDelete).toBe(false);
      wrapper.instance().deletePostById(1)
      wrapper.update()
      expect(mockProps.deletePost).toHaveBeenCalledTimes(1);
    });
  })

})
