import React from 'react';
import { shallow } from 'enzyme';
import Row from '../components/Row';

describe('Row components', () => {
  it('basic render', () => {
    const props = {
      fontColor: '#fff',
      label: '',
      value: '',
      onPress() {},
    };
    const wrapper = shallow(<Row {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
