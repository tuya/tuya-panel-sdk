import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { TYText } from 'tuya-panel-kit';
import Res from '../res';
import Config from '../config';

const { cx, isIOS } = Config;

const fullPlayerWidth = Math.round(Dimensions.get('window').height);
const fullPlayerHeight = Math.round(Dimensions.get('window').width);

export interface PlayerLoadProps {
  fullBackIconStyle: any;
  backImg?: number;
  backImgStyle: any;
  loadText: string;
  showAnimation: boolean;
  showRetry: boolean;
  retryText: string;
  isFullScreen: boolean;
  reConnect: () => void;
  playerLoadParam: any;
  exitFullScreen: () => void;
}

export interface PlayerLoadState {
  rotateValue: any;
  absoluteValue: number;
}

const _defaultProps = {
  // 全屏Icon容器style
  fullBackIconStyle: {},
  // 返回图片style
  backImgStyle: {},
  showAnimation: true,
  loadText: '',
  showRetry: false,
  retryText: '',
};

class PlayerLoad extends React.Component<PlayerLoadProps, PlayerLoadState> {
  static defaultProps = _defaultProps;

  constructor(props: PlayerLoadProps) {
    super(props);
    this.state = {
      rotateValue: new Animated.Value(0),
      absoluteValue: Math.round(cx(5)),
    };
    this.rotateV = 0;
  }

  componentDidMount() {
    this.getFullScreenAbsoluteStartValue();
    this.startAnimation();
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps() {
    this.startAnimation();
  }

  componentWillUnmount() {
    this.state.rotateValue.stopAnimation();
  }

  getFullScreenAbsoluteStartValue = () => {
    const width = Math.round(fullPlayerWidth);
    const height = Math.round(fullPlayerHeight);
    const isSixteen = width / height >= 16 / 9;
    const fullLiveWidth = Math.ceil((height * 16) / 9);
    let value = Math.ceil(cx(5));
    isSixteen && (value = Math.round((width - fullLiveWidth) / 2 + cx(2)));
    this.setState({
      absoluteValue: value,
    });
  };

  rotateV: number;

  // 动画函数
  startAnimation = () => {
    this.state.rotateValue.stopAnimation();
    this.state.rotateValue.setValue(this.rotateV);
    Animated.timing(this.state.rotateValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: isIOS,
      easing: Easing.linear,
    }).start(({ finished }) => {
      if (finished) {
        this.startAnimation();
      }
    });
  };

  stopAnimation = () => {
    this.state.rotateValue.stopAnimation(d => {
      this.rotateV = d;
    });
  };

  /*
   * 返回箭头
   */
  renderFullBackIcon = () => {
    const { playerLoadParam, exitFullScreen } = this.props;
    const { absoluteValue } = this.state;
    return (
      <TouchableOpacity
        style={[styles.backIconBox, { left: absoluteValue }, playerLoadParam.fullBackIconContainer]}
        onPress={exitFullScreen}
        activeOpacity={0.7}
      >
        <Image
          source={playerLoadParam.fullBackImg ? playerLoadParam.fullBackImg : Res.backArrow}
          style={[styles.arrowIcon, playerLoadParam.fullBackImgStyle]}
        />
      </TouchableOpacity>
    );
  };

  /*
   * 旋转动画
   */
  renderAnimation = () => {
    const { showAnimation, loadText, showRetry, retryText, playerLoadParam } = this.props;
    return (
      <View style={styles.loadingBox}>
        {showAnimation && !showRetry && (
          <View style={[styles.loadAnimBox, playerLoadParam.loadAnimBoxStyle]}>
            <Image
              source={
                playerLoadParam.loadingAnimBgImg
                  ? playerLoadParam.loadingAnimBgImg
                  : Res.loadingRes.loadingAnimImg
              }
              style={[styles.loadingAnimImg, playerLoadParam.loadingAnimBgImgStyle]}
            />
            <Animated.Image
              style={[
                {
                  // resizeMode: 'contain',
                  transform: [
                    {
                      rotate: this.state.rotateValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      }),
                    },
                  ],
                },
                styles.loadImage,
                playerLoadParam.loadingAnimImgStyle,
              ]}
              source={
                playerLoadParam.loadingAnimImg
                  ? playerLoadParam.loadingAnimImg
                  : Res.loadingRes.loadAnim
              }
            />
          </View>
        )}
        <TYText numberOfLines={1} style={[styles.loadingText, playerLoadParam.loadingTextStyle]}>
          {loadText}
        </TYText>
        {/* <TouchableOpacity onPress={() => this.props.reConnect()} activeOpacity={0.7}> */}
        <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.reConnect()}>
          {showRetry && (
            <TYText numberOfLines={1} style={[styles.retryText, playerLoadParam.reTryTextStyle]}>
              {retryText}
            </TYText>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { isFullScreen, playerLoadParam } = this.props;

    return (
      <View style={[styles.playerLoadPage, playerLoadParam.playerLoadContainer]}>
        {isFullScreen && this.renderFullBackIcon()}
        {this.renderAnimation()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  arrowIcon: {
    resizeMode: 'contain',
    width: cx(32),
  },
  backIconBox: {
    left: cx(10),
    position: 'absolute',
    top: cx(18),
  },
  loadAnimBox: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
  },
  loadImage: {
    backgroundColor: 'transparent',
    flex: 1,
    position: 'absolute',
    top: 7,
  },
  loadingAnimImg: {
    resizeMode: 'contain',
    width: 32,
  },
  loadingBox: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 150,
    minWidth: 150,
  },
  loadingText: {
    color: '#fff',
    fontSize: cx(14),
    marginTop: cx(8),
  },
  playerLoadPage: {
    alignItems: 'center',
    backgroundColor: '#000000',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  retryText: {
    color: '#1F78E0',
    fontSize: cx(16),
    marginTop: cx(8),
    textDecorationLine: 'underline',
  },
});

export default PlayerLoad;
