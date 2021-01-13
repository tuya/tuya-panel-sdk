import { Animated, Easing } from 'react-native';

const createAnimation = ({
  value,
  toValue,
  duration,
  delay,
  easing,
  useNativeDriver,
  isInteraction,
}) => {
  return Animated.timing(value, {
    toValue,
    duration: duration || 400,
    delay: delay || 0,
    easing: easing || Easing.linear,
    useNativeDriver: useNativeDriver || false,
    isInteraction: isInteraction || false,
  });
};
const getImageUrl = url => {
  return typeof url === 'string' ? { uri: url } : url;
};
const leftValue = data => {
  return data > 0 ? Math.round(data) : Math.ceil(data);
};
export { createAnimation, getImageUrl, leftValue };
