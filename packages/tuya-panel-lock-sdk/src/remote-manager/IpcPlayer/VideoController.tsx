import React, { useContext } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';
import IPCContext from './IPCContext';
import Res from '../res';
import { MODE } from './interface';

const { convertX: cx, convertY: cy, width: screenWidth } = Utils.RatioUtils;

interface IControlBtn {
  open?: boolean;
  openImageSource: ImageSourcePropType;
  closeImageSource?: ImageSourcePropType;
  openText: string;
  closeText?: string;
  disabled?: boolean;
  onPress?: () => void;
}

const ControlBtn: React.FC<IControlBtn> = ({
  open = true,
  disabled = false,
  openText,
  closeText,
  openImageSource,
  closeImageSource,
  onPress,
}) => {
  const imageSource = open ? openImageSource : closeImageSource;
  return (
    <View style={styles.flexBtnItem}>
      <TouchableOpacity disabled={disabled} style={styles.flexBtn} onPress={onPress}>
        <Image
          style={{ width: cx(32), height: cx(32) }}
          source={imageSource as ImageSourcePropType}
        />
      </TouchableOpacity>

      <TYText size={cx(11)} color="#fff" text={open ? openText : closeText} />
    </View>
  );
};

const VideoController: React.FC = () => {
  const {
    toggleMute,
    state,
    toggleTalking,
    // toggleChangeSound,
    snapshot,
    toggleRecord,
  } = useContext(IPCContext);
  const showBtns = state.mode === MODE.playing && state.withAudio;
  const showVoiceBtn = state.isTwoWayTalk || !state.isTalking;

  const btns = (
    <View style={styles.btnsAreaFlex}>
      {showVoiceBtn && (
        <ControlBtn
          onPress={toggleMute}
          open={state.voiceStatus === 'ON'}
          openImageSource={Res.voice}
          closeImageSource={Res.mute}
          disabled={state.isRecording} /** 录制时不支持静音 */
          openText="静音"
          closeText="取消静音"
        />
      )}

      {/* 下期再上 */}
      {/* <ControlBtn
        onPress={toggleChangeSound}
        open={state.changeSound}
        openImageSource={Res.cancelChangeSound}
        closeImageSource={Res.changeSound}
        openText="取消变声"
        closeText="变声"
      /> */}

      {state.isSupportMic && (
        <ControlBtn
          onPress={toggleTalking}
          open={state.isTalking}
          openImageSource={Res.talking}
          closeImageSource={Res.microphone}
          openText="关闭对讲"
          closeText="开启对讲"
        />
      )}

      <ControlBtn onPress={snapshot} openImageSource={Res.snapshot} openText="截屏" />

      <ControlBtn
        onPress={toggleRecord}
        open={state.isRecording}
        disabled={state.disableRecord}
        openImageSource={Res.stopRecord}
        closeImageSource={Res.recordVideo}
        openText="停止录屏"
        closeText="录屏"
      />
    </View>
  );

  return <View style={styles.featureContainer}>{showBtns && btns}</View>;
};

const styles = StyleSheet.create({
  btnsAreaFlex: {
    alignItems: 'center',
    flexDirection: 'row',
    height: cy(88),
    justifyContent: 'space-around',
    width: screenWidth,
  },

  featureContainer: {
    alignSelf: 'flex-end',
    position: 'absolute',
    zIndex: 9999,
  },

  flexBtn: {
    height: cx(32),
    marginBottom: cx(4),
    width: cx(32),
  },

  flexBtnItem: {
    alignItems: 'center',
    flexDirection: 'column',
    width: cx(50),
  },
});

export default VideoController;
