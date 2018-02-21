import React from 'react'
import { shallow, mount } from 'enzyme'
import PostCard from './PostCard'

describe('<PostCard />', () => {

  const props = {
    post: { title: 'Udacity is the best place to learn React' }
  }

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCard {...props} />)
    const actual = wrapper
    expect(actual).toBePresent();
  });

  
  it('should render the <VoteScore />', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCard {...props} />)
    const actual = wrapper.find('VoteScore')
    expect(actual).toBePresent()
  })

  it('should render the <PostCardInfo />', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCard {...props} />)
    const actual = wrapper.find('PostCardInfo')
    expect(actual).toBePresent()
  })

  it('should have all property passed ', () => {
    expect.assertions(1)
    const wrapper = mount(<PostCard {...props} />)
    const actual = wrapper
    const expected = { title: 'Udacity is the best place to learn React' }
    expect(actual).toHaveProp('post', expected)
  })
})
