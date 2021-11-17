import React, { FC } from 'react';
import { Text } from 'react-native';
import { Utils, IconFont } from 'tuya-panel-kit';

interface IProps {
  /**
   * 步数
   */
  step: number;
  /**
   * 图标icon：字符串
   */
  targetIcon: string;
  /**
   * 图标颜色
   */
  targetIconColor: string;
  /**
   * 步数单位
   */
  stepValue?: string;
  /**
   * 单位颜色
   */
  stepColor: string;
  /**
   * 单位透明度
   */
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

SportTargetContent.defaultProps = {
  stepValue: '步',
};
export default SportTargetContent;
