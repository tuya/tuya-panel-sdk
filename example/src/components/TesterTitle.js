/* eslint-disable react/prefer-stateless-function */
import PropTypes from 'prop-types';
import React from 'react';
import { View, Text, StyleSheet, ViewPropTypes } from 'react-native';

export default class RNTesterTitle extends React.Component {
  static propTypes = {
    style: ViewPropTypes.style,
    title: PropTypes.string.isRequired,
  };

  static defaultProps = {
    style: null,
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text style={styles.text}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderColor: '#d6d7da',
    borderRadius: 4,
    borderWidth: 0.5,
    marginVertical: 10,
    padding: 10,
  },
  text: {
    color: '#333',
    fontSize: 19,
    fontWeight: '500',
  },
});
