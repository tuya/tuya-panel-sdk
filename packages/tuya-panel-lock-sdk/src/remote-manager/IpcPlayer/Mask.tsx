/* eslint-disable no-shadow */
import React, { useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Strings, Utils } from 'tuya-panel-kit';
import { CountDownButton } from '../../index';
import IPCContext from './IPCContext';
import ManagerContext from '../context/managerContext';
import { MaskType } from './interface';

const { convertX: cx, width: winWidth } = Utils.RatioUtils;
interface MaskProps {
  type?: MaskType;
  onStopPlaying?: () => void;
}

const Mask: React.FC<MaskProps> = ({ type = MaskType.getFailed, onStopPlaying }) => {
  const IPC = useContext(IPCContext);
  const { modal } = useContext(ManagerContext);

  const renderNoContentTip = () => null;

  /** 获取失败 */
  const renderFailedTip = () => {
    const handlePress = () => IPC.play();
    return (
      <>
        <Text style={styles.maskTitle}>{Strings.getLang('TYLock_getFailed_tip')}</Text>
        <View style={styles.btnArea}>
          <TouchableOpacity style={styles.btn} onPress={handlePress}>
            <Text style={styles.btnText}>刷新</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  /** 是否进入休眠提示 */
  const renderSleepTip = () => {
    const onCancel = () => {
      onStopPlaying && onStopPlaying();
    };
    const onConfirm = () => IPC.hideMask();
    const onIdleEndCallBack = () => {
      onStopPlaying && onStopPlaying();
    };

    return (
      <>
        <Text style={styles.maskTitle}>{Strings.getLang('TYLock_sleep_tip')}</Text>
        <View style={styles.btnArea}>
          <CountDownButton
            onPress={onCancel}
            onIdleEndCallBack={onIdleEndCallBack}
            style={styles.btn}
            textStyle={styles.btnText}
            countDownNumber={5}
            btnText="否"
          />
          <TouchableOpacity style={styles.btn} onPress={onConfirm}>
            <Text style={styles.btnText}>是</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  /** 即将进入休眠 */
  const renderWaitForSleepTip = () => {
    const onIdleEndCallBack = () => {
      modal.close();
    };

    return (
      <>
        <CountDownButton
          style={styles.btn}
          textStyle={styles.btnText}
          countDownNumber={5}
          onIdleEndCallBack={onIdleEndCallBack}
          customCountDownText={t => `${t}s`}
        />
        <Text style={styles.maskTitle}>{Strings.getLang('TYLock_ready_sleep_tip')}</Text>
      </>
    );
  };

  /** 该充钱了提示 */
  const renderNoFreeTimeTip = () => {
    const onSendMoney = () => IPC.goToSendMoney();
    const onSure = () => IPC.hideMask();
    const text = IPC.state.cloudServiceStatus
      ? Strings.getLang('TYLock_nofreeTimes_tip')
      : Strings.getLang('TYLock_nofreeTimes_recharge_tip');

    return (
      <>
        <Text numberOfLines={1} style={styles.maskTitle}>
          {text}
        </Text>
        <View style={styles.btnArea}>
          <TouchableOpacity
            style={styles.btn}
            onPress={IPC.state.cloudServiceStatus ? onSure : onSendMoney}
          >
            <Text style={styles.btnText}>{Strings.getLang('TYLock_recharge')}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const renderContentByType = () => {
    const typeMapFn = {
      [MaskType.getFailed]: renderFailedTip,
      [MaskType.noFreeTimes]: renderNoFreeTimeTip,
      [MaskType.sleepTip]: renderSleepTip,
      [MaskType.readyToSleepTip]: renderWaitForSleepTip,
    };

    return typeMapFn[type] ? typeMapFn[type]() : renderNoContentTip();
  };

  return (
    <View style={[styles.maskContainer, { width: winWidth, height: IPC.state.containerHeight }]}>
      <View style={styles.maskCenter}>{renderContentByType()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
    height: cx(40),
    justifyContent: 'center',
    width: cx(88),
    zIndex: 999,
  },

  btnArea: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: cx(256),
  },

  btnText: {
    color: '#FFF',
    textAlign: 'center',
  },

  maskCenter: {
    alignItems: 'center',
    color: '#fff',
    height: cx(94),
  },

  maskContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    flex: 1,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 99999,
  },

  maskTitle: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: cx(32),
  },
});

export default Mask;
