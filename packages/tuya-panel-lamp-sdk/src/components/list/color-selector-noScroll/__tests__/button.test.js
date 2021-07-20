import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import Button from '../Button';

describe('Button components', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });

  it('basic render', () => {
    const wrapper = shallow(<Button color={'#333'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
