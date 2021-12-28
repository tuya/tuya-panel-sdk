import React from 'react';
import { View } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { shallow } from 'enzyme';
import AnimatedModal from '../index';

describe('AnimatedModal components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <AnimatedModal
        visible
        isExpand
        renderAnimatedContent={() => {
          return (
            <View style={{ marginTop: 16 }}>
              <View
                style={{
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  flexDirection: 'row',
                  height: 70,
                  justifyContent: 'space-between',
                  marginVertical: 16,
                  paddingHorizontal: 16,
                  width: 320,
                }}
              >
                <TYText style={{ color: '#FFF' }}>自定义渲染动画区域内容</TYText>
              </View>
            </View>
          );
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
