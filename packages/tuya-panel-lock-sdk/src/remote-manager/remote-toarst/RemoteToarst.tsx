/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useRef, useContext } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { TYText, Utils } from 'tuya-panel-kit';
import ManagerContext from '../context/managerContext';
import { toNumber, isStatusBarInScreen } from '../utils';
import { useCountDownTimer } from '../hooks/index';
// import Strings from '../i18n';

const { convertX: cx, convertY: cy, isIphoneX, statusBarHeight } = Utils.RatioUtils;
const rejectImage = require('../res/reject.png');
const agreeImage = require('../res/agree.png');
const alarmImage = require('../res/mouseDown.png');

export interface IRemoteToarst {
  onConfirm?: (restCount: number) => void;
  onCancel?: (restCount: number) => void;
}

const RemoteDialog: React.FC<IRemoteToarst> = ({ onConfirm, onCancel }) => {
  const { options, modal, modalHeaderTitle } = useContext(ManagerContext);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const fadeHeight = useRef(new Animated.Value(0)).current;
  const needPadding = isStatusBarInScreen() || isIphoneX;

  /** 不同类型的弹窗获取初始倒计时的方式不同 */
  const initCountTimeMap = {
    image: options.useFakeTime ? options.countTime : toNumber(options?.initDpData?.unlockRequest),
    alarmImage: options.useFakeTime
      ? options.countTime
      : toNumber(options?.initDpData?.alarmRequest),
    video: toNumber(options?.countTime),
    alarmVideo: toNumber(options?.countTime),
  };

  const [count, timer] = useCountDownTimer((options.type && initCountTimeMap[options.type]) || 3);

  useEffect(() => {
    timer.reStart();
  }, []);

  // 倒计时结束 关闭弹窗
  useEffect(() => {
    if (count === 0) {
      modal.close();
    }
  }, [count]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1, // 透明度最终变为1，即完全不透明
        duration: 500, // 让动画持续一段时间
      }),
      Animated.timing(fadeHeight, {
        toValue: cx(80),
        duration: 500, // 让动画持续一段时间
      }),
    ]).start();
  }, [fadeAnim, fadeHeight]);

  const isAlarmType = options.type === 'alarmImage' || options.type === 'alarmVideo';

  return (
    <Animated.View
      style={{
        ...styles.container,
        height: fadeHeight, // 将透明度绑定到动画变量值
        opacity: fadeAnim,
        top: needPadding ? statusBarHeight + cx(8) : cx(8),
      }}
    >
      <View style={styles.content}>
        <TYText style={styles.text}>{modalHeaderTitle}</TYText>

        <View style={styles.btnwarp}>
          {isAlarmType ? (
            <TouchableOpacity onPress={() => onConfirm && onConfirm(count)}>
              <Image source={alarmImage} style={{ width: cx(32), height: cx(32) }} />
            </TouchableOpacity>
          ) : (
            <>
              <TouchableOpacity onPress={() => onCancel && onCancel(count)}>
                <Image
                  source={rejectImage}
                  style={{ width: cx(32), height: cx(32), marginRight: cx(16) }}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onConfirm && onConfirm(count)}>
                <Image source={agreeImage} style={{ width: cx(32), height: cx(32) }} />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  btnwarp: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: cx(16),
  },

  container: {
    alignItems: 'center',
    backgroundColor: 'rgba(102, 102, 102, 0.95)',
    borderRadius: cx(16),
    display: 'flex',
    flexDirection: 'row',
    height: cy(80),
    justifyContent: 'space-between',
    left: cx(16),
    position: 'absolute',
    width: cx(343),
    zIndex: 9999,
  },

  content: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  text: {
    color: '#fff',
    flex: 1,
    fontSize: cx(17),
    marginLeft: cx(15),
  },
});

export default RemoteDialog;
