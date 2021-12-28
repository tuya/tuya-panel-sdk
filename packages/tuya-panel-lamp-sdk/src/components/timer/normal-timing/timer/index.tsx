/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from 'react';
import { TYSdk, TYText, Utils } from 'tuya-panel-kit';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { lampApi } from '@tuya/tuya-panel-api';
import {
  ITimerProps,
  TimerData,
  defaultProps,
  ITimerList,
  ICloudTimerList,
  defaultPickerStyle,
} from './interface';
import Strings from '../i18n/index';
import { colourParse, WORK_MODE, SupportUtils } from '../../../../utils';
import TimerList from './list';
import AddButton from '../components/AddButton';
import dpCodes from '../../../../utils/dpCodes';

const { getCategoryTimerList } = lampApi.timingApi;

const { colourCode, powerCode, temperatureCode, brightCode, workModeCode } = dpCodes;
const { parseJSON } = Utils.JsonUtils;
const { convertX: cx, winWidth } = Utils.RatioUtils;

const TYMobile = TYSdk.mobile;

const Timer: React.FC<ITimerProps> = props => {
  const {
    route: {
      params: { themeConfig, timerConfig },
    },
    navigation,
  } = props;
  const {
    noTimerTintColor = 'rgba(0,0,0,0.3)',
    rowStyle = defaultProps.rowStyle,
    weekOptionStyle = defaultProps.weekOptionStyle,
    switchOptionStyle = defaultProps.switchOptionStyle,
    themeColor = '#1082fe',
    fontColor = '#626982',
    backgroundColor = '#fff',
    scrollViewContentStyle = {},
    timerStyle = {},
    singleTimePickerStyle = defaultPickerStyle,
  } = themeConfig;
  const {
    useNavigation = true,
    is24Hour = false,
    limit = 30,
    checkConflict = 1,
    category = 'category_timer',
    weeksRouter,
    addTimerRouter,
    openLampRouter,
    customAddTimer,
    renderAddButtonElement,
    renderHeaderElement,
    renderSwipeDelElement,
  } = timerConfig;
  const [cloudTimerList, setCloudTimerList] = useState<ICloudTimerList[]>([]);

  useEffect(() => {
    getTimerList();
  }, []);

  const getTimerList = async () => {
    TYMobile.showLoading();
    const handleError = (response: any) => {
      const err: any = parseJSON(response);
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      TYMobile.simpleTipDialog(err.message || err.errorMsg, () => {});
    };
    let timerList: ITimerList[] = [];

    try {
      const timers = await getCategoryTimerList(category);
      timerList = [...(timers.groups || [])];
    } catch (error) {
      handleError(error);
    } finally {
      TYMobile.hideLoading();
    }
    setCloudTimerList(formatCloudData(timerList));
  };

  const formatCloudData = (timerList: ITimerList[]) => {
    const repeat = 0;
    const formattedData = timerList.map((item, index) => {
      const timerId = item.id;
      const timer = item.timers[0];
      const timeStr = timer.time;
      const hour = +timeStr.split(':')[0];
      const minute = +timeStr.split(':')[1];
      let repeatStr = '';
      if (repeat === 0) {
        repeatStr = timer.loops.toString();
      }
      const repeatArr = repeatStr.split('').map(i => +i);
      const weeks = [...repeatArr, 0];
      const powerDpId = TYSdk.device.getDpIdByCode(powerCode);
      const workModeDpId = TYSdk.device.getDpIdByCode(workModeCode);
      const brightDpId = TYSdk.device.getDpIdByCode(brightCode);
      const temperatureDpId = TYSdk.device.getDpIdByCode(temperatureCode);
      const colourDpId = TYSdk.device.getDpIdByCode(colourCode);

      const { dps } = timer;
      const result = {
        dpPowerValue: dps[powerDpId],
        workMode: SupportUtils.isSupportWhite() ? WORK_MODE.WHITE : WORK_MODE.COLOUR,
        hue: 0,
        saturation: 0,
        value: 0,
        temperature: 0,
        brightness: 0,
      };
      if (dps[powerDpId]) {
        result.workMode = dps[workModeDpId];
        switch (dps[workModeDpId]) {
          case WORK_MODE.COLOUR:
            // eslint-disable-next-line no-case-declarations
            const { hue, saturation, value } = colourParse(dps[colourDpId]);
            result.hue = hue;
            result.saturation = saturation;
            result.value = value;
            break;
          case WORK_MODE.WHITE:
            result.brightness = dps[brightDpId];
            result.temperature = dps[temperatureDpId];
            break;
          default:
            break;
        }
      }
      return {
        timerId,
        status: !!timer.status,
        hour,
        minute,
        weeks,
        ...result,
        key: `timer_${index}`,
        type: 'timer',
        index,
      };
    });
    return formattedData;
  };

  const handleEditItem = (item: TimerData) => {
    if (addTimerRouter) {
      const data = {
        timerId: item.timerId,
        isAdd: false,
        category,
        currTimerData: item,
        is24Hour,
        weeksRouter,
        openLampRouter,
        useNavigation,
        rowStyle,
        weekOptionStyle,
        themeColor,
        fontColor,
        backgroundColor,
        limit,
        checkConflict,
        singleTimePickerStyle,
        onSave: () => {
          getTimerList();
        },
      };
      if (useNavigation) {
        navigation.push(addTimerRouter, {
          ...data,
        });
      } else {
        // @ts-ignore
        TYSdk.Navigator.push({
          id: addTimerRouter,
          ...data,
        });
      }
    } else {
      // 用户自己处理
      customAddTimer!(false, item, is24Hour);
    }
  };

  const handleAddList = () => {
    if (cloudTimerList.length >= limit) {
      TYSdk.mobile.simpleTipDialog(Strings.getLang('TYLamp_dpToMuchWarning'), () => {});
    }
    if (addTimerRouter) {
      const data = {
        isAdd: true,
        category,
        is24Hour,
        weeksRouter,
        openLampRouter,
        useNavigation,
        rowStyle,
        weekOptionStyle,
        themeColor,
        fontColor,
        backgroundColor,
        limit,
        checkConflict,
        singleTimePickerStyle,
        onSave: () => {
          getTimerList();
        },
      };
      if (useNavigation) {
        navigation.push(addTimerRouter, {
          ...data,
        });
      } else {
        // 使用老路由
        // @ts-ignore
        TYSdk.Navigator.push({
          id: addTimerRouter,
          ...data,
        });
      }
    } else {
      // 用户自定义跳转
      customAddTimer!(true, [], is24Hour);
    }
  };

  const handleListHeader = () => {
    return <TYText style={styles.TopText}>{Strings.getLang('TYLamp_timerWarning')}</TYText>;
  };

  return (
    <View style={styles.flex1}>
      <View style={[styles.scroll, scrollViewContentStyle]}>
        {/* 定时列表 */}
        <TimerList
          noTimerTintColor={noTimerTintColor}
          themeColor={themeColor}
          fontColor={fontColor}
          backgroundColor={backgroundColor}
          timerList={cloudTimerList}
          is24Hour={is24Hour}
          category={category}
          onGetCloudTimerList={getTimerList}
          onEditItem={handleEditItem}
          timeStyle={timerStyle}
          switchOptionStyle={switchOptionStyle}
          renderSwipeDelElement={renderSwipeDelElement}
          listHeaderComponent={renderHeaderElement ? renderHeaderElement() : handleListHeader()}
        />
      </View>
      {/* 添加定时按钮 */}
      {renderAddButtonElement ? (
        <TouchableOpacity onPress={handleAddList}>{renderAddButtonElement()}</TouchableOpacity>
      ) : (
        <AddButton handleAdd={handleAddList} addBtnTintColor={themeColor} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  TopText: {
    color: '#000',
    fontSize: cx(14),
    height: cx(40),
    marginLeft: cx(24),
    paddingVertical: cx(20),
  },
  flex1: {
    flex: 1,
    width: winWidth,
  },
  scroll: {
    flex: 1,
  },
});

export default Timer;
