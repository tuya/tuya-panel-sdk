import React from 'react';
import { IconFont } from 'tuya-panel-kit';
import { shallow } from 'enzyme';
import { Animated } from 'react-native';
import ModeChange from '../index';

const imgUrlList =
  'https://images.tuyacn.com/rms-static/3f5ccbb0-94bc-11ea-8e3b-e3ecba4013ec-1589334682603.png?tyName=speed1.png';

const nextUrlList =
  'https://images.tuyacn.com/rms-static/3f750ea0-94bc-11ea-a593-57b2fa093611-1589334682762.png?tyName=speed2.png';

describe('ModeChange.Scale components', () => {
  it('basic render', () => {
    let imgUrl = imgUrlList;
    const wrapper = shallow(
      <ModeChange.Scale imgUrl={imgUrl} imgStyle={{ tintColor: 'red', width: 30, height: 30 }} />
    );
    expect(wrapper).toMatchSnapshot();
    imgUrl = nextUrlList;
    wrapper.setProps({ imgUrl });
  });

  it('renderContent render', () => {
    let imgUrl = imgUrlList;
    const wrapper = shallow(
      <ModeChange.Scale
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
