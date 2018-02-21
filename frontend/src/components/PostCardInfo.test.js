import React from 'react'
import { shallow, mount } from 'enzyme'
import PostCardInfo from './PostCardInfo'

describe('<PostCardInfo />', () => {
  const props = {
    post: {
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      commentCount: 77,
      author: 'Mario Costa Junior'
    }
  }

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCardInfo {...props} />)
    const actual = wrapper
    expect(actual).toBePresent()
  })

  it('should render the <PostCardTitle />', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCardInfo post={props.post} />)
    const actual = wrapper.find('PostCardTitle')
    expect(actual).toBePresent()
  })

  it('should render the <PostCardAuthor />', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCardInfo post={props.post} />)
    const actual = wrapper.find('PostCardAuthor')
    expect(actual).toBePresent()
  })

  xit('should render the <PostCardBody />', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCardInfo post={props.post} />)
    const actual = wrapper.find('PostCardBody')
    expect(actual).toBePresent()
  })

  it('should render the <CommentCount />', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCardInfo post={props.post} />)
    const actual = wrapper.find('CommentCount')
    expect(actual).toBePresent()
  })

  it('should have all property passed ', () => {
    expect.assertions(1)
    const wrapper = mount(<PostCardInfo post={props.post} />)
    const actual = wrapper
    const expected = {
      title: 'Udacity is the best place to learn React',
      body: 'Everyone says so after all.',
      commentCount: 77,
      author: 'Mario Costa Junior'
    }
    expect(actual).toHaveProp('post', expected)
  })
})
