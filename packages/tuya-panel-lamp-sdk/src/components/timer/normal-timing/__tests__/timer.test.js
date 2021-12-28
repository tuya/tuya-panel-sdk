import React from 'react';
import { shallow } from 'enzyme';
import { Text } from 'react-native';
import Timer from '../timer/index';

const themeConfig = {};
const timerConfig = {
  addTimerRouter: 'addTimer', // 添加/编辑定时路由 注意切换方式
  openLampRouter: 'testWhite', // 执行动作开灯路由
  weeksRouter: 'repeat', // 自定义周期路由
  limit: 30,
  checkConflict: 1,
  is24Hour: false,
  category: 'category_timer1', // 分类名称
  // 用户自定义逻辑:添加/编辑定时，自定义选择周期
  customAddTimer: (value, item, is24Hour) => {
    navigation.push('addTimer', {
      // dataAction: configData.timerConfig.dataAction,
      timerId: item.timerId,
      is24Hour,
      isAdd: value,
      currTimerData: item,
      customAddTimerSave: () => {
        navigation.replace('timer', { themeConfig, timerConfig });
        console.log('onAddTimerSave');
      },
      customAddTimerBack: () => {
        navigation.goBack();
      },
      customAddTimerDelete: () => {
        navigation.replace('timer', { themeConfig, timerConfig });
      },
      customWeeksRouter: 'repeat',
      customOenLampRouter: 'testWhite',
    });
  },
};
const route = {
  params: {
    timerConfig,
    themeConfig,
  },
};
const navigation = {
  push() {},
};

describe('Timer components', () => {
  it('basic render', () => {
    const wrapper = shallow(<Timer route={route} navigation={navigation} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render AddButton', () => {
    const wrapper = shallow(<Timer route={route} navigation={navigation} />);
    const targetNode = wrapper.findWhere(
      node => node.name() === 'AddButton' && !!node.prop('handleAdd') === true
    );
    targetNode.at(0).props().handleAdd();
    expect(wrapper).toMatchSnapshot();
  });
});
