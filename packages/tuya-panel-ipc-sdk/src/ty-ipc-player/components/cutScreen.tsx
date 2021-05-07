import React from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { TYSdk, TYText, IconFont } from 'tuya-panel-kit';
import Config from '../config';
import Strings from '../i18n';
import Icon from '../res/iconfont.json';

const { cx, isIOS, cy } = Config;
const TYEvent = TYSdk.event;
export interface CutScreenProps {
  isFullScreen: boolean;
  cutStyle: any;
  pressEnterAlbum: () => any;
}

export interface CutScreenState {
  showCutScreen: boolean;
  isVideoCut: boolean;
  baseImg: string;
}

const _defaultProps = {
  isFullScreen: false,
  cutStyle: {},
};

class CutScreen extends React.PureComponent<CutScreenProps, CutScreenState> {
  static defaultProps = _defaultProps;

  constructor(props: CutScreenProps) {
    super(props);
    this.state = {
      showCutScreen: false,
      isVideoCut: false,
      baseImg: '',
    };
    this.startShowCutTimeout = null;
  }

  componentDidMount() {
    TYEvent.on('cutScreenListen', this.cutScreenListen);
    TYEvent.on('hideScreenListen', this.hideCutScreen);
  }

  componentWillUnmount() {
    TYEvent.off('cutScreenListen', this.cutScreenListen);
    TYEvent.off('hideScreenListen', this.hideCutScreen);
    this.startShowCutTimeout = null;
  }

  hideCutScreen = () => {
    clearTimeout(this.startShowCutTimeout);
    this.setState({
      showCutScreen: false,
    });
  };

  cutScreenListen = data => {
    this.setState({
      showCutScreen: data.showCutScreen,
      isVideoCut: data.isVideoCut,
      baseImg: isIOS ? `data:image/png;base64,${data.imageSrc}` : `file://${data.imageSrc}`,
    });
    this.startShowCutTimeout = setTimeout(() => {
      this.setState({
        showCutScreen: false,
      });
    }, 5000);
  };

  startShowCutTimeout: any;
  render() {
    const { showCutScreen, isVideoCut, baseImg } = this.state;
    const { isFullScreen, cutStyle } = this.props;
    if (showCutScreen) {
      return (
        <TouchableOpacity
          style={styles.cutScreenContainer}
          activeOpacity={1}
          onPress={this.hideCutScreen}
        >
          <TouchableOpacity
            style={[
              styles.cutScreeCommon,
              isFullScreen ? styles.cutFullScreenPage : styles.cutScreenPage,
              cutStyle.containerStyle && { ...cutStyle.containerStyle },
            ]}
            activeOpacity={1}
            onPress={() => false}
          >
            <View style={styles.cutImgBox}>
              <Image source={{ uri: baseImg }} style={styles.cutImg} />
              {isVideoCut && (
                <IconFont
                  d={Icon.cutVideoIcon}
                  style={styles.playRecordIcon}
                  color="#ffffff"
                  size={26}
                />
              )}
            </View>
            <TYText style={[styles.cutTip, cutStyle.descTxtStyle && { ...cutStyle.descTxtStyle }]}>
              {isVideoCut
                ? Strings.getLang('tyIpc_record_save')
                : Strings.getLang('tyIpc_screen_shot_save')}
            </TYText>
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.albumBox, cutStyle.albumBox && { ...cutStyle.albumBox }]}
              onPress={this.props.pressEnterAlbum}
            >
              <TYText
                numberOfLines={1}
                style={[styles.enterAlbum, cutStyle.albumTxt && { ...cutStyle.albumTxt }]}
              >
                {Strings.getLang('tyIpc_enter_album')}
              </TYText>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      );
    }
    return null;
  }
}

const styles = StyleSheet.create({
  albumBox: {
    backgroundColor: '#ffffff',
    borderRadius: Math.ceil(cx(20)),
    overflow: 'hidden',
  },
  cutFullScreenPage: {
    alignItems: 'center',
    bottom: cy(25),
    flex: 1,
    flexDirection: 'row',
    height: cy(60),
    left: '50%',
    marginLeft: -cx(210),
    padding: cx(15),
    position: 'absolute',
    width: cx(420),
  },
  cutImg: {
    height: cx(40),
    width: cx(80),
  },
  cutImgBox: {
    alignItems: 'center',
    borderRadius: Math.ceil(cx(2)),
    height: cx(40),
    justifyContent: 'center',
    overflow: 'hidden',
    width: cx(80),
  },
  cutScreeCommon: {
    backgroundColor: '#ffffff',
  },
  cutScreenContainer: {
    backgroundColor: 'transparent',
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  cutScreenPage: {
    alignItems: 'center',
    bottom: cy(10),
    flexDirection: 'row',
    height: cy(60),
    left: cx(10),
    padding: cx(15),
    position: 'absolute',
    right: cx(10),
  },
  cutTip: {
    flex: 1,
    fontSize: cx(12),
    paddingLeft: cx(15),
  },
  enterAlbum: {
    backgroundColor: '#fc2f07',
    color: '#fff',
    fontSize: cx(12),
    paddingHorizontal: cx(15),
    paddingVertical: cx(10),
  },
  playRecordIcon: {
    height: cx(25),
    position: 'absolute',
    width: cx(25),
  },
});

export default CutScreen;
