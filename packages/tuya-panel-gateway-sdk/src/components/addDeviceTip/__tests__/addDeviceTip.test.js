import React from 'react';
import { Divider, TYSdk } from 'tuya-panel-kit';
import { shallow } from 'enzyme';
import { AddDeviceTip, AddDeviceTipModal } from '../index';
const dataSource = [
  {
    name: 'Sensor',
    icon: 'https://images.tuyacn.com/smart/program_category_icon/zig_afcg.png',
    content: 'Power on, then hold the RESET button for 5 sec',
  },
  {
    name: 'Socket',
    icon: 'https://images.tuyacn.com/smart/product_icon2/cz_1.png',
    content: 'Power on, then hold the RESET button for 5 sec秒',
  },
  {
    name: 'Light Source',
    icon: 'https://images.tuyacn.com/smart/product_icon2/dj_1.png',
    content: 'Power On, then Turn OFF-ON-OFF-ON',
  },
];
describe('AddDeviceTip components', () => {
  it('basic render', () => {
    const wrapper = shallow(<AddDeviceTip dataSource={dataSource} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('change title and description', () => {
    const wrapper = shallow(
      <AddDeviceTip title="Distribution network prompt" desc="Distribution network description" />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('change button style', () => {
    const wrapper = shallow(
      <AddDeviceTip
        addButtonStyle={{
          backgroundColor: 'lightblue',
        }}
        addButtonTextStyle={{
          color: '#333',
        }}
        moreButtonTextStyle={{
          color: 'red',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('change divider color', () => {
    const wrapper = shallow(<AddDeviceTip dividerColor="lightblue" />);
    expect(wrapper).toMatchSnapshot();
  });
  it('change content padding horizontal', () => {
    const wrapper = shallow(<AddDeviceTip contentPaddingHorizontal={60} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('change numberOfLines', () => {
    const wrapper = shallow(
      <AddDeviceTip titleNumberOfLines={2} descNumberOfLines={2} itemNumberOfLines={1} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('render SeparatorComponent', () => {
    const wrapper = shallow(
      <AddDeviceTip renderSeparatorComponent={() => <Divider color="pink" height={2} />} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('button onPress event', () => {
    const wrapper = shallow(
      <AddDeviceTip
        moreButtonOnPress={() => TYSdk.mobile.simpleTipDialog('more button onPress', () => {})}
        addButtonOnPress={() => TYSdk.mobile.simpleTipDialog('add button onPress', () => {})}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
