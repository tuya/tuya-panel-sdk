import React, { useContext, useState, useEffect, useRef } from 'react';
import { TouchableOpacity, Image, Animated, Easing } from 'react-native';
import VideoContext from './Context';
import { PlayStatus } from '../interface';

interface IProps {
  visible: boolean;
}

const PlayButton: React.FC<IProps> = ({ visible = false }) => {
  const [showBtn, setShowBtn] = useState<boolean>(visible);
  const { handlePlay, isPalying, status } = useContext(VideoContext);
  const opacity = useRef<Animated.Value>(new Animated.Value(1)).current;
  const scale = useRef<Animated.Value>(new Animated.Value(1)).current;

  useEffect(() => {
    if (!visible && status !== PlayStatus.loading) {
      /** 按钮淡出动画配置 */
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          easing: Easing.linear,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 2,
          easing: Easing.linear,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        finished && setShowBtn(false);
      });
    } else {
      opacity.setValue(1);
      scale.setValue(1);
      setShowBtn(visible);
    }
  }, [visible]);

  if (!showBtn) return null;
  return (
    <Animated.View
      style={{
        position: 'absolute',
        opacity,
        transform: [{ scale }],
      }}
    >
      <TouchableOpacity onPress={handlePlay}>
        <Image source={isPalying ? require('../res/playBtn.png') : require('../res/pause.png')} />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default PlayButton;
