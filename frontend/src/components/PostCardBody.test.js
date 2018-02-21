import React from 'react'
import { shallow, mount } from 'enzyme'
import PostCardBody from './PostCardBody'

describe('<PostCardBody />', () => {
  const props = {
    body: 'Everyone says so after all.',
    maxCharacters: 140,
    ending: '...'
  }

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCardBody {...props} />)
    const actual = wrapper
    expect(actual).toBePresent()
  })

  it('should render the description', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCardBody {...props} />)
    const actual = wrapper.find('.posts-card__short-description')
    const expected = 'Everyone says so after all.'
    expect(actual).toHaveText(expected)
  })

  it('should render the description shortened', () => {
    expect.assertions(1)
    const customProps = {
      body: 'Everyone says so after all.',
      maxCharacters: 8,
      ending: '???'
    }
    const wrapper = shallow(<PostCardBody {...customProps} />)
    const actual = wrapper.find('.posts-card__short-description')
    const expected = 'Everyone???'
    expect(actual).toHaveText(expected)
  })

  it('should have all property passed ', () => {
    expect.assertions(3)
    const wrapper = mount(<PostCardBody {...props} />)
    const actual = wrapper
    expect(actual).toHaveProp('body', 'Everyone says so after all.')
    expect(actual).toHaveProp('maxCharacters', 140)
    expect(actual).toHaveProp('ending', '...')
  })
})
