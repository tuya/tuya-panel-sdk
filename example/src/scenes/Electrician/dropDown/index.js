import _ from 'lodash';
import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import { DropDown } from '@tuya/tuya-panel-electrician-sdk';

export default class NumberChangeAnimatedScene extends PureComponent {
  renderItems() {
    return (
      <View
        style={{
          width: 343,
          height: 500,
          backgroundColor: 'red',
        }}
      >
        {_.times(20, d => (
          <Text key={d} stlye={{ color: 'red' }}>
            biu~~
          </Text>
        ))}
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <DropDown title="点击dropdown" maxHeight={400} content={() => this.renderItems()} />
      </View>
    );
  }
}
