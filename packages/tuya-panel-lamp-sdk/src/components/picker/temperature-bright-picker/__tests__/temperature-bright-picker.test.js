import React from 'react';
import { shallow, mount } from 'enzyme';
import TemperatureBrightPicker from '../index';

describe('TemperatureBrightPicker components', () => {
  const origConsole = console.error;
  beforeEach(() => {
    console.error = () => {};
  });
  afterEach(() => {
    console.error = origConsole;
  });

  it('basic render', () => {
    let value = { brightness: 1000, temperature: 1000 };
    const wrapper = shallow(
      <TemperatureBrightPicker value={{ brightness: 1000, temperature: 1000 }} />
    );
    expect(wrapper).toMatchSnapshot();

    value = { brightness: 500, temperature: 500 };
    wrapper.setProps({ value });
  });

  it('componentWillReceiveProps render', () => {
    let disabled = false;
    let hideThumb = false;

    const wrapper = shallow(<TemperatureBrightPicker disabled={disabled} hideThumb={hideThumb} />);
    expect(wrapper).toMatchSnapshot();

    disabled = true;
    wrapper.setProps({ disabled });

    hideThumb = true;
    wrapper.setProps({ hideThumb });

    wrapper.setProps({
      renderThumb: () => {
        return <View />;
      },
    });

    wrapper.unmount();
  });

  it('method', () => {
    const wrapper = shallow(<TemperatureBrightPicker />);
    expect(wrapper).toMatchSnapshot();
    wrapper.instance().handleGrant(500);
    wrapper.instance().handleMove(500);
    wrapper.instance().handleRelease(500);
    wrapper.instance().handlePress(500);
    wrapper.instance().handleChange(500);
    wrapper.instance().handleChangeBright(500);
    wrapper.unmount();
  });
});
