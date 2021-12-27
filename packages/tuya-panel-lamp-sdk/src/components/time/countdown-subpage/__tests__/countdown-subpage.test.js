import React from 'react';
import { shallow } from 'enzyme';
import CountdownSubPage from '../index';
import TimePicker from '../timePicker';
import Clock from '../clock';

describe('countdown-subpage components', () => {
  it('basic render', () => {
    const props = {
      route: {
        params: {
          countdown: 2000,
          picker: {
            time: 2000,
          },
          clock: {
            countdown: 2000,
          },
        },
      },
    };
    const wrapper = shallow(<CountdownSubPage {...props} />);
    const targetNode = wrapper.findWhere(node => {
      return node.name() === 'TouchableOpacity' && !!node.prop('onPress') === true;
    });
    targetNode.props().onPress();
    const targetNode1 = wrapper.findWhere(node => {
      return node.name() === 'TimePicker' && !!node.prop('onChange') === true;
    });
    targetNode1.at(100).props().onChange();
    expect(wrapper).toMatchSnapshot();
  });
  it('render time picker', () => {
    const props = {
      countdown: 2000,
    };
    const wrapper = shallow(<TimePicker {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('render clock', () => {
    const props = {
      countdown: 2000,
    };
    const wrapper = shallow(<Clock {...props} />);
    const targetNode = wrapper.findWhere(node => {
      console.log("'node.name === 'Button'", node.name());
      return node.name() === 'TouchableOpacity' && !!node.prop('onPress') === true;
    });
    expect(wrapper).toMatchSnapshot();
  });
});
