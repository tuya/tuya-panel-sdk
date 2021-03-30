import React, { PureComponent } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleProp,
  ViewStyle,
} from 'react-native';

class SocketProps {
  socketWrapperStyle: StyleProp<ViewStyle>;
  socketBackgroundImage: string | number =
    'http://images.tuyacn.com/smart/panelos/common/imgs/1588928982565_dc-bg@3x.png';

  socketBackgroundImageSize: { [key: string]: number } = { width: 240, height: 240 };
  socketImage: string | number =
    'http://images.tuyacn.com/smart/panelos/common/imgs/1588929002104_dc-ck-1@3x.png';

  socketImageSize: { [key: string]: number } = { width: 140, height: 140 };
  socketImageTintColor: string;
  onPress: () => void;
}

export default class SocketView extends PureComponent<SocketProps> {
  static defaultProps = new SocketProps();

  formatImageSource = source => (typeof source === 'string' ? { uri: source } : source);

  handleSocketPress = () => {
    const { onPress } = this.props;
    onPress && onPress();
  };

  render() {
    const {
      socketWrapperStyle,
      socketBackgroundImage,
      socketImage,
      socketImageSize,
      socketImageTintColor,
      socketBackgroundImageSize,
    } = this.props;
    return (
      <TouchableOpacity onPress={this.handleSocketPress} style={socketWrapperStyle}>
        <ImageBackground
          source={this.formatImageSource(socketBackgroundImage)}
          style={[styles.container, socketBackgroundImageSize]}
          imageStyle={[socketBackgroundImageSize]}
        >
          <Image
            source={this.formatImageSource(socketImage)}
            style={[socketImageSize, { tintColor: socketImageTintColor }]}
          />
        </ImageBackground>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
