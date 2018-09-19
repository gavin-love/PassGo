import React from 'react';
import SignUp from '../components/SignUp';
import TestRenderer from 'react-test-renderer';

it('should match snapshot upon render', () => {
  const navigation = {
    navigate: jest.fn()
  }
  const wrapper = TestRenderer.create(<SignUp navigation={navigation}/>);
  expect(wrapper).toMatchSnapshot();
})