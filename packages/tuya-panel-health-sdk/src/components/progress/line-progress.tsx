import React, { FC } from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-kit';

import { ProgressProps } from './interface';
import useMergeProps from '../utils/hooks/useMergeProps';
import styles from './style';

const { convertX: cx } = Utils.RatioUtils;

const defaultProps: ProgressProps = {
  percent: 0,
  strokeWidth: 8,
  color: '#165dff',
  trailColor: '#e6e7ed',
};

const LineProgess: FC<ProgressProps> = baseProps => {
  const props = useMergeProps<ProgressProps>(baseProps, defaultProps);
  const { percent, strokeWidth, trailColor, color, width, style } = props;
  const height = strokeWidth;
  const innerStyle = {
    width: `${percent > 100 ? 100 : percent < 0 ? 0 : percent}%`,
    backgroundColor: color,
  };
  return (
    <View style={styles.wrapper}>
      <View style={[styles.outer, { height, backgroundColor: trailColor }]}>
        <View style={[styles.inner, innerStyle]} />
      </View>
    </View>
  );
};

export default LineProgess;
