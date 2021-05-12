import React, { Component } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { DefendTime } from '@tuya/tuya-panel-lock-sdk';

const { convertX } = Utils.RatioUtils;
const { width } = Dimensions.get('window');

export default class Password extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <DefendTime />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listView: {
    alignItems: 'center',
    width,
  },
  space: {
    marginTop: convertX(10),
  },
});
