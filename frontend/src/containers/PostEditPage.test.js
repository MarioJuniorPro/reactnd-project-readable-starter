import React from 'react';
import ReactDOM from 'react-dom';
import PostEditPage from './PostEditPage';

import { shallow } from 'enzyme'

it('shallow render without crashing', () => {
  const wrapper = shallow(<PostEditPage />);
  expect(wrapper).toHaveLength(1)
});
