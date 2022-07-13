import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Animated,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';
import { TopBar } from 'tuya-panel-kit';
import BleToast from './BleToast';

interface IBleOfflineModalProps {
  disabled: boolean;
  maskColor: string;
  onClose: () => void;
  style: StyleProp<ViewStyle>;
  text: string;
  image: ImageSourcePropType;
  onPress: () => void;
}

class BleOfflineModal extends PureComponent<IBleOfflineModalProps, { value: any }> {
  static defaultProps: Partial<IBleOfflineModalProps>;

  // eslint-disable-next-line react/state-in-constructor
  state = {
    value: new Animated.Value(0),
  };

  componentDidMount() {
    this.show();
  }

  show = () => {
    const { value } = this.state;
    Animated.spring(value, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  hide = () => {
    const { value } = this.state;
    const { onClose } = this.props;
    Animated.spring(value, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      typeof onClose === 'function' && onClose();
    });
  };

  render() {
    const { disabled, maskColor, ...restProps } = this.props;
    const { value } = this.state;
    return (
      <TouchableOpacity
        style={styles.modal}
        activeOpacity={1}
        disabled={disabled}
        onPress={this.hide}
      >
        <Animated.View
          style={[StyleSheet.absoluteFill, { backgroundColor: maskColor, opacity: value }]}
        />
        <BleToast {...restProps} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: TopBar.height,
  },
});

BleOfflineModal.defaultProps = {
  disabled: false,
  maskColor: 'rgba(0, 0, 0, 0.4)',
};

export default BleOfflineModal;
