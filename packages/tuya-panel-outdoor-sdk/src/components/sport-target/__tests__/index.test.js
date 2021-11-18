import React from 'react';
import { Text } from 'react-native';
import { shallow } from 'enzyme';
import SportTarget from '../index';

describe('sport-no-target components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <SportTarget
        curStep={100}
        targetSteps={200}
        targetText={`Today's goal ｜ ${100}step`}
        percentText="You have achieved your goal"
        themeColor="blue"
        centerView={{
          bgImage: 0,
          children: <Text>123</Text>,
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
