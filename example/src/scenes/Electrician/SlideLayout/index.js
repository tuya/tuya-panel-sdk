import { SlideLayout } from '@tuya/tuya-panel-electrician-sdk';
import React, { PureComponent } from 'react';
import { View, FlatList, TouchableOpacity, Text } from 'react-native';

export default class Layout extends PureComponent {
  render() {
    return (
      <SlideLayout
        baseLayoutTouchEnable={false}
        baseLayout={() => <View style={{ width: 300, height: 500, backgroundColor: 'red' }} />}
      >
        <FlatList
          data={Array(20).fill(1)}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              onPress={index % 2 === 0 ? SlideLayout.slideUp : SlideLayout.slideDown}
              style={{
                width: 300,
                height: 200,
                backgroundColor: 'yellow',
                margin: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ backgroundColor: 'transparent', color: '#000' }}>
                {index % 2 === 0 ? 'slideUp' : 'slideDown'}
              </Text>
            </TouchableOpacity>
          )}
        />
      </SlideLayout>
    );
  }
}
