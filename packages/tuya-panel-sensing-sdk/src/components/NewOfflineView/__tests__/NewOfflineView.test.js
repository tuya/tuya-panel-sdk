import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NewOfflineView from '../index';

configure({ adapter: new Adapter() });

describe('NewOfflineView', () => {
  it('default render', () => {
    const wrapper = shallow(<NewOfflineView showDeviceImg />);
    expect(wrapper).toMatchSnapshot();
  });
});
