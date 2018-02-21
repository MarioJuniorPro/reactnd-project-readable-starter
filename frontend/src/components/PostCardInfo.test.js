import React from 'react'
import { shallow } from 'enzyme'
import PostCardInfo from './PostCardInfo'

describe('<PostCardInfo />', () => {

  const props = {
    post: {}
  }

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCardInfo {...props} />)
    const actual = wrapper
    expect(actual).toBePresent();
  });
})
