import React from 'react';
import { shallow } from 'enzyme';
import ColorRecognization from '../index';
import Res from '../../../../res';

describe('ColorRecognization components', () => {
  it('basic render', () => {
    const wrapper = shallow(<ColorRecognization activeKey={1} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render with other activeKey', () => {
    const wrapper = shallow(<ColorRecognization activeKey={2} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render with other source', () => {
    const wrapper = shallow(<ColorRecognization activeKey={2} source={Res.colorPicker} />);
    expect(wrapper).toMatchSnapshot();
  });
});
