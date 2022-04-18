import React, { useEffect, useState, FC } from 'react';
import { StyleSheet, View, Animated, Easing, StyleProp, ViewStyle } from 'react-native';

interface ImageAnimateProps {
  style?: StyleProp<ViewStyle>;
  source?: any;
}

const ImageAnimate: FC<ImageAnimateProps> = ({ children, style, source }) => {
  const [spinValue] = useState(new Animated.Value(0));

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(spin);
  };

  useEffect(() => {
    spin();
  }, []);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={[styles.container, style]}>
      <Animated.Image
        style={[{ transform: [{ rotate }] }, styles.icon]}
        source={source || require('../../res/reload.png')}
      />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    height: 16,
    marginRight: 3,
    width: 16,
  },
});
export default ImageAnimate;
