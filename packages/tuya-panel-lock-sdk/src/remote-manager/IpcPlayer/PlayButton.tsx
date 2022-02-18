import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';

export interface IPlayButton {
  onPress?: () => void;
}

const PlayButton: React.FC<IPlayButton> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.playButton} onPress={onPress}>
      <Image source={require('../res/pause.png')} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  playButton: {
    alignSelf: 'center',
    position: 'absolute',
  },
});

export default PlayButton;
