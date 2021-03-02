import React from 'react';
import { shallow } from 'enzyme';
import Loading from '../index';

describe('Loading components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <Loading type={'bubbles'} size={20} color={'#ff0987'} spaceBetween={10} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  // it('componentWillReceiveProps render', () => {
  //   let type = 'double-bounce';
  //   const wrapper = shallow(<Loading type={type} size={20} color={'#ff0987'} />);
  //   type = 'ring';
  //   expect(wrapper).toMatchSnapshot();
  //   wrapper.setProps({ wrapper });
  //   expect(wrapper).toMatchSnapshot();
  //   wrapper.unmount();
  // });
});
