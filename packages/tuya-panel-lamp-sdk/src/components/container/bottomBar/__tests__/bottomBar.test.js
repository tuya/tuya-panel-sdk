import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { shallow } from 'enzyme';
import BottomBar from '../index';
import Res from '../../../../res/bottomBarIcons';

describe('BottomBar components', () => {
  it('basic render', () => {
    const wrapper = shallow(<BottomBar activeMode="light" />);
    expect(wrapper).toMatchSnapshot();
  });

  const renderPower = () => {
    return (
      <TouchableOpacity
        key="power"
        style={{
          width: 88,
          height: 48,
          borderRadius: 24,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0D84FF',
        }}
      >
        <Image
          source={Res.power}
          style={{
            width: 32,
            height: 32,
            tintColor: '#FFF',
          }}
        />
      </TouchableOpacity>
    );
  };

  it('render with power', () => {
    const wrapper = shallow(
      <BottomBar
        activeMode="light"
        data={[
          {
            key: 'power',
            source: Res.power,
            isSupport: true,
            renderContent: renderPower(),
          },
          { key: 'light', source: Res.light, isSupport: true },
          { key: 'scene', source: Res.scene, isSupport: true },
          { key: 'music', source: Res.music, isSupport: true },
          { key: 'plan', source: Res.plan, isSupport: true },
        ]}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render with power in random index', () => {
    const wrapper = shallow(
      <BottomBar
        activeMode="light"
        data={[
          { key: 'light', source: Res.light, isSupport: true },
          { key: 'scene', source: Res.scene, isSupport: true },
          {
            key: 'power',
            source: Res.power,
            isSupport: true,
            renderContent: renderPower(),
          },
          { key: 'music', source: Res.music, isSupport: true },
          { key: 'plan', source: Res.plan, isSupport: true },
        ]}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
