import React from 'react'
import { shallow } from 'enzyme'
import PostCard from './PostCard'

describe('<PostCard/>', () => {

  const props = {
    post: {}
  }

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostCard {...props} />)
    expect(wrapper).toBePresent();
  });
})
