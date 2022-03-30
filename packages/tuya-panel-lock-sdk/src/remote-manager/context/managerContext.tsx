import React, { useState, useEffect, useRef } from 'react';
import { Animated, Easing, Platform, BackHandler } from 'react-native';
import { Utils, TYSdk } from 'tuya-panel-kit';
import { useCountDownTimer, useToast } from '../hooks/index';
import useDpDataChange from '../hooks/useDpDataChange';
import Strings from '../i18n';
import { alarmTypeTitle } from '../utils';
import { ManagerContextType, OptionsType } from '../interface';

const { height: screenHeight } = Utils.RatioUtils;

const ManagerContext = React.createContext<ManagerContextType>({} as ManagerContextType);

export default ManagerContext;

interface IProps {
  value: ManagerContextType;
}

export const ManagerProvider: React.FC<IProps> = ({ value, children }) => {
  const hasRemoteKeyDp = TYSdk.device.checkDpExist('remote_no_pd_setkey');
  const animatePos = useRef(new Animated.Value(-screenHeight)).current;
  const [toastElement, toastApi] = useToast();
  const [data, setData] = useState<ManagerContextType>({ ...value, toastApi });
  const updateOptions = (options: OptionsType) => setData(preData => ({ ...preData, options }));
  const dpData = useDpDataChange(data);
  const [countTime, timer] = useCountDownTimer(data.options?.countTime);

  /** 弹窗头部文案 */
  const isAlarmType = data.options.type === 'alarmVideo' || data.options.type === 'alarmImage';
  const alarmTitleType = dpData.dp212ParseData?.ext?.type;
  const requestOpenTitle = hasRemoteKeyDp
    ? Strings.getLang('TYLock_remoteOpenDoor')
    : Strings.getLang('TYLock_doorBellRing');
  const alarmTypeText = alarmTypeTitle[alarmTitleType] || Strings.getLang('TYLock_alarm');
  const modalHeaderTitle = isAlarmType ? alarmTypeText : requestOpenTitle;

  const handleHardwareBackPress = () => true;

  useEffect(() => {
    TYSdk.mobile.disablePopGesture();
    /** 启动面板倒计时 */
    if (data.options.useFakeTime) {
      timer.reStart();
    }
    /** 弹窗出现 不能返回 */
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress);
    }

    return () => {
      TYSdk.mobile.enablePopGesture();
      BackHandler.removeEventListener('hardwareBackPress', handleHardwareBackPress);
    };
  }, []);

  useEffect(() => {
    Animated.timing(animatePos, {
      toValue: 0,
      duration: 300, // 让动画持续一段时间
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(); // 开始执行动画
  }, [animatePos]);

  return (
    <ManagerContext.Provider
      value={{
        ...data,
        updateOptions,
        countTime: data.options.useFakeTime ? countTime : dpData?.countTime,
        dpData,
        toastApi,
        modalHeaderTitle,
        timer,
        isDoorBellRing: !hasRemoteKeyDp,
      }}
    >
      {data.options.renderToarst ? (
        children
      ) : (
        <Animated.View
          style={{ transform: [{ translateY: animatePos }], position: 'absolute', width: '100%' }}
        >
          {children}
        </Animated.View>
      )}
      {toastElement}
    </ManagerContext.Provider>
  );
};
