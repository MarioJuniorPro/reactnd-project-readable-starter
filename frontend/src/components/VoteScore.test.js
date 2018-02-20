import React from 'react'
import { shallow, mount } from 'enzyme'
import VoteScore from './VoteScore'

describe('<VoteScore />', () => {
  const props = {
    post: {
      id: 'bonanza',
      voteScore: 66
    }
  }

  it('should render without crash', () => {
    // expect.assertions(1)
    const wrapper = shallow(<VoteScore {...props} />)
    const actual = wrapper
    expect(actual).toBePresent()
  })

  it('should render an increase votes button', () => {
    expect.assertions(1)
    const wrapper = shallow(<VoteScore {...props} />)
    const actual = wrapper.find('.vote-score__increase')
    expect(actual).toBePresent()
  })

  it('should render an decrease votes button', () => {
    expect.assertions(1)
    const wrapper = shallow(<VoteScore {...props} />)
    const actual = wrapper.find('.vote-score__decrease')
    expect(actual).toBePresent()
  })

  it('should render total of votes', () => {
    expect.assertions(1)
    const wrapper = shallow(<VoteScore post={props.post} />)
    const actual = wrapper.find('.vote-score__counter')
    const expected = '66'
    expect(actual).toIncludeText(expected)
  })

  it('should render total of votes passed as props', () => {
    expect.assertions(1)
    const wrapper = mount(<VoteScore post={props.post} />)
    const actual = wrapper
    const expected = { id: 'bonanza', voteScore: 66 }
    expect(actual).toHaveProp('post', expected)
  })
})
