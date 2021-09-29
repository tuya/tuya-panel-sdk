import React from 'react';
import { shallow } from 'enzyme';
import SteeringWheel from '../index';
import { Utils } from 'tuya-panel-kit';
const { convertX: cx } = Utils.RatioUtils;

describe('SoundWave components', () => {
  it('basic render', () => {
    const wrapper = shallow(<SteeringWheel />);

    expect(wrapper).toMatchSnapshot();
  });

  it('renderContent render', () => {
    const wrapper = shallow(
      <SteeringWheel
        wheelStyle={{ width: cx(168), height: cx(168) }}
        changeRotate={jest.fn()}
        childrenProps={
          <div
            style={{
              width: 168,
              height: 168,
              borderWidth: 1,
              borderColor: 'gray',
              borderRadius: 84,
            }}
          />
        }
        maxLeftAng={90}
        maxRightAng={90}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
