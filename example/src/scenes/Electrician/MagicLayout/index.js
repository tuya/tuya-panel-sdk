/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import React, { PureComponent } from 'react';
import { MagicLayout } from '@tuya/tuya-panel-electrician-sdk';
import { View, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('screen');
export default class Layout extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
    };
  }

  onChange = (eventName = '') => {
    switch (eventName) {
      case 'close':
        this.setState({ showModal: false });
        break;
      default:
        break;
    }
  };

  renderScene = () => {
    return (
      <View style={{ flex: 1, backgroundColor: 'red' }}>
        <TouchableOpacity
          onPress={() => this.setState({ showModal: !this.state.showModal })}
          style={{ width: 100, height: 100, backgroundColor: 'green' }}
        />
      </View>
    );
  };

  renderModalScene = () => {
    return <View style={{ width, height: height - 150, backgroundColor: 'blue' }} />;
  };

  render() {
    return (
      <MagicLayout
        showModal={this.state.showModal}
        renderScene={this.renderScene}
        onChange={this.onChange}
        renderModalScene={this.renderModalScene}
      />
    );
  }
}
