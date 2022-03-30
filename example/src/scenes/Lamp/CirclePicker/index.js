import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { CirclePicker } from '@tuya/tuya-panel-lamp-sdk';
import { SwitchButton } from 'tuya-panel-kit';

export default class CirclePickerScene extends PureComponent {
  state = {
    power: false,
  };

  render() {
    const { power } = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#333',
        }}
      >
        <SwitchButton
          style={{ marginBottom: 10 }}
          value={power}
          onValueChange={v => this.setState({ power: v })}
        />
        <CirclePicker
          value={300}
          opacityAnimationValue={power ? 1 : 0.4}
          opacityAnimationDuration={300}
        />
      </View>
    );
  }
}
