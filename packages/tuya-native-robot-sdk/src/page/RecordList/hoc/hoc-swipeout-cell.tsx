import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Utils, Swipeout } from '@tuya-rn/tuya-native-components';

import Strings from '../../../i18n';

const { convertX: cx, width } = Utils.RatioUtils;

const HocSwipeCell = WrappedComponent => {
  return class HocSwipeCell extends Component {
    static propTypes = {
      onItemDeletePress: PropTypes.func // item删除回调
    };

    static defaultProps = {
      onItemDeletePress: () => {},
    };

    onItemDeletePress = () => {
      const { onItemDeletePress } = this.props;
      onItemDeletePress && onItemDeletePress();
    };

    render() {
      return (
        <Swipeout
          right={[
            {
              text: Strings.getLang('delete'),
              onPress: this.onItemDeletePress,
              type: 'delete',
              textStyle: { color: '#fff', fontSize: 16 },
            },
          ]}
        >
          <WrappedComponent  {...this.props} />
        </Swipeout>
      );
    }
  };
};

export default HocSwipeCell;

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
