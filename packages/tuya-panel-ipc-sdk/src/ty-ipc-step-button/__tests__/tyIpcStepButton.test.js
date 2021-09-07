import React from 'react';
import { shallow, mount } from 'enzyme';
import TYIpcStepButton from '../index';
// import 'jsdom-global/register';

const onValueChange = value => {
  console.log(value);
};

describe('TYIpcStepButton', () => {
  it('default', () => {
    const wrapper = shallow(<TYIpcStepButton />);
    expect(wrapper).toMatchSnapshot();
  });

  it('other param', () => {
    const wrapper = shallow(
      <TYIpcStepButton
        containerStyle={{ width: 200 }}
        onValueChange={onValueChange}
        initialValue={1}
        step={5}
        unit="m"
        min={0}
        max={200}
        speed={0.1}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('press', async () => {
    const wrapper = mount(
      <TYIpcStepButton
        containerStyle={{ width: 200 }}
        onValueChange={onValueChange}
        initialValue={1}
        step={5}
        unit="m"
        min={0}
        max={200}
        speed={0.5}
      />
    );

    const targetNode = wrapper.findWhere(node => node.name() === 'TouchableOpacity');
    for (let i = 0; i < 2; i++) {
      targetNode.at(i).props().onPress();
      targetNode.at(i).props().onPressOut();
      targetNode.at(i).props().onLongPress();
    }

    function fn() {
      return new Promise(resolve => {
        setTimeout(() => {
          targetNode.at(0).props().onPressOut();
          targetNode.at(1).props().onPressOut();

          resolve();
        }, 2000);
      });
    }
    await fn();

    wrapper.unmount();
    expect(wrapper).toMatchSnapshot();
  });

  it('input', async () => {
    const wrapper = mount(<TYIpcStepButton />);
    const targetNode = wrapper.findWhere(node => node.name() === 'TextInput');
    targetNode.at(0).props().onChangeText('dfdf');
    targetNode.at(0).props().onChangeText(78);
    targetNode.at(0).props().onChangeText(-1);
    targetNode.at(0).props().onChangeText(200);

    wrapper.unmount();
    expect(wrapper).toMatchSnapshot();
  });
});
