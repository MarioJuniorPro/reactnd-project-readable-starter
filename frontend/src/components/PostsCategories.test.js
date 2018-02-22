import React from 'react'
import { shallow, mount } from 'enzyme'
import { MemoryRouter as Router } from 'react-router-dom'

import PostsCategories from './PostsCategories'

describe('<PostsCategories />', () => {
  const props = {
    name: 'Udacity is the best place to learn React',
    path: 'posts/1'
  }

  it('should render without crash', () => {
    expect.assertions(1)
    const wrapper = shallow(<PostsCategories {...props} />)
    const actual = wrapper
    expect(actual).toBePresent()
  })

  xit('should render links based on props', () => {
    const props = {
      categories: [
        {title: 'Hot', path: '/' },
        {title: 'React', path: '/react' }
      ]
    }
    expect.assertions(1)
    const wrapper = shallow(<PostsCategories {...props} />)
    const actual = wrapper.find('NavLink')
    expect(actual).toHaveLength(2)
  })

  // it('should have all property passed ', () => {
  //   expect.assertions(2)
  //   const wrapper = mount(<Router><PostsCategories {...props} /></Router>)
  //   const actual = wrapper.find('PostsCategories')
  //   expect(actual).toHaveProp('title', 'Udacity is the best place to learn React')
  //   expect(actual).toHaveProp('path', '/posts/1')
  // })
})
