import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { RectColorAndBrightPicker } from '@tuya/tuya-panel-lamp-sdk';
import { TYText, SwitchButton } from 'tuya-panel-kit';

export default class RectColorAndBrightPickerScene extends PureComponent {
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
        <TYText style={{ marginBottom: 10 }} text="RectColorAndBrightPicker.ColourPicker" />
        <View style={{ width: 300, height: 220, borderRadius: 16, overflow: 'hidden' }}>
          <RectColorAndBrightPicker.ColourPicker
            value={{ hue: 20, saturation: 300, value: 800 }}
            opacityAnimationValue={power ? 1 : 0.4}
            opacityAnimationDuration={300}
          />
        </View>
        <TYText style={{ marginBottom: 10 }} text="RectColorAndBrightPicker.WhitePicker" />
        <View style={{ width: 300, height: 220, borderRadius: 16, overflow: 'hidden' }}>
          <RectColorAndBrightPicker.WhitePicker
            value={{ temperature: 300, brightness: 500 }}
            opacityAnimationValue={power ? 1 : 0.4}
            opacityAnimationDuration={300}
          />
        </View>
      </View>
    );
  }
}
