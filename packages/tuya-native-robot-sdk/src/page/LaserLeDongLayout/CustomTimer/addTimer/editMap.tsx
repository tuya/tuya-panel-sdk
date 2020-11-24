import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { TopBar } from '../components';

import Map from './map';

export default class EditMap extends Component {
  map: any;

  async componentWillUnmount() {
    const { onChange } = this.props;
    const mapInfo = (this.map && (await this.map.getValue())) || {};

    if (onChange) onChange(mapInfo);
  }

  renderHeader = () => {
    const { title, navigator } = this.props;
    return <TopBar title={title} onBack={navigator.pop} />;
  };

  render() {
    const { laserMapConfig, roomTagIds, disabled, mode } = this.props;
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        <Map
          ref={ref => (this.map = ref)}
          selectTags={roomTagIds}
          laserMapConfig={laserMapConfig}
          disabled={disabled}
          mode={mode}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    // marginTop: cy(15),
  },
})
