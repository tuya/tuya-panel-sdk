import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, ScrollView, View, Dimensions } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TYIpcPlayer, TYIpcNative } from '@tuya/tuya-panel-ipc-sdk';

const { width: winWidth, height: winHeight } = Dimensions.get('screen');

const IpcPLayer: React.FC = () => {
  const [scaleMultiple, setScaleMultiple] = useState(-1);
  const [currentZoomStatus, setCurrentZoomStatus] = useState(-1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [fullPlayerWidth, setFullPlayerWidth] = useState(winWidth);
  const [fullPlayerHeight, setFullPlayerHeight] = useState(winHeight);
  const onChangeStreamStatus = (status: number) => {
    console.log(status, 'sds');
  };

  const onChangeZoomStatus = (data: any) => {
    if (typeof data === 'number') {
      setCurrentZoomStatus(data);
    } else {
      // 对象表示scaleMultip的回调
      setCurrentZoomStatus(data.scaleStatus);
    }
  };

  const onChangeActiveZoomStatus = (data: any) => {
    const { zoomStatus } = data;
    setScaleMultiple(zoomStatus);
  };

  const onChangeScreenOrientation = (isFull: boolean) => {
    setIsFullScreen(isFull);
  };

  const enterFullScreen = () => {
    TYIpcNative.setScreenOrientation(1);
  };

  const exitFullScreen = () => {
    TYIpcNative.setScreenOrientation(0);
  };

  const enterRn = () => {
    TYIpcNative.enterRnPage('Ipc.IpcPlayerRnPageTest');
  };

  const enterNativePage = () => {
    TYIpcNative.enterPlayBack();
  };

  const enterAlubum = () => {
    TYIpcNative.enterParamAlbum();
  };

  const snapWithParam = () => {
    TYIpcNative.snapShootWithParams({ rotateMode: 2 });
  };

  const enableRecordWithParam = () => {
    TYIpcNative.endRecordWithParams({ rotateMode: 2 });
  };

  const adjustSize = () => {
    let sendScaleStatus = -1;
    if (currentZoomStatus === -1 || currentZoomStatus === 1 || currentZoomStatus === 1.0) {
      sendScaleStatus = -2;
    } else if (currentZoomStatus === -2) {
      sendScaleStatus = -1;
    }
    setScaleMultiple(sendScaleStatus);
  };

  const _onLayout = (e: any) => {
    const { width, height } = e.nativeEvent.layout;
    setFullPlayerWidth(Math.ceil(width));
    setFullPlayerHeight(Math.ceil(height));
  };

  return (
    <View onLayout={_onLayout} style={styles.TYIpcPlayerPage}>
      <TYText style={styles.descTxt} text="Description: 视频播放" />
      <View style={styles.playerContainer}>
        <TYIpcPlayer
          onChangeZoomStatus={onChangeZoomStatus}
          onChangeActiveZoomStatus={onChangeActiveZoomStatus}
          deviceOnline
          onChangeStreamStatus={onChangeStreamStatus}
          scaleMultiple={scaleMultiple}
          isFullScreen={isFullScreen}
          onChangeScreenOrientation={onChangeScreenOrientation}
          fullPlayerWidth={fullPlayerWidth}
          fullPlayerHeight={fullPlayerHeight}
          playerProps={{
            showZoomInTimes: true,
            maxScaleMultiple: 8,
          }}
        />
        <View style={styles.featureContain}>
          <TouchableOpacity style={styles.feature} onPress={enterFullScreen}>
            <TYText style={styles.featureTxt} text="进入全屏" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.feature} onPress={exitFullScreen}>
            <TYText style={styles.featureTxt} text="退出全屏" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.feature} onPress={enterRn}>
            <TYText style={styles.featureTxt} text="进入Rn页面" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.feature} onPress={enterNativePage}>
            <TYText style={styles.featureTxt} text="进入回放" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.feature} onPress={adjustSize}>
            <TYText style={styles.featureTxt} text="按宽按高" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.feature} onPress={enterAlubum}>
            <TYText style={styles.featureTxt} text="进入相册" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.feature} onPress={snapWithParam}>
            <TYText style={styles.featureTxt} text="参数截屏" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.feature} onPress={enableRecordWithParam}>
            <TYText style={styles.featureTxt} text="参数录制" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  TYIpcPlayerPage: {
    flex: 1,
    paddingBottom: 50,
  },
  descTxt: {
    color: 'red',
    marginVertical: 10,
    paddingLeft: 15,
  },
  feature: {
    backgroundColor: 'red',
    marginRight: 20,
    marginVertical: 20,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  featureContain: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    left: 50,
    position: 'absolute',
    right: 50,
    top: 100,
  },
  featureTxt: {
    color: '#ffffff',
    fontSize: 12,
    textAlign: 'center',
  },
  playerContainer: {
    backgroundColor: '#000000',
    flex: 1,
  },
});

export default IpcPLayer;
