/*
 * @Author: 豆芽(douya.ye@tuya.com)
 * @Date: 2021-12-15 10:57:07
 * @LastEditTime: 2021-12-15 11:25:08
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: 高级能力-dp缓存下发-试用于传感
 * @FilePath: /tuya-panel-sdk/packages/tuya-panel-szos-sdk/src/components/dp-cache-text/index.tsx
 */

import React, { FC } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { IconFont, Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

interface IWrapDpText {
  /**
   * 文字=标题
   */
  title: string;
  /**
   * 是否展示icon
   */
  showIcon?: boolean;
  /**
   * 容器样式
   */
  // eslint-disable-next-line react/require-default-props
  style?: StyleProp<ViewStyle | TextStyle>;
  /**
   * 文本颜色
   */
  textColor?: string;
}

const WrapDpCacheText: FC<IWrapDpText> = (props: IWrapDpText) => {
  const { title, showIcon, style, textColor } = props as IWrapDpText;
  if (showIcon) {
    return (
      <View style={[styles.container, style]}>
        <Text style={{ color: textColor }} numberOfLines={1}>
          {title}
        </Text>
        <IconFont name="warning" color="red" size={12} style={styles.icon} />
      </View>
    );
  }
  return (
    <Text style={[{ color: textColor }, style]} numberOfLines={1}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  icon: {
    marginLeft: cx(4),
  },
});

WrapDpCacheText.defaultProps = {
  showIcon: false,
  textColor: '#000000',
};

export default WrapDpCacheText;
