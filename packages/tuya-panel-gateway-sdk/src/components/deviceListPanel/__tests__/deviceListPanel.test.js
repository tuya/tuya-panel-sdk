import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'tuya-panel-kit';
import { Dimensions } from 'react-native';
import DeviceListPanel from '../index';
import Strings from '../i18n';

const { convertX: cx } = Utils.RatioUtils;
const { height: screenHeight } = Dimensions.get('screen');
const tabConfig = [
  {
    key: '0',
    title: Strings.getLang('bleDevices'),
    activeTextStyle: { color: '#00B996' },
    textStyle: { color: '#000' },
  },
  {
    key: '1',
    title: Strings.getLang('zigDevices'),
    activeTextStyle: { color: '#00B996' },
    textStyle: { color: '#000' },
  },
];
const devList = [];

describe('DeviceListPanel components', () => {
  it('basic render', () => {
    const wrapper = shallow(<DeviceListPanel tabs={tabConfig} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('change postion', () => {
    const wrapper = shallow(
      <DeviceListPanel tabs={tabConfig} initialPosition={screenHeight / 4} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  // it('change prompt text and style', () => {
  //   const wrapper = shallow(
  //     <DeviceListPanel
  //       tabs={tabConfig}
  //       prompt="During the process of adding, the device will no longer be used, please be patient."
  //       promptStyle={{ color: 'lightblue' }}
  //     />
  //   );
  //   expect(wrapper).toMatchSnapshot();
  // });
  // it('change progress text and style', () => {
  //   const wrapper = shallow(
  //     <DeviceListPanel
  //       tabs={tabConfig}
  //       foreColor={{
  //         '0%': 'yellow',
  //         '100%': 'green',
  //       }}
  //       progressStyle={{ with: cx(100), height: cx(100) }}
  //       progressText="4 / 8"
  //     />
  //   );
  //   expect(wrapper).toMatchSnapshot();
  // });
  // it('change is custom progress change', () => {
  //   const wrapper = shallow(
  //     <DeviceListPanel isCustomProgressChange={true} customTotal={10} customProgress={4} />
  //   );
  //   expect(wrapper).toMatchSnapshot();
  // });
});
