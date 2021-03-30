import React from 'react';
import { View } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

interface IArrow {
  isRight?: boolean;
  color?: string;
}

interface IArrowGroup {
  flip?: boolean;
  color?: string;
}

const Arrow: React.FC<IArrow> = ({ isRight, color }) => (
  <View
    style={[
      {
        width: 0,
        height: 0,
        borderTopWidth: cx(5),
        borderTopColor: 'transparent',
        borderRightWidth: cx(5),
        borderRightColor: '#999',
        borderLeftWidth: cx(3),
        borderLeftColor: 'transparent',
        borderBottomWidth: cx(5),
        borderBottomColor: 'transparent',
      },
      color && { borderRightColor: color },
      isRight && {
        transform: [
          {
            rotateY: '180deg',
          },
        ],
      },
    ]}
  />
);

Arrow.defaultProps = {
  isRight: false,
};

const ArrowGroup: React.FC<IArrowGroup> = ({ flip, color }) => {
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: cx(4),
        },
        flip && {
          transform: [
            {
              rotate: '90deg',
            },
          ],
        },
      ]}
    >
      <Arrow color={color} />
      <Arrow color={color} isRight />
    </View>
  );
};

export default ArrowGroup;
