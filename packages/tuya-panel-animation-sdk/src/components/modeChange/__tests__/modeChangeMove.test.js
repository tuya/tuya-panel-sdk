import React from 'react';
import { shallow } from 'enzyme';
import { Animated } from 'react-native';
import { IconFont } from 'tuya-panel-kit';
import ModeChange from '../index';

const imgUrlList =
  'https://images.tuyacn.com/rms-static/3f5ccbb0-94bc-11ea-8e3b-e3ecba4013ec-1589334682603.png?tyName=speed1.png';

const nextUrlList =
  'https://images.tuyacn.com/rms-static/3f750ea0-94bc-11ea-a593-57b2fa093611-1589334682762.png?tyName=speed2.png';

describe('ModeChange.Scale components', () => {
  it('basic render', () => {
    let imgUrl = imgUrlList;
    const wrapper = shallow(
      <ModeChange.Move
        imgUrl={imgUrl}
        imgStyle={{ tintColor: 'red', width: 80, height: 80 }}
        onStartAnimted={jest.fn()}
        onEndAnimted={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
    imgUrl = nextUrlList;
    wrapper.setProps({ imgUrl });
    Animated.parallel = jest.fn((height, config) => {
      return {
        start: jest.fn(callback => callback()),
      };
    });
  });

  it('renderContent render', () => {
    let imgUrl = imgUrlList;
    const wrapper = shallow(
      <ModeChange.Move
        imgUrl={imgUrl}
        imgStyle={{ tintColor: 'red', width: 80, height: 80 }}
        renderContent={<IconFont name="power" />}
        onStartAnimted={jest.fn()}
        onEndAnimted={jest.fn()}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
