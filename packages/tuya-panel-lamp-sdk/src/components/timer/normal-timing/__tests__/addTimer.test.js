import React from 'react';
import { shallow } from 'enzyme';
import AddTimer from '../addTimer';

const route = {
  params: {
    isAdd: true,
    currTimerData: {
      hour: 12,
      minute: 0,
      weeks: [0, 0, 0, 0, 0, 0, 0, 0],
      dpPowerValue: false,
      hue: 0,
      saturation: 1000,
      value: 1000,
      brightness: 1000,
      temperature: 500,
      workMode: 'white',
    },
    timerId: '',
    checkConflict: 1,
    category: 'category_timer',
    is24Hour: false,
    singleTimePickerStyle: {},
    rowStyle: {},
    weekOptionStyle: {},
    themeColor: '#1082fe',
    fontColor: '#626982',
    backgroundColor: '#fff',
    weeksRouter: 'week',
    openLampRouter: 'openLamp',
    onSave() {},
    customAddTimerSave() {},
    customAddTimerBack() {},
    customAddTimerDelete() {},
    customWeeksRouter: 'customWeekRouter',
    customOenLampRouter: 'customRouter',
  },
};
const navigation = {
  push() {},
  goBack() {},
};

describe('AddTimer components', () => {
  it('basic render', () => {
    const wrapper = shallow(<AddTimer route={route} navigation={navigation} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('base render', () => {
    const data = {
      params: {
        ...route.params,
        isAdd: false,
        is24Hour: true,
      },
    };
    const wrapper = shallow(<AddTimer route={data} navigation={navigation} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render row', () => {
    const wrapper = shallow(<AddTimer route={route} />);
    const targetNode = wrapper.findWhere(
      node => node.name() === 'Row' && !!node.prop('onPress') === true
    );
    targetNode.at(0).simulate('press');
    targetNode.at(1).simulate('press');
    expect(wrapper).toMatchSnapshot();
  });

  it('render singleTimer onChange', () => {
    const wrapper = shallow(<AddTimer route={route} />);
    const targetNode = wrapper.findWhere(
      node => node.name() === 'SingleTimePicker' && !!node.prop('onChange') === true
    );
    targetNode.at(0).simulate('change', 2, 3);
    expect(wrapper).toMatchSnapshot();
  });

  it('render WrapperComponent onCancel', () => {
    const wrapper = shallow(<AddTimer route={route} />);
    const targetNode = wrapper.findWhere(
      node => node.name() === 'WrapperComponent' && !!node.prop('onCancel') === true
    );
    targetNode.at(0).props().onCancel();
    targetNode.at(1).props().onCancel();
    expect(wrapper).toMatchSnapshot();
  });

  it('render WrapperComponent onMaskPress', () => {
    const wrapper = shallow(<AddTimer route={route} />);
    const targetNode = wrapper.findWhere(
      node => node.name() === 'WrapperComponent' && !!node.prop('onMaskPress') === true
    );
    targetNode.at(0).props().onMaskPress();
    targetNode.at(1).props().onMaskPress();
    expect(wrapper).toMatchSnapshot();
  });

  it('render WrapperComponent onSelect', () => {
    const wrapper = shallow(<AddTimer route={route} />);
    const targetNode = wrapper.findWhere(
      node => node.name() === 'WrapperComponent' && !!node.prop('onSelect') === true
    );
    targetNode.at(0).props().onSelect();
    targetNode.at(1).props().onSelect();
    expect(wrapper).toMatchSnapshot();
  });

  it('render onBack', () => {
    const data = {
      params: {
        ...route.params,
        isAdd: false,
        is24Hour: true,
      },
    };
    const wrapper = shallow(<AddTimer route={data} navigation={navigation} />);
    const targetNode = wrapper.findWhere(
      node => node.name() === 'CustomTopBar' && !!node.prop('onBack') === true
    );
    targetNode.at(0).simulate('back');
    expect(wrapper).toMatchSnapshot();
  });
});
