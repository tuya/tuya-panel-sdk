import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import UnLockButton from '../index';

describe('UnLockButton', () => {
  it('UnLockButton Component should be render', () => {
    const wrapper = shallow(
      <UnLockButton
        onEnd={jest.fn()}
        backgroundColor="#fff"
        delayLongPress={1000}
        size={90}
        progressRingSize={100}
        color="#fff"
      >
        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 4,
            height: 22,
            position: 'absolute',
            width: 22,
          }}
        />
      </UnLockButton>
    );

    // 是否能正确渲染
    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({ delayLongPress: 2000 });

    // mock点击
   


    wrapper.unmount();
  });
});
