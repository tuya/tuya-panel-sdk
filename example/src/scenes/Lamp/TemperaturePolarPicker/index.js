import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { TemperaturePolarPicker } from '@tuya/tuya-panel-lamp-sdk';
import { SwitchButton } from 'tuya-panel-kit';

export default class TemperaturePolarPickerScene extends PureComponent {
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
          backgroundColor: '#999',
        }}
      >
        <SwitchButton
          style={{ marginBottom: 10 }}
          value={power}
          onValueChange={v => this.setState({ power: v })}
        />
        <TemperaturePolarPicker
          value={800}
          radius={100}
          innerRadius={50}
          opacityAnimationValue={power ? 1 : 0.4}
          opacityAnimationDuration={300}
        />
        <TemperaturePolarPicker
          value={800}
          radius={100}
          innerRadius={0}
          opacityAnimationValue={power ? 1 : 0.4}
        />
      </View>
    );
  }
}
