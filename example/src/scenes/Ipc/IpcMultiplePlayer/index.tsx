/* eslint-disable no-console */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { TYIpcMultiplePlayer, TYIpcMultipleManager } from '@tuya/tuya-panel-ipc-sdk';
import { TouchableOpacity, StyleSheet, View, Dimensions, Text } from 'react-native';
import { TYSdk } from 'tuya-panel-kit';
import _ from 'lodash';
import { getDeviceFromFamily } from './api';

const { showTip } = TYIpcMultipleManager;

const { width: winWidth, height: winHeight } = Dimensions.get('screen');

const boxWidth = Math.floor(winWidth / 2);
const boxHeight = Math.floor((9 * boxWidth) / 16);

interface device {
  category: string;
  isOnline: boolean;
  name: string;
  devId: string;
}

interface deviceSupportPower {
  isSupportedTalk: boolean;
  isSupportedSound: boolean;
  isSupportedCloudStorage: boolean;
  supportedAudioMode: boolean;
  videoClarity: string; // 默认清晰度
  videoClaritys: string[]; // 可切换的清晰度
  maxZoomInTimes: number;
}

interface deviceStatus {
  isTalking: boolean;
  isMute: boolean;
  isRecording: boolean;
  clarity?: string;
  status?: number;
  isFull: boolean;
  privateMode?: boolean;
}

const decodeClarityDic: Record<string, string> = {
  SS: '省流量', // 省流量
  SD: '标清', // 标清
  HD: '高清', // 高清
  UD: '超清', // 超清
  SSP: '超超清', // 超超清
  AUDIO: '音频模式', // 音频模式
};

const IpcPLayer: React.FC = () => {
  const [deviceList, setDeviceList] = useState<Array<device>>([]);
  const playerRefList = useRef<any[]>([]);
  const [deviceSupportPowerList, setDeviceSupportPowerList] = useState<Array<deviceSupportPower>>(
    []
  );
  const [deviceStatusList, setDeviceStatusList] = useState<Array<deviceStatus>>([]);
  const [fullState, setFullState] = useState<boolean>(false);
  const [playerIndex, setPlayerIndex] = useState<number>();

  const [hideFullMenu, setHideFullMenu] = useState(false);

  useEffect(() => {
    getDeviceFromFamily().then((res: [device]) => {
      const currentDevice = res.find(item => item.devId === TYSdk.devInfo.devId);
      let arr: device[] = res.filter(item => {
        return (
          item.category === 'sp' &&
          item.isOnline &&
          !item.name.includes('-vdevo') &&
          item.devId !== TYSdk.devInfo.devId
        );
      });
      currentDevice && arr.unshift(currentDevice);
      if (arr.length) {
        const init = {
          isTalking: false,
          isMute: true, // 是否静音
          isRecording: false,
          status: -1,
          isFull: false,
          privateMode: false,
        };
        arr = arr.splice(0, 4);
        setDeviceList(arr);
        setPlayerIndex(0);
        const statusList = arr.map(() => _.cloneDeepWith(init));
        setDeviceStatusList(statusList);
      }
    });
  }, []);

  const pausePlay = (index: number) => {
    playerRefList.current[index].manager
      .pausePlay()
      .then((data: any) => {
        console.log(data);
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  const startPlay = (index: number) => {
    playerRefList.current[index].manager.startPlay();
  };

  const enableStartTalk = (index: number) => {
    // 开启对讲时，将其他多个设备扬声器关闭、关闭其他设备对讲
    const isSupportedTalk =
      deviceSupportPowerList[index] && deviceSupportPowerList[index].isSupportedTalk;

    if (isSupportedTalk) {
      const newArr = _.cloneDeepWith(deviceStatusList);
      newArr[index].isTalking = !newArr[index].isTalking;

      playerRefList.current[index].manager
        .enableStartTalk(newArr[index].isTalking)
        .then((res: any) => {
          res.success && setDeviceStatusList(newArr);
        })
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  // 设置静音
  const enableMute = (index: number) => {
    const isSupportedSound =
      deviceSupportPowerList[index] && deviceSupportPowerList[index].isSupportedSound;

    if (isSupportedSound) {
      playerRefList.current[index].manager
        .enableMute(!deviceStatusList[index].isMute)
        .then(() => {})
        .catch((err: any) => {
          console.log(err);
        });
    }
  };

  const getDeviceConfigInfo = (index: number, config: any) => {
    const newArr = _.cloneDeepWith(deviceSupportPowerList);
    newArr[index] = config;

    setDeviceSupportPowerList(newArr);
  };

  const goToAlbum = (index: number) => {
    playerRefList.current[index].manager.enterAppAlbum();
  };

  const goToPlayback = (index: number) => {
    playerRefList.current[index].manager.enterPlayback();
  };

  const goToCloud = (index: number) => {
    playerRefList.current[index].manager.enterCloud();
  };

  const enableRecording = (index: number) => {
    const newArr = _.cloneDeepWith(deviceStatusList);
    newArr[index].isRecording = !newArr[index].isRecording;

    playerRefList.current[index].manager
      .enableRecording(newArr[index].isRecording)
      .then((res: any) => {
        if (res.success) {
          if (newArr[index].isRecording) {
            showTip('录像中');
          } else {
            showTip('录像结束');
          }
          setDeviceStatusList(newArr);
        }
      })
      .catch(() => {
        showTip('录像失败');
      });
  };

  const onChangeRecording = (index: number, isRecording: boolean) => {
    const newArr = _.cloneDeepWith(deviceStatusList);

    if (newArr[index].isRecording !== isRecording) {
      newArr[index].isRecording = isRecording;
      setDeviceStatusList(newArr);
    }
  };

  const changeClarity = (index: number) => {
    const newArr = _.cloneDeepWith(deviceStatusList);
    const { clarity } = newArr[index];
    const clarityList = deviceSupportPowerList[index].videoClaritys;

    if (clarityList.length) {
      let clarityIndex = clarityList.findIndex((item: string) => clarity === item);
      clarityIndex = clarityIndex + 1 === clarityList.length ? 0 : ++clarityIndex;
      newArr[index].clarity = clarityList[clarityIndex];

      playerRefList.current[index].manager
        .changeClarity(clarityList[clarityIndex])
        .then((res: any) => {
          if (res.success) setDeviceStatusList(newArr);
        })
        .catch(() => {});
    }
  };

  const onChangeStreamStatus = (devId: string, index: number, status: number) => {
    const newArr = _.cloneDeepWith(deviceStatusList);
    newArr[index].status = status;
    if (status === 1) {
      newArr[index].privateMode = true;
    }

    setDeviceStatusList(newArr);
  };

  const enablePlay = (index: number, enable: boolean) => {
    if (enable) {
      startPlay(index);
    } else {
      pausePlay(index);
    }
  };

  const snapShoot = (index: number) => {
    playerRefList.current[index].manager
      .snapShoot()
      .then((res: any) => {
        if (res.success) {
          showTip('截屏成功');
        } else {
          showTip('截屏失败');
        }
      })
      .catch(() => {
        showTip('操作失败');
      });
  };

  const setScreenOrientation = (index?: number) => {
    const newArr = _.cloneDeepWith(deviceStatusList);
    let newIndex = index;
    if (newIndex === undefined) {
      newIndex = newArr.findIndex(item => item.isFull);
    }
    if (newIndex > -1) {
      newArr[newIndex].isFull = !newArr[newIndex].isFull;
      const dir = newArr[newIndex].isFull ? 1 : 0;

      newArr.forEach((item, num: number) => {
        if (num === newIndex) {
          playerRefList.current[newIndex].manager.setScreenOrientation(dir);
        } else if (dir === 1) {
          playerRefList.current[num].manager.closeStatusStopPreview();
        } else {
          playerRefList.current[num].manager.startPlay();
        }
      });

      setFullState(newArr[newIndex].isFull);
      setDeviceStatusList(newArr);
    }
    // 此处除当前全屏的Player组件，其他Player播放状态关闭（五秒之后断开p2p连接）
  };

  const onChangeScreenOrientation = (index: number, dir: number) => {
    const newArr = _.cloneDeepWith(deviceStatusList);
    newArr[index].isFull = !!dir;

    setFullState(false);

    if (!dir) {
      newArr.forEach((item, num: number) => {
        if (num !== index) {
          playerRefList.current[num].manager.startPlay();
        }
      });
    }
    setDeviceStatusList(newArr);
  };

  const onChangeMute = (index: number, isMute: boolean) => {
    if (deviceStatusList[index].isMute !== isMute) {
      const newArr = _.cloneDeepWith(deviceStatusList);
      newArr[index].isMute = isMute;

      setDeviceStatusList(newArr);
    }
  };

  const pickPlayer = (index: number) => {
    setPlayerIndex(index);
  };

  const onFullScreenTapView = (hideFull: boolean) => {
    setHideFullMenu(hideFull);
  };

  const arr = [0, 1, 2, 3];

  const renderPlayerComponent = useMemo(() => {
    return (
      <View
        style={{
          flex: 1,
          width: winWidth,
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          flexDirection: 'row',
        }}
      >
        {arr.map((jtem, index) => {
          const item = deviceList[index];

          const deviceStatusInfo = deviceStatusList[index];
          const isFull = deviceStatusInfo && deviceStatusInfo.isFull;

          const currentClarity = deviceStatusInfo && deviceStatusInfo.clarity;
          const privateMode = deviceStatusInfo && deviceStatusInfo.privateMode;

          const playerContainStyle = {
            width: boxWidth,
            height: boxHeight,
            borderWidth: 1,
            borderColor: playerIndex === index ? 'red' : '#111',
          };

          const playerStyle = !fullState
            ? playerContainStyle
            : isFull
            ? styles.playerFullContain
            : styles.playerHideWrap;
          return item ? (
            <TouchableOpacity
              key={item.devId}
              style={playerStyle}
              onPress={() => pickPlayer(index)}
              activeOpacity={1}
            >
              <TYIpcMultiplePlayer
                devId={item.devId}
                deviceOnline={item.isOnline}
                privateMode={privateMode}
                showCutScreen={false}
                // 默认清晰度
                defaultClarity={currentClarity || 'HD'}
                // 默认静音状态
                defaultMute
                ref={(f: any) => {
                  playerRefList.current[index] = f;
                }}
                hideFullMenu={hideFullMenu}
                getDeviceConfigInfo={(config: any) => {
                  getDeviceConfigInfo(index, config);
                }}
                onChangeStreamStatus={(state: number) => {
                  onChangeStreamStatus(item.devId, index, state);
                }}
                onChangeScreenOrientation={(dir: number) => {
                  onChangeScreenOrientation(index, dir);
                }}
                onChangeRecording={(status: boolean) => {
                  onChangeRecording(index, status);
                }}
                onChangeMute={(status: boolean) => {
                  onChangeMute(index, status);
                }}
                onFullScreenTapView={onFullScreenTapView}
              />
            </TouchableOpacity>
          ) : (
            <View key={jtem} style={playerStyle} />
          );
        })}
      </View>
    );
  }, [deviceList, deviceStatusList, fullState, hideFullMenu, playerIndex]);

  const renderButton = useMemo(() => {
    const index = playerIndex;

    if (index !== undefined && !fullState) {
      const devicePower = deviceSupportPowerList[index];
      const isSupportedSound = devicePower && devicePower.isSupportedSound;
      const isSupportedTalk = devicePower && devicePower.isSupportedTalk;

      const deviceStatusInfo = deviceStatusList[index];
      const isTalking = deviceStatusInfo && deviceStatusInfo.isTalking;
      const isMute = deviceStatusInfo && deviceStatusInfo.isMute;
      const isRecording = deviceStatusInfo && deviceStatusInfo.isRecording;

      const currentClarity = deviceStatusInfo && deviceStatusInfo.clarity;
      const videoStatus = deviceStatusInfo && deviceStatusInfo.status;

      return (
        <View style={styles.playerWrap}>
          <View style={styles.buttonListWrap}>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => enablePlay(index, videoStatus !== 6)}
              >
                <Text style={styles.buttonText}>
                  {videoStatus === 6 ? '暂停' : '重新'}
                  预览
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => changeClarity(index)}>
                <Text style={styles.buttonText}>
                  {currentClarity ? decodeClarityDic[currentClarity] : '高清'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => enableRecording(index)}>
                <Text style={styles.buttonText}>
                  {isRecording ? '关闭' : '开启'}
                  录制
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button} onPress={() => enableStartTalk(index)}>
                <Text style={isSupportedTalk ? styles.buttonText : styles.disableButton}>
                  {isTalking ? '关闭' : '开启'}
                  对讲
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => enableMute(index)}>
                <Text style={isSupportedSound ? styles.buttonText : styles.disableButton}>
                  {isMute ? '关闭' : '开启'}
                  静音
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => snapShoot(index)}>
                <Text style={styles.buttonText}>截屏</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity style={styles.button} onPress={() => setScreenOrientation(index)}>
                <Text style={styles.buttonText}>全屏</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => goToPlayback(index)}>
                <Text style={styles.buttonText}>回放</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => goToAlbum(index)}>
                <Text style={styles.buttonText}>相册</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonGroup}>
              <TouchableOpacity onPress={() => goToCloud(index)}>
                <Text style={styles.buttonText}>云存储</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }

    return <View />;
  }, [deviceList, deviceStatusList, deviceSupportPowerList, fullState, playerIndex]);

  return (
    <View style={{ ...styles.TYIpcPlayerPage }}>
      {!fullState && (
        <View style={styles.name}>
          <Text style={styles.nameText}>
            {playerIndex !== undefined ? deviceList[playerIndex]?.name : ''}
          </Text>
        </View>
      )}
      {renderPlayerComponent}
      {renderButton}
    </View>
  );
};

const styles = StyleSheet.create({
  TYIpcPlayerPage: {
    backgroundColor: '#000',
    flex: 1,
    position: 'relative',
  },
  button: {},
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 10,
    width: winWidth - 100,
  },

  buttonListWrap: {
    flex: 1,
  },
  buttonText: {
    backgroundColor: '#dfdfdf',
    borderRadius: 6,
    color: '#555',
    fontSize: 15,
    paddingVertical: 10,
    textAlign: 'center',
    width: 80,
  },
  disableButton: {
    backgroundColor: '#f5f5f5',
    borderColor: '#d9d9d9',
    borderRadius: 6,
    borderWidth: 1,
    color: '#00000040',
    fontSize: 15,
    paddingVertical: 10,
    textAlign: 'center',
    width: 80,
  },
  name: {
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
  },
  nameText: {
    color: '#fff',
  },
  playerFullContain: {
    height: winWidth,
    width: winHeight,
  },
  playerHideWrap: {
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    width: 0,
  },
  playerWrap: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});

export default IpcPLayer;
