import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { HueSaturationPicker } from '@tuya/tuya-panel-lamp-sdk';
import { SwitchButton } from 'tuya-panel-kit';

export default class HueSaturationPickerScene extends PureComponent {
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
        <HueSaturationPicker
          value={{ hue: 300, saturation: 800 }}
          opacityAnimationValue={power ? 1 : 0.4}
        />
      </View>
    );
  }
}
