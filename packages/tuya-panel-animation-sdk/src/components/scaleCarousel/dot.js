/* eslint-disable react/no-array-index-key */
/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const defaultDot = props => {
  const { currentIndex, propsData, i, dotStyle, dotActiveColor, isEmpty } = props;
  const dotArr = (
    <View
      key={`dot-${i}`}
      ref={ref => (propsData[`dot_${i}`] = ref)}
      style={[
        dotStyle,
        i === currentIndex && { backgroundColor: dotActiveColor },
        isEmpty && { backgroundColor: 'transparent' },
      ]}
    />
  );
  return dotArr;
};

defaultDot.propTypes = {
  currentIndex: PropTypes.number,
  propsData: PropTypes.any,
  i: PropTypes.number,
};

defaultDot.defaultProps = {
  currentIndex: 0,
  propsData: {},
  i: 0,
};

export default defaultDot;
