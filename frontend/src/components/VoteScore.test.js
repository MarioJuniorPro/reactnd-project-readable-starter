import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { shallow, mount } from 'enzyme'
import VoteScore, { VoteScore as VoteScoreClear } from './VoteScore'

describe('<VoteScore />', () => {
  const props = {
    post: {
      id: 'bonanza',
      voteScore: 66
    }
  }
  let defaultWrapper = null
  let clearWrapper = null

  beforeEach(() => {
    const store = createStore(() => {})
    defaultWrapper = <Provider store={store}><VoteScore  {...props} /></Provider>
    clearWrapper = <VoteScoreClear {...props} />
  })

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = mount(defaultWrapper)
    const actual = wrapper
    expect(actual).toBePresent()
  })

  it('should render an increase votes button', () => {
    expect.assertions(1)
    const wrapper = shallow(clearWrapper)
    const actual = wrapper.find('.vote-score__button--increase')
    expect(actual).toBePresent()
  })

  it('should render an decrease votes button', () => {
    expect.assertions(1)
    const wrapper = shallow(clearWrapper)
    const actual = wrapper.find('.vote-score__button--decrease')
    expect(actual).toBePresent()
  })

  it('should render total of votes', () => {
    expect.assertions(1)
    const wrapper = mount(defaultWrapper)
    const actual = wrapper.find('.vote-score__counter').last().prop('data-text')
    const expected = 66
    expect(actual).toEqual(expected)
  })

  it('should have total of votes passed as props', () => {
    expect.assertions(1)
    const wrapper = mount(defaultWrapper)
    const actual = wrapper.find('VoteScore')
    const expected = { id: 'bonanza', voteScore: 66 }
    expect(actual).toHaveProp('post', expected)
  })

  it('should call upVotePost', () => {
    expect.assertions(1)
    const mockProps = {
      upVotePost: jest.fn()
    }
    const wrapper = shallow(<VoteScoreClear {...props} {...mockProps}/>)
    const actual = wrapper.find('.vote-score__button--increase')
    actual.simulate('click')
    expect(mockProps.upVotePost).toHaveBeenCalledTimes(1);
  })

  it('should call downVotePost', () => {
    expect.assertions(1)
    const mockProps = {
      downVotePost: jest.fn()
    }
    const wrapper = shallow(<VoteScoreClear {...props} {...mockProps}/>)
    const actual = wrapper.find('.vote-score__button--decrease')
    actual.simulate('click')
    expect(mockProps.downVotePost).toHaveBeenCalledTimes(1);
  })
})
