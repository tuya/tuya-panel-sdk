import React, { PureComponent } from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { ColorSelectorNoScroll } from '@tuya/tuya-panel-lamp-sdk';

export default class ColorSelectorNoScrollScene extends PureComponent {
  state = {
    data: [
      {
        isColour: true,
        hue: 20,
        saturation: 800,
        value: 1000,
      },
      {
        isColour: false,
        brightness: 1000,
        temperature: 0,
      },
      {
        isColour: true,
        hue: 220,
        saturation: 1000,
        value: 1000,
      },
    ],
    selectIndex: 0,
  };

  render() {
    const { data, selectIndex } = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#222',
        }}
      >
        <ColorSelectorNoScroll
          data={data}
          selectIndex={selectIndex}
          onAdd={() => {
            console.log('add color');
            const newData = _.cloneDeep(this.state.data);
            newData.push({ isColour: false, brightness: 1000, temperature: 1000 });
            this.setState({ data: newData });
          }}
          onSelect={index => {
            console.log('select color', index);
            this.setState({ selectIndex: index });
          }}
          onLongPress={index => {
            console.log('delete color', index);
            const newData = _.cloneDeep(this.state.data);
            newData.splice(index, 1);
            this.setState({ data: newData });
          }}
        />
      </View>
    );
  }
}
