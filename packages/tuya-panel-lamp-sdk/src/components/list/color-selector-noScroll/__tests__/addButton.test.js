import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import AddBtn from '../AddBtn';

describe('AddBtn components', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });

  it('basic render', () => {
    const wrapper = shallow(<AddBtn btnColor={'#333'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
