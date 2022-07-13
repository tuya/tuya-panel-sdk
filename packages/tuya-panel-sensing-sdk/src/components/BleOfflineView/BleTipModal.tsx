import React, { PureComponent } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { TopBar, TYText, Utils } from 'tuya-panel-kit';
import Res from '../../res';

const { convertX: cx, isIphoneX } = Utils.RatioUtils;

interface BleTipModalProps {
  disabled: boolean;
  maskColor: string;
  onClose: () => void;
  Strings: any;
}
interface IState {
  value: any;
  isMultiLine: boolean;
}

class BleTipModal extends PureComponent<BleTipModalProps, IState> {
  static defaultProps: Partial<BleTipModalProps>;

  // eslint-disable-next-line react/state-in-constructor
  state = {
    value: new Animated.Value(0),
    isMultiLine: false,
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
    const { disabled, maskColor, Strings } = this.props;
    const { value, isMultiLine } = this.state;
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
        <Animated.View
          onStartShouldSetResponder={() => true}
          style={[
            styles.tipModal,
            {
              transform: [
                {
                  translateY: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View
            style={[
              styles.tipRow,
              {
                borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                borderBottomWidth: 1,
              },
            ]}
          >
            <View style={[styles.flex, { marginLeft: cx(16) }]}>
              <TYText style={styles.tipText} text={Strings.getLang('openBleShare')} />
              <TYText
                style={[styles.tipText, styles.tipParagraph]}
                text={Strings.getLang('openBleShareStep')}
              />
            </View>
            <View>
              <Image source={Res.bleShare} />
              <TYText
                style={[styles.absoluteText, isMultiLine && { top: cx(56) }]}
                text={Strings.getLang('bluetoothShare')}
                numberOfLines={2}
                onLayout={({ nativeEvent }) => {
                  const { height } = nativeEvent.layout;
                  this.setState({ isMultiLine: height >= cx(23) });
                }}
              />
            </View>
          </View>
          <View style={styles.tipRow}>
            <View style={[styles.flex, { marginLeft: cx(16) }]}>
              <TYText style={styles.tipText} text={Strings.getLang('openBle')} />
            </View>
            <Image source={Res.bleSystem} />
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  }
}

BleTipModal.defaultProps = {
  disabled: false,
  maskColor: 'rgba(0, 0, 0, 0.4)' as any,
};

const styles = StyleSheet.create({
  absoluteText: {
    backgroundColor: 'transparent',
    color: '#22242C',
    fontSize: cx(11),
    left: cx(40),
    position: 'absolute',
    top: cx(61),
    width: cx(112),
  },
  flex: {
    flex: 1,
  },
  modal: {
    bottom: 0,
    justifyContent: 'flex-end',
    left: 0,
    position: 'absolute',
    right: 0,
    top: TopBar.height,
  },

  tipModal: {
    alignSelf: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: cx(16),
    height: cx(336),
    marginBottom: isIphoneX ? cx(32) : cx(12),
    width: cx(351),
  },
  tipParagraph: {
    color: '#999999',
    fontSize: cx(12),
    marginTop: cx(4),
  },

  tipRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tipText: {
    backgroundColor: 'transparent',
    color: '#333333',
    fontSize: cx(16),
    fontWeight: '500',
  },
});

export default BleTipModal;
