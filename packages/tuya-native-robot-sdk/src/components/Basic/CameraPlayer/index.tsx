import React, { Component } from 'react';
import {
  requireNativeComponent,
  View,
  NativeModules,
  StyleSheet,
  ViewProps,
  ViewStyle,
  StyleProp,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import { TYSdk, Utils } from '@tuya-rn/tuya-native-components';
import throttle from 'lodash/throttle';

import i18n from '../../../i18n';
import res from './res';
import { handleError, createSingleton } from '../../../utils/FunctionUtils';

const { TYRCTCameraManager } = NativeModules;
const {
  RatioUtils: { viewWidth, convert },
} = Utils;

// const Player = requireNativeComponent('TYRCTCameraPlayer');
const getSinglePlayer = createSingleton(() => requireNativeComponent('TYRCTCameraPlayer'));

function loop() {}

const $simpleTipDialog = (error: { message?: any; ret?: any }) => {
  const msg = error.message || error.ret || i18n.getLang('commonErrorTip');
  if (msg !== 'Permission') TYSdk.mobile.simpleTipDialog(msg, loop);
};

class CameraManager {
  store: any;
  constructor(store: any) {
    this.store = store;
  }

  packageMethod(method = '', argumentsLength = 2) {
    return new Promise((resolve, reject) =>
      this.store[method](...[resolve, reject].slice(0, argumentsLength))
    );
  }

  connect() {
    return this.packageMethod('connect');
  }

  startPreview() {
    return this.packageMethod('startPreview');
  }

  disconnect() {
    return this.packageMethod('disconnect', 0);
  }

  snapShoot() {
    return this.packageMethod('snapShoot');
  }

  startRecord() {
    return this.packageMethod('startRecord');
  }

  stopRecord() {
    return this.packageMethod('stopRecord');
  }

  startTalk() {
    return this.packageMethod('startTalk');
  }

  stopTalk() {
    return this.packageMethod('stopTalk');
  }

  enableMute(isMute) {
    return new Promise((resolve, reject) => this.store.enableMute(isMute, resolve, reject));
  }

  startVolume() {
    return this.enableMute(false);
  }

  stopVolume() {
    return this.enableMute(true);
  }

  isRecording() {
    return this.packageMethod('isRecording', 1);
  }

  isMuting() {
    return this.packageMethod('isMuting', 1);
  }
}

const cameraManager = new CameraManager(TYRCTCameraManager);

interface IProps extends ViewProps {
  style?: StyleProp<ViewStyle>;
  action?: number;
  onChangePreview(d: any): void;
  indicator?: Element;
  isTalking?: boolean;
  talkingElement?: Element;
  width: number;
  initialVolume: boolean;
}

type IState = Readonly<{
  ready: boolean;
  isRecording: boolean;
  volume: boolean;
}>;
/**
 * 播放器控件
 */
export default class CameraPlayer extends Component<IProps, IState> {
  static defaultProps = {
    action: 0,
    onChangePreview(d: any) {},
    indicator: null,
    isTalking: false,
    talkingElement: null,
    width: viewWidth,
    initialVolume: false,
  };

  static manager = cameraManager;
  // static propTypes: any;

  state = {
    ready: false,
    isRecording: false,
    volume: false,
  };

  async componentDidMount() {
    try {
      await cameraManager.connect();
      await cameraManager.startPreview();
    } catch (error) {
      $simpleTipDialog(error);
    } finally {
      this.setState({ ready: true });
    }

    try {
      const volume = this.props.initialVolume;
      if (volume) {
        await CameraPlayer.manager.startVolume();
      } else {
        await CameraPlayer.manager.stopVolume();
      }
      const isRecording = await CameraPlayer.manager.isRecording();
      this.setState({ volume, isRecording });
    } catch (e) {
      handleError(e);
    }
  }

  async componentWillUnmount() {
    try {
      await cameraManager.disconnect();
    } catch (error) {
      $simpleTipDialog(error);
    }
  }

  handleChange = (event: any) => {
    this.props.onChangePreview(event);
  };

  toggleVolume = async () => {
    try {
      const isMute = await CameraPlayer.manager.isMuting();
      if (isMute) {
        await CameraPlayer.manager.startVolume();
      } else {
        await CameraPlayer.manager.stopVolume();
      }
      this.setState({ volume: isMute }, () => {});
    } catch (error) {
      $simpleTipDialog(error);
    }
  };

  async handleScreenShot() {
    console.warn('11123123');
    try {
      await CameraPlayer.manager.snapShoot();
    } catch (error) {
      $simpleTipDialog(error);
    }
  }

  toggleTalk = async action => {
    try {
      if (action) {
        await CameraPlayer.manager.startTalk();
      } else {
        await CameraPlayer.manager.stopTalk();
      }
      this.setState({ isTalking: action });
    } catch (error) {
      $simpleTipDialog(error);
    }
  };

  toggleScreenRecord = throttle(async () => {
    try {
      const isRecording = await CameraPlayer.manager.isRecording();
      // console.warn('toggleScreenRecord', isRecording);
      if (isRecording) {
        await CameraPlayer.manager.stopRecord();
      } else {
        await CameraPlayer.manager.startRecord();
      }
      this.setState({ isRecording: !isRecording });
    } catch (error) {
      $simpleTipDialog(error);
    }
  }, 3000);

  renderBar = () => {
    const { isRecording } = this.state;
    const data = [
      // {
      //   id: 'volume',
      //   image: volume ? res.volumeActive : res.volumeInactive,
      //   onPress: this.toggleVolume,
      // },
      {
        id: 'screenshot',
        image: res.screenshot,
        onPress: this.handleScreenShot,
      },
      // {
      //   id: 'microphone',
      //   image: res.microphone,
      //   onPress: () => this.toggleTalk(!this.state.isTalking),
      // },
      {
        id: 'screenRecord',
        image: isRecording ? res.screenRecordActive : res.screenRecord,
        onPress: this.toggleScreenRecord,
      },
    ];
    return (
      <View style={styles.bar}>
        {data.map(({ id, image, onPress }) => {
          return (
            <TouchableOpacity key={id} style={styles.barBtn} onPress={onPress}>
              <Image source={image} style={styles.barImg}></Image>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  render() {
    const { isTalking, talkingElement, style, width } = this.props;
    const cameraStyle = {
      ...cameraLayout(width),
    };
    const Player = getSinglePlayer();
    return (
      <View>
        <Player
          {...this.props}
          style={[cameraStyle, styles.camera, style]}
          onChange={this.handleChange}
        />
        {this.renderBar()}
        {!this.state.ready && (
          <View style={styles.absCenter}>
            <ActivityIndicator size="large" color="#666666"></ActivityIndicator>
          </View>
        )}
        {isTalking && <View style={styles.absCenter}>{talkingElement}</View>}
      </View>
    );
  }
}

function cameraLayout(width: number) {
  const height = (width / 16) * 9;
  return {
    width,
    height,
  };
}

const styles = StyleSheet.create({
  absCenter: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    borderRadius: 4,
  },
  bar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 36,
    backgroundColor: 'rgba(57,61,73, 0.86)',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'red',
    paddingRight: convert(10),
  },
  barImg: {
    width: convert(32),
    height: convert(32),
  },
  barBtn: {
    paddingHorizontal: convert(8),
  },
});

CameraPlayer.propTypes = CameraPlayer.propTypes;
