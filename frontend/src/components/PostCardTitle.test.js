import React from 'react'
import { shallow, mount } from 'enzyme'
import PostCardTitle from './PostCardTitle'

describe('<PostCardTitle />', () => {
  const props = {
    title: 'Udacity is the best place to learn React',
    path: '/posts/1'
  }

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCardTitle {...props} />)
    const actual = wrapper
    expect(actual).toBePresent()
  })

  it('should render the title inside a link', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCardTitle {...props} />)
    const actual = wrapper.find('.posts-card__title .posts-card__link')
    const expected = 'Udacity is the best place to learn React'
    expect(actual).toHaveText(expected)
  })

  it('should have all property passed ', () => {
    expect.assertions(2)
    const wrapper = mount(<PostCardTitle {...props} />)
    const actual = wrapper
    expect(actual).toHaveProp('title', 'Udacity is the best place to learn React')
    expect(actual).toHaveProp('path', '/posts/1')
  })
})
