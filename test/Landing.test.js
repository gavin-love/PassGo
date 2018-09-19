import React, { Component } from 'react';
import Landing from '../components/Landing';
import TestRenderer from 'react-test-renderer';

it('renders correctly if user is not logged in', () => {
  const navigation = {
    navigate: jest.fn()
  }
  const wrapper = TestRenderer.create(<Landing navigation={navigation}/>);
  expect(wrapper).toMatchSnapshot();
});

it('renders correctly if user is logged in', () => {
  const navigation = {
    navigate: jest.fn()
  }
  const wrapper = TestRenderer.create(<Landing navigation={navigation} />);
  wrapper.getInstance().setState({ loggedIn: true });
  expect(wrapper).toMatchSnapshot();
});