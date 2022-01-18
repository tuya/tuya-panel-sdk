import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { TYText, Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

class Item extends Component {
  static propTypes = {
    name: PropTypes.string,
  };

  static defaultProps = {
    name: '',
  };

  shouldComponentUpdate(nextProps) {
    const { name } = nextProps;
    const { name: preName } = this.props;
    if (name === preName) {
      return false;
    }
    return true;
  }

  render() {
    const { name } = this.props;
    return (
      <View style={styles.renderItem}>
        <TYText style={{ fontSize: cx(15) }}>{name}</TYText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  renderItem: {
    borderBottomWidth: 1,
    borderColor: '#F0F0F0',
    height: cx(56),
    justifyContent: 'center',
    paddingHorizontal: cx(15),
  },
});

export default Item;
