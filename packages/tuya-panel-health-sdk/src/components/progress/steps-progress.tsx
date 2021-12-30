/* eslint-disable react/no-array-index-key */
import React, { FC } from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-kit';

import { ProgressProps } from './interface';
import useMergeProps from '../../hooks/useMergeProps';
import styles from './style';

const { convertX: cx } = Utils.RatioUtils;

const defaultProps: ProgressProps & { steps: number } = {
  percent: 0,
  strokeWidth: 8,
  color: '#165dff',
  trailColor: '#e6e7ed',
  steps: 4,
};

const StepsProgress: FC<ProgressProps> = baseProps => {
  const props = useMergeProps<ProgressProps>(baseProps, defaultProps);
  const { percent, strokeWidth, trailColor, color, width, style } = props;
  const height = strokeWidth;
  return (
    <View style={styles.wrapper}>
      <View style={[styles.stepOuter, { height }]}>
        {[...new Array(props.steps)].map((_, index) => {
          const isActive = percent > (100 / props.steps) * index;
          return (
            <View
              key={index}
              style={[
                styles.item,
                {
                  backgroundColor: isActive ? color : trailColor || '',
                  marginRight: index !== props.steps && 3,
                },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default StepsProgress;
