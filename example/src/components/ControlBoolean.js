import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';
import { SwitchButton } from 'tuya-panel-kit';

export default class ControlBoolean extends Component {
  static propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string.isRequired,
    value: PropTypes.bool.isRequired,
    ...SwitchButton.propTypes,
  };

  static defaultProps = {
    style: null,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.value !== nextProps.value;
  }

  render() {
    const { style, value, title, ...SwitchButtonProps } = this.props;
    return (
      <View style={[styles.container, style]}>
        <Text style={styles.text} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.right}>
          <SwitchButton
            value={value}
            onTintColor="#44DB5E"
            onThumbTintColor="#fff"
            {...SwitchButtonProps}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 6,
  },

  right: {
    alignItems: 'flex-end',
    flex: 1,
    marginRight: 12,
  },

  text: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: 12,
    textAlign: 'center',
  },
});
