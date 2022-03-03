/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { SearchInput, RemoteUtils } from '@tuya/tuya-panel-remote-sdk';

const { convertX: cx } = Utils.RatioUtils;
const { hexToRgb } = RemoteUtils;

export default class Index extends Component {
  onChange = value => {
    console.log(value);
  };

  render() {
    return (
      <View>
        <View style={{ marginBottom: cx(20), marginTop: cx(20) }}>
          <SearchInput style={{ backgroundColor: '#fff' }} onChange={() => this.onChange()} />
        </View>
        <SearchInput
          style={{ backgroundColor: 'yellow' }}
          inputStyle={{ backgroundColor: hexToRgb('#ccc', 0.4) }}
          placeholderTextColor={hexToRgb('#000', 0.4)}
          allowClear
          showSearchIcon
          resetValue="Clear"
          onChange={value => this.onChange(value)}
        />
      </View>
    );
  }
}
