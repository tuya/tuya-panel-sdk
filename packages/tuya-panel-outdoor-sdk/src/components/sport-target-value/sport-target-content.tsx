import React, { FC, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Utils, IconFont } from 'tuya-panel-kit';
import PropTypes from 'prop-types';

interface IProps {
  step: number;
  targetIcon: string;
  targetIconColor: string;
  stepValue: string;
  stepColor: string;
  stepOpacity: number;
}

const { convertX: cx } = Utils.RatioUtils;
const SportTargetContent: FC<IProps> = (props: IProps) => {
  const { step, targetIcon, targetIconColor, stepValue, stepColor, stepOpacity } = props;
  return (
    <>
      <IconFont d={targetIcon} size={29} color={targetIconColor} />
      <Text style={{ marginTop: cx(8), fontSize: cx(36), fontWeight: 'bold' }}>{step}</Text>
      <Text
        style={{
          marginTop: cx(8),
          fontSize: cx(14),
          fontWeight: '300',
          color: stepColor,
          opacity: stepOpacity,
        }}
      >
        {stepValue}
      </Text>
    </>
  );
};

// SportTargetContent.propTypes = {
//   stepValue: prop
// }
// SportTargetContent.defaultProps = {
//   stepValue: '步'
// };
export default SportTargetContent;
