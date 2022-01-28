/* eslint-disable camelcase */
import React, { FC, useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { TYSdk, Utils, IconFont } from 'tuya-panel-kit';
import { putDpfindDevice, getDeviceLocation } from './common/api';
import { loadedModal, putDpType, getCurrentLocation, getLocation } from './common/utils';
import { IProps, ILocation } from './common/interface';
import Child from './child';
import homeModal from './homeModal';
import icons from './res/icons';

const { convertX: cx } = Utils.RatioUtils;

type modelType = 1 | 2 | 3;

const dpSosState = 'sos_state';
const dpFinddev = 'finddev';
const dpAlarmLightSwitch = 'alarm_light_switch';

// eslint-disable-next-line no-shadow
enum ActionStatus {
  normal = 'normal',
  searching = 'searching',
  success = 'success',
}

const Main: FC<IProps> = (props: IProps) => {
  const {
    themeColor,
    deviceOnline,
    bleState,
    iconProp,
    onSearchResult,
    onRingLampResult,
    // 下面是可选
    searchIcon,
    ringIcon,
    lampIcon,
    successIcon,
    timeout,
    modalStartPoint, // modalStartPoint, 有蒙层才需要设置此属性
    searchModalProp, // 蒙层才需要设置此属性
    ringModalProp, // 蒙层才需要设置此属性
    lampModalProp, // 蒙层才需要设置此属性
    iconSpace,
    viewStyle,
  } = props;
  const [search, setSearch] = useState<ActionStatus>(ActionStatus.normal);
  const [ring, setRing] = useState<ActionStatus>(ActionStatus.normal);
  const [lamp, setLamp] = useState<ActionStatus>(ActionStatus.normal);
  const [searchModal, setSearchModal] = useState(false);
  const [ringModal, setRingModal] = useState(false);
  const [lampModal, setLampModal] = useState(false);

  const lampTimer = useRef(0);
  const searchTimer = useRef(0);
  const showLoading = useRef(false); // 控制一键寻宠的按钮状态

  useEffect(() => {
    TYSdk.event.on('deviceDataChange', dpListen);
    return () => {
      TYSdk.event.off('deviceDataChange', dpListen);
      searchTimer.current && clearInterval(searchTimer.current);
      lampTimer.current && clearTimeout(lampTimer.current);
    };
  }, []);

  const dpListen = async (data: any) => {
    const { type, payload } = data;
    if (type === 'dpData') {
      const {
        link_mode,
        ble_location,
        lbs_position,
        gps_position,
        wifi_position,
        alarm_light_switch,
        finddev,
      } = payload;
      // 连接模式cat1、Bluetooth
      if (lbs_position || gps_position || wifi_position || link_mode || ble_location) {
        // 网关上报此dp点：ble_location
        // cat1上报dp点：lbs_position || gps_position || wifi_position
        // 连接模式上报：link_mode
        const result = await getLocation();
        if (showLoading.current) {
          searchTimer.current && clearTimeout(searchTimer.current);
          showLoading.current = false;
          searchSuccess();
        }
        onSearchResult(result);
      }
      if (alarm_light_switch !== undefined) {
        if (alarm_light_switch) {
          setLamp(ActionStatus.success);
        } else {
          setLamp(ActionStatus.normal);
        }
        lampTimer.current && clearTimeout(lampTimer.current);
      }

      if (finddev !== undefined) {
        if (finddev) {
          setRing(ActionStatus.success);
        } else {
          setRing(ActionStatus.normal);
        }
        lampTimer.current && clearTimeout(lampTimer.current);
      }
    }
  };

  /**
   * 搜索成功
   */
  const searchSuccess = () => {
    setSearch(ActionStatus.success);
    setTimeout(() => {
      setSearch(ActionStatus.normal);
    }, 2000);
  };

  /**
   * 搜索
   */
  const onSearch = async () => {
    // 显示了modal
    if (searchModalProp) {
      const exist = await loadedModal('search');
      if (exist) {
        // 不显示modal层
        setSearchModal(false);
      } else {
        setSearchModal(true);
        return;
      }
    }
    // loading时，不能被同时点击
    if (clickedAction()) return;
    try {
      setSearch(ActionStatus.searching);
      // 蓝牙模式
      if (bleState) {
        // 直接去app获取一次位置
        const phoneResult = (await getCurrentLocation()) as ILocation;
        const { address, latitude, longitude } = phoneResult;
        const phone = { address, latitude, longitude };
        const p = {
          device: {
            ...phone,
            reportTime: new Date(),
          },
          phone,
        };
        onSearchResult({ error: false, ...p });
        searchSuccess();
      } else {
        showLoading.current = true;
        // 下发dp点，等待设备上报。如果10s后没有上报，则从云端获取最新值
        await putDpfindDevice(dpSosState, true);
        searchTimer.current = setTimeout(async () => {
          // 超过10秒，从云端获取数据展示
          if (showLoading.current) {
            showLoading.current = false;
            const result = await getLocation();
            searchSuccess();
            onSearchResult(result);
          }
        }, timeout);
      }
    } catch (error) {
      showLoading.current = false;
      setSearch(ActionStatus.normal);
      onSearchResult({ error: true, ...error });
    }
  };
  /**
   * 响铃
   */
  const onRing = async () => {
    if (ringModalProp) {
      const exist = await loadedModal('ring');
      if (exist) {
        // 不显示modal层
        setRingModal(false);
      } else {
        setRingModal(true);
        return;
      }
    }
    if (clickedAction()) return;
    ringAndLamp(dpFinddev, ring, setRing);
  };

  /**
   * 闪灯
   */
  const onLamp = async () => {
    if (lampModalProp) {
      const exist = await loadedModal('lamp');
      if (exist) {
        // 不显示modal层
        setLampModal(false);
      } else {
        setLampModal(true);
        return;
      }
    }
    if (clickedAction()) return;
    ringAndLamp(dpAlarmLightSwitch, lamp, setLamp);
  };

  /**
   * 闪灯和响铃共有方法
   * @param dpCode dp点
   * @param state 状态
   * @param setState 改变状态
   */
  const ringAndLamp = (dpCode: string, state: ActionStatus, setState: any) => {
    const open = state !== ActionStatus.success;
    setState(ActionStatus.searching);
    lampTimer.current = setTimeout(() => {
      // 转圈最多10秒
      setState(ActionStatus.normal);
      // 抛出超时异常
      const msg = {
        type: 'timeout',
        message: '超时',
      };
      onRingLampResult && onRingLampResult({ error: false, ...msg });
    }, timeout);
    putDpType(bleState, dpCode, open);
  };

  /**
   * 不可以同时被点击
   * @returns boolean
   */
  const clickedAction = () => {
    if (
      search === ActionStatus.searching ||
      ring === ActionStatus.searching ||
      lamp === ActionStatus.searching
    ) {
      return true;
    }
    return false;
  };

  /**
   * 点击
   * @param type 搜索/闪灯/响铃
   */
  const onMaskPress = (type: modelType) => {
    if (type === 1) {
      setSearchModal(false);
    } else if (type === 2) {
      setRingModal(false);
    } else if (type === 3) {
      setLampModal(false);
    }
  };

  /**
   * 透明度
   * @param name 搜索/闪灯/响铃
   * @returns
   */
  const getOpacity = (name: string) => {
    let opacity = 0;
    if (deviceOnline) {
      opacity = name === ActionStatus.searching ? 0 : 1;
    } else {
      opacity = 0.25;
    }
    return opacity;
  };

  /**
   * 蒙层中元素的高度
   * @param type 搜索/闪灯/响铃
   * @returns 元素1，元素2
   */
  const getModalHeight = (type: modelType) => {
    const { iconStyle } = iconProp;
    const { width = cx(50) } = iconStyle;
    let bottom1 = modalStartPoint;
    let bottom2 = 0;
    let searchHeight = 0;
    let ringHeight = 0;
    if (TYSdk.device.checkDpExist(dpFinddev)) {
      searchHeight += Number(width) + iconSpace;
    }
    if (TYSdk.device.checkDpExist(dpAlarmLightSwitch)) {
      ringHeight += Number(width) + iconSpace;
      searchHeight += Number(width) + iconSpace;
    }
    if (type === 1) {
      bottom1 += iconSpace + searchHeight;
    } else if (type === 2) {
      bottom1 += iconSpace + ringHeight;
    } else if (type === 3) {
      bottom1 += iconSpace;
    }
    bottom2 = bottom1 - cx(170) - Number(width) + cx(20);
    return { bottom1, bottom2 };
  };

  return (
    <View style={viewStyle}>
      {TYSdk.device.checkDpExist(dpSosState) ? (
        <TouchableOpacity
          style={{ marginBottom: iconSpace }}
          onPress={onSearch}
          disabled={!deviceOnline}
        >
          <View
            style={[
              styles.btnView,
              {
                backgroundColor: search === ActionStatus.success ? themeColor : '#FFF',
                ...iconProp.iconStyle,
              },
            ]}
          >
            {search === ActionStatus.searching ? (
              <ActivityIndicator
                style={styles.indicator}
                size="small"
                color={iconProp.color}
                animating
              />
            ) : (
              <IconFont
                opacity={getOpacity(search)}
                d={search === ActionStatus.success ? successIcon || searchIcon : searchIcon}
                size={iconProp.size}
                color={search === ActionStatus.success ? '#FFF' : iconProp.color}
              />
            )}
          </View>
        </TouchableOpacity>
      ) : null}
      {TYSdk.device.checkDpExist(dpFinddev) ? (
        <TouchableOpacity
          style={{ marginBottom: iconSpace }}
          onPress={onRing}
          disabled={!deviceOnline}
        >
          <View
            style={[
              styles.btnView,
              {
                backgroundColor: ring === ActionStatus.success ? themeColor : '#FFF',
                ...iconProp.iconStyle,
              },
            ]}
          >
            {ring === ActionStatus.searching ? (
              <ActivityIndicator
                style={styles.indicator}
                size="small"
                color={iconProp.color}
                animating
              />
            ) : (
              <IconFont
                opacity={getOpacity(ring)}
                d={ringIcon}
                size={iconProp.size}
                color={ring === ActionStatus.success ? '#FFF' : iconProp.color}
              />
            )}
          </View>
        </TouchableOpacity>
      ) : null}
      {TYSdk.device.checkDpExist(dpAlarmLightSwitch) ? (
        <TouchableOpacity
          style={{ marginBottom: iconSpace }}
          onPress={onLamp}
          disabled={!deviceOnline}
        >
          <View
            style={[
              styles.btnView,
              {
                backgroundColor: lamp === ActionStatus.success ? themeColor : '#FFF',
                ...iconProp.iconStyle,
              },
            ]}
          >
            {lamp === ActionStatus.searching ? (
              // android animating 更改存在问题
              <ActivityIndicator
                style={styles.indicator}
                size="small"
                color={iconProp.color}
                animating
              />
            ) : (
              <IconFont
                opacity={getOpacity(lamp)}
                d={lampIcon}
                size={iconProp.size}
                color={lamp === ActionStatus.success ? '#FFF' : iconProp.color}
              />
            )}
          </View>
        </TouchableOpacity>
      ) : null}
      {/* 蒙层 */}
      {searchModalProp &&
        homeModal({
          title: searchModalProp.title,
          subTitle: searchModalProp.subTitle,
          done: searchModalProp.done,
          bgImage: searchModalProp.bgImage,
          bgStyle: searchModalProp.bgStyle,
          bgChildStyle: searchModalProp.bgChildStyle,
          showModal: searchModal,
          v1Bottom: getModalHeight(1).bottom1,
          v2Bottom: getModalHeight(1).bottom2,
          iconBoxStyle: searchModalProp.iconBoxStyle,
          iconProp,
          icon: searchIcon,
          onMaskPress: () => onMaskPress(1),
        })(Child)}
      {ringModalProp &&
        homeModal({
          title: ringModalProp.title,
          subTitle: ringModalProp.subTitle,
          done: ringModalProp.done,
          bgImage: ringModalProp.bgImage,
          bgStyle: ringModalProp.bgStyle,
          bgChildStyle: ringModalProp.bgChildStyle,
          showModal: ringModal,
          v1Bottom: getModalHeight(2).bottom1,
          v2Bottom: getModalHeight(2).bottom2,
          iconBoxStyle: ringModalProp.iconBoxStyle,
          iconProp,
          icon: ringIcon,
          onMaskPress: () => onMaskPress(2),
        })(Child)}
      {lampModalProp &&
        homeModal({
          title: lampModalProp.title,
          subTitle: lampModalProp.subTitle,
          done: lampModalProp.done,
          bgImage: lampModalProp.bgImage,
          bgStyle: lampModalProp.bgStyle,
          bgChildStyle: lampModalProp.bgChildStyle,
          showModal: lampModal,
          v1Bottom: getModalHeight(3).bottom1,
          v2Bottom: getModalHeight(3).bottom2,
          iconBoxStyle: lampModalProp.iconBoxStyle,
          iconProp,
          icon: lampIcon,
          onMaskPress: () => onMaskPress(3),
        })(Child)}
    </View>
  );
};

Main.defaultProps = {
  modalStartPoint: cx(200),
  iconSpace: cx(12),
  timeout: 10 * 1000,
  searchIcon: icons.home_search,
  ringIcon: icons.home_ring,
  lampIcon: icons.home_lamp,
  successIcon: icons.home_search_success,
};

export default Main;

const styles = StyleSheet.create({
  btnView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});
