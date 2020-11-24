import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Utils, Checkbox } from '@tuya-rn/tuya-native-components';

const { convertX: cx, width } = Utils.RatioUtils;

const HocSelectCell = WrappedComponent => {
  return class HocSelectCell extends Component {
    static propTypes = {
      showSelectedView: PropTypes.bool, // 是否展示选择框框
      selected: PropTypes.bool, // 是否被选定
      onItemPress: PropTypes.func // item点击回调
    };

    static defaultProps = {
      showSelectedView: false,
      selected: false,
      onItemPress: () => {},
    };

    onItemPress = () => {
      const { onItemPress } = this.props;
      onItemPress && onItemPress();
    };

    render() {
      const { showSelectedView, selected } = this.props;

      return (
        <View style={styles.root}>
          {showSelectedView && <Checkbox style={styles.selectView} checked={selected} color="#006DE6" />}
          <View style={{ flex: 1 }}>
            <WrappedComponent {...this.props} />
          </View>

          {showSelectedView && (
            <TouchableOpacity style={styles.touchView} onPress={this.onItemPress} />
          )}
        </View>
      );
    }
  };
};

export default HocSelectCell;

const styles = StyleSheet.create({
  root: {
    width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectView: {
    marginLeft: cx(10),
  },
  touchView: {
    position: 'absolute',
    width,
    height: '100%',
    // backgroundColor: 'rgba(255,0,0,0.3)',
  },
});
