import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { TemperaturePicker } from '@tuya/tuya-panel-lamp-sdk';
import { SwitchButton } from 'tuya-panel-kit';

export default class TemperaturePickerScene extends PureComponent {
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
          backgroundColor: '#eee',
        }}
      >
        <SwitchButton
          style={{ marginBottom: 10 }}
          value={power}
          onValueChange={v => this.setState({ power: v })}
        />
        <TemperaturePicker
          value={800}
          radius={100}
          innerRadius={50}
          opacityAnimationValue={power ? 1 : 0.4}
          opacityAnimationDuration={300}
        />
        <TemperaturePicker
          value={500}
          opacityAnimationValue={power ? 1 : 0.4}
          radius={100}
          innerRadius={0}
        />
      </View>
    );
  }
}
