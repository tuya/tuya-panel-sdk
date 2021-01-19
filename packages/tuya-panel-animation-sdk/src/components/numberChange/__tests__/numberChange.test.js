import React from 'react';
import { shallow } from 'enzyme';
import NumberChange from '../index';

describe('NumberChange components', () => {
  it('basic render', () => {
    let value = 60;
    const wrapper = shallow(<NumberChange value={value} />);
    expect(wrapper).toMatchSnapshot();

    value = 82;
    wrapper.setProps({ value });
  });

  it('useUnitText render', () => {
    const wrapper = shallow(
      <NumberChange value={60} useUnitText={true} disabled={true} useInitAnimated={false} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
