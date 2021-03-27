import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { RectColorAndBrightPicker } from '@tuya/tuya-panel-lamp-sdk';
import { TYText } from 'tuya-panel-kit';

export default class RectColorAndBrightPickerScene extends PureComponent {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#eee',
        }}
      >
        <TYText style={{ marginBottom: 10 }} text="RectColorAndBrightPicker.ColourPicker" />
        <RectColorAndBrightPicker.ColourPicker value={{ hue: 20, saturation: 300, value: 800 }} />
        <TYText style={{ marginBottom: 10 }} text="RectColorAndBrightPicker.WhitePicker" />
        <RectColorAndBrightPicker.WhitePicker value={{ temperature: 300, brightness: 500 }} />
        <TYText vstyle={{ marginBottom: 10 }} text="RectColorAndBrightPicker.BrightnessSlider" />
        <RectColorAndBrightPicker.BrightnessSlider value={500} />
      </View>
    );
  }
}
