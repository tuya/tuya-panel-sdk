import React from 'react';
import { shallow } from 'enzyme';
import { GlobalToast } from 'tuya-panel-kit';
import NumerAreaInput from '../index';

describe('NumerAreaInput components', () => {
  it('basic render', () => {
    const wrapper = shallow(<NumerAreaInput name="test" key="test" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render focus', () => {
    const changeColor = false;
    const maxVal = 30;
    const func = () => {
      GlobalToast.show({
        text: 'focus',
        onFinish: () => {
          GlobalToast.hide();
        },
      });
    };
    const wrapper = shallow(
      <NumerAreaInput
        key="test"
        name="test"
        placeholder="6"
        focusFuc={func}
        minVal={5}
        maxVal={maxVal}
        editable
        changeColor={changeColor}
        viewStyle={{ borderColor: 'red', borderWidth: 1, borderRadius: 5, marginTop: 20 }}
      />
    );
    const wrapperHandle = wrapper.children().at(0);
    wrapperHandle.simulate('focus');
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('render change', () => {
    const changeText = val => {
      GlobalToast.show({
        text: val,
        onFinish: () => {
          GlobalToast.hide();
        },
      });
    };
    const wrapper = shallow(
      <NumerAreaInput key="test" name="test" minVal="5" maxVal="10" changeText={changeText} />
    );
    const wrapperHandle = wrapper.children().at(0);
    wrapperHandle.simulate('changeText', '0');
    wrapperHandle.simulate('changeText', '5');
    wrapperHandle.simulate('changeText', '6');
    wrapperHandle.simulate('changeText', '20');
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
