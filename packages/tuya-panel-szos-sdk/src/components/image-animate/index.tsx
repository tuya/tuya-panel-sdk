/*
 * @Author: your name
 * @Date: 2021-10-19 16:51:15
 * @LastEditTime: 2021-11-29 19:32:02
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: In User Settings Edit
 * @FilePath: /tuya-panel-sdk/packages/tuya-panel-szos-sdk/src/components/image-animate/index.tsx
 */
import React, { useEffect, useState, FC, useLayoutEffect } from 'react';
import { StyleSheet, View, Animated, Easing, StyleProp, ViewStyle } from 'react-native';
import { reload } from '../../res';

interface IImageAnimateProps {
  source?: any;
  style?: StyleProp<ViewStyle>;
}

const ImageAnimate: FC<IImageAnimateProps> = (props: IImageAnimateProps & { children: any }) => {
  const { children, source = reload, style } = props;
  const [spinValue] = useState(new Animated.Value(0));

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1, // 最终值 为1，这里表示最大旋转 360度
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(spin);
  };

  React.useEffect(() => {
    spin();
  }, []);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.Image style={[{ transform: [{ rotate }] }, styles.icon]} source={source} />
      {children}
    </View>
  );
};

ImageAnimate.defaultProps = {
  source: reload,
  style: {},
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 3,
  },
});

export default ImageAnimate;
