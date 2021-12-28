/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Platform } from 'react-native';
import { GlobalToast, Modal, TYSdk, TYText, Utils } from 'tuya-panel-kit';
import { useDebounceFn } from 'ahooks';
import { lampApi } from '@tuya/tuya-panel-api';
import SingleTimePicker from '../../../time/single-time-picker';
import {
  colourFormat,
  dataSource,
  parseJSON,
  repeatArrStr,
  weeksStr,
  actionTypeStr,
  SupportUtils,
  WORK_MODE,
} from '../../../../utils';
import Strings from '../i18n';
import CustomTopBar from '../components/CustomTopBar';
import { IAddTimerProps, IActionValue, defaultProps } from './interface';
import Row from '../components/Row';
import dpCodes from '../../../../utils/dpCodes';
import { defaultPickerStyle } from '../timer/interface';

const { addTimer, removeCloudTimer, updateTimer } = lampApi.timingApi;
const { colourCode, powerCode, temperatureCode, brightCode, workModeCode } = dpCodes;
const {
  RatioUtils: { convertX: cx, winWidth },
} = Utils;

const AddTimer: React.FC<IAddTimerProps> = props => {
  const { navigation, route } = props;
  const {
    isAdd = true,
    currTimerData = {
      ...defaultProps.currTimerData,
      workMode: SupportUtils.isSupportWhite() ? WORK_MODE.WHITE : WORK_MODE.COLOUR,
    },
    timerId = '',
    useNavigation = true,
    checkConflict = 1,
    category = 'category_timer',
    is24Hour = false,
    singleTimePickerStyle = defaultPickerStyle,
    rowStyle = defaultProps.rowStyle,
    weekOptionStyle = defaultProps.weekOptionStyle,
    themeColor = '#1082fe',
    fontColor = '#626982',
    backgroundColor = '#fff',
    weeksRouter, // custom weeks
    openLampRouter, // open lamp
    onSave,
    customAddTimerSave,
    customAddTimerBack,
    customAddTimerDelete,
    customWeeksRouter,
    customOenLampRouter,
  } = route.params;
  const [initData, setInitData] = useState(() => {
    const currHour = new Date().getHours();
    const currMinute = new Date().getMinutes();
    let stateObj = {
      hour: currHour,
      minute: currMinute,
      weeks: [0, 0, 0, 0, 0, 0, 0, 0],
      weeksType: weeksStr.dayOnce, // 仅一次
    };
    if (!isAdd) {
      const { weeks, hour, minute } = currTimerData;
      let num = 0;
      weeks.forEach((item: number) => {
        if (item === 1) {
          num += 1;
        }
      });
      stateObj = {
        hour,
        minute,
        weeks,
        weeksType: num === 0 ? weeksStr.dayOnce : num === 7 ? weeksStr.dayEvery : weeksStr.custom,
      };
    }
    return stateObj;
  });
  const [actionData, setActionData] = useState(() => {
    const { hue, saturation, value, brightness, temperature } = currTimerData;
    const workMode = isAdd
      ? SupportUtils.isSupportColour()
        ? WORK_MODE.COLOUR
        : WORK_MODE.WHITE
      : currTimerData.workMode;
    const dpPowerValue = isAdd ? false : currTimerData.dpPowerValue;
    const isColour =
      !(currTimerData.temperature || currTimerData.brightness) && workMode === WORK_MODE.COLOUR;
    return {
      actionStr: dpPowerValue ? '0' : '1',
      dpPowerValue,
      workMode,
      hue,
      saturation: isColour && dpPowerValue ? saturation : 1000,
      value: isColour && dpPowerValue ? value : 1000,
      temperature: !isColour && dpPowerValue ? temperature : 500,
      brightness: !isColour && dpPowerValue ? brightness : 1000,
    };
  });
  const [actionVisible, setActionVisible] = useState(false);
  const [weeksVisible, setWeeksVisible] = useState(false);

  const { run: handleSave } = useDebounceFn(
    () => {
      TYSdk.mobile.showLoading();
      const { hour, minute, weeks } = initData;
      const {
        workMode,
        hue,
        saturation,
        value,
        brightness,
        temperature,
        dpPowerValue,
      } = actionData;
      const weeksArr = [...weeks];
      weeksArr.pop();
      const loopStr = weeksArr.join('');
      const powerDpId = TYSdk.device.getDpIdByCode(powerCode);
      const workModeDpId = TYSdk.device.getDpIdByCode(workModeCode);
      const brightDpId = TYSdk.device.getDpIdByCode(brightCode);
      const temperatureDpId = TYSdk.device.getDpIdByCode(temperatureCode);
      const colourDpId = TYSdk.device.getDpIdByCode(colourCode);

      const dps: any = {
        [powerDpId]: dpPowerValue,
      };
      if (dpPowerValue) {
        dps[workModeDpId] = workMode;
        switch (workMode) {
          case WORK_MODE.WHITE:
            dps[brightDpId] = brightness;
            dps[temperatureDpId] = temperature;
            break;
          case WORK_MODE.COLOUR:
            dps[colourDpId] = colourFormat({ hue, saturation, value });
            break;
          default:
            break;
        }
      }
      const params = {
        category,
        loops: loopStr,
        instruct: [
          {
            dps,
            time: `${hour}:${minute}`,
          },
        ],
        aliasName: '',
        isAppPush: false,
        options: {
          checkConflict,
        },
      };
      const success = (text: string) => {
        successFun(text);
        if (onSave) {
          onSave();
          if (useNavigation) {
            navigation.goBack();
          } else {
            // @ts-ignore
            TYSdk.Navigator.pop();
          }
        } else {
          customAddTimerSave!();
        }
      };
      if (isAdd) {
        addTimer({
          ...params,
        }).then(() => success('TYLamp_setting_success'), errorFun);
      } else {
        updateTimer({
          groupId: timerId,
          ...params,
        }).then(() => success('TYLamp_setting_success'), errorFun);
      }
    },
    {
      wait: 500,
      leading: true,
      trailing: false,
    }
  );

  const handleDelete = async () => {
    TYSdk.mobile.showLoading();
    try {
      await removeCloudTimer(timerId, category);
      successFun('TYLamp_delete_success');
    } catch (error) {
      errorFun(error);
    }
    if (onSave) {
      onSave();
      if (useNavigation) {
        navigation.goBack();
      } else {
        // @ts-ignore
        TYSdk.Navigator.pop();
      }
    } else {
      customAddTimerDelete!();
    }
  };

  const successFun = (text: string) => {
    TYSdk.mobile.hideLoading();
    GlobalToast.show({
      text: Strings.getLang(text as any),
      // @ts-ignore
      onFinish: () => {
        GlobalToast.hide();
      },
    });
  };

  const errorFun = (response: any) => {
    const err = parseJSON(response);
    TYSdk.mobile.simpleTipDialog(err.message || err.errorMsg, () => {});
    TYSdk.mobile.hideLoading();
  };
  const handleTimerPickerChange = (hour: number, minute: number) => {
    setInitData(s => ({ ...s, hour, minute }));
  };

  const handleSelectWeek = (data: number[]) => {
    let num = 0;
    data.forEach(item => {
      if (item === 1) {
        num += 1;
      }
    });
    setInitData({
      ...initData,
      weeks: data,
      weeksType: num === 0 ? weeksStr.dayOnce : num === 7 ? weeksStr.dayEvery : weeksStr.custom,
    });
    setWeeksVisible(false);
  };

  const handleSelectWeeks = (valueStr: weeksStr) => {
    const arr = new Array(8).fill(0);
    // 获取当前周期
    const newWeeks = {
      '0': arr,
      '1': [1, 1, 1, 1, 1, 1, 1, 0],
      '2': initData.weeks,
    };
    if (valueStr === weeksStr.custom) {
      const { weeks } = initData;
      // 自定义周期
      const data = {
        useNavigation,
        weeks,
        weekOptionStyle,
        themeColor,
        backgroundColor,
        fontColor,
        onChange: handleSelectWeek,
      };
      if (useNavigation) {
        navigation.push(onSave ? weeksRouter! : customWeeksRouter!, {
          ...data,
        });
      } else {
        // @ts-ignore
        TYSdk.Navigator.push({
          id: onSave ? weeksRouter! : customWeeksRouter!,
          ...data,
        });
      }
    }
    setInitData({
      ...initData,
      weeksType: valueStr,
      weeks: newWeeks[valueStr],
    });
    setWeeksVisible(false);
  };

  const handleOpenSave = ({
    hue,
    saturation,
    value,
    temperature,
    brightness,
    workMode,
  }: IActionValue) => {
    setActionData(s => ({
      ...s,
      hue,
      saturation,
      value,
      temperature,
      brightness,
      workMode,
    }));
  };

  const handleSelectAction = (valueStr: string) => {
    if (valueStr === '0') {
      // 去其他页面
      if (useNavigation) {
        navigation.push(onSave ? openLampRouter! : customOenLampRouter!, {
          handleOpenSave,
        });
      } else {
        // @ts-ignore
        TYSdk.Navigator.push({
          id: onSave ? openLampRouter! : customOenLampRouter!,
          handleOpenSave,
        });
      }
      setActionData({ ...actionData, dpPowerValue: true });
    } else {
      setActionData({ ...actionData, dpPowerValue: false });
    }
    setActionVisible(false);
  };

  const handleBack = () => {
    if (onSave) {
      if (useNavigation) {
        navigation.goBack();
      } else {
        // @ts-ignore
        TYSdk.Navigator.pop();
      }
    } else {
      customAddTimerBack && customAddTimerBack();
    }
  };
  const { hour, minute, weeks, weeksType } = initData;
  return (
    <View style={{ flex: 1, backgroundColor }}>
      <CustomTopBar
        title={isAdd ? Strings.getLang('TYLamp_addTimer') : Strings.getLang('TYLamp_editTimer')}
        themeColor={themeColor}
        onSave={handleSave}
        onBack={handleBack}
      />
      <SingleTimePicker
        pickerStyle={[styles.timerPicker, singleTimePickerStyle.pickerStyle]}
        {...singleTimePickerStyle}
        hour={hour}
        minute={minute}
        is24Hour={is24Hour}
        onChange={handleTimerPickerChange}
      />
      <View style={[styles.setting, rowStyle]}>
        <Row
          fontColor={fontColor}
          label={Strings.getLang('TYLamp_action')}
          value={actionTypeStr(actionData.dpPowerValue, actionData.workMode)}
          onPress={() => setActionVisible(true)}
        />
      </View>
      <View style={[styles.setting, rowStyle]}>
        <Row
          fontColor={fontColor}
          label={Strings.getLang('TYLamp_cycle')}
          value={repeatArrStr(weeks)}
          onPress={() => setWeeksVisible(true)}
        />
      </View>
      {!isAdd && (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={handleDelete}
          style={[styles.button, rowStyle]}
        >
          <TYText style={styles.btnText}>{Strings.getLang('TYLamp_delete')}</TYText>
        </TouchableOpacity>
      )}

      <Modal.List
        visible={weeksVisible}
        type="radio"
        dataSource={dataSource}
        title={Strings.getLang('TYLamp_repeat')}
        value={weeksType}
        cancelText={Strings.getLang('TYLamp_cancel')}
        onMaskPress={() => setWeeksVisible(false)}
        onSelect={handleSelectWeeks}
        onCancel={() => setWeeksVisible(false)}
        footerType="singleCancel"
      />
      <Modal.List
        visible={actionVisible}
        type="radio"
        dataSource={[
          {
            key: '0',
            title: Strings.getLang('TYLamp_on'),
            value: '0',
          },
          {
            key: '1',
            title: Strings.getLang('TYLamp_off'),
            value: '1',
          },
        ]}
        title={Strings.getLang('TYLamp_repeat')}
        value={actionData.actionStr}
        cancelText={Strings.getLang('TYLamp_cancel')}
        onMaskPress={() => setActionVisible(false)}
        onSelect={handleSelectAction}
        onCancel={() => setActionVisible(false)}
        footerType="singleCancel"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnText: {
    color: '#E35F5F',
    fontSize: cx(16),
  },
  button: {
    alignItems: 'center',
    borderRadius: Math.round(cx(16)),
    flexDirection: 'row',
    height: cx(70),
    justifyContent: 'center',
    marginHorizontal: cx(24),
    marginTop: cx(16),
    overflow: 'hidden',
    width: winWidth - cx(48),
  },
  setting: {
    borderRadius: Math.round(cx(16)),
    height: cx(70),
    justifyContent: 'center',
    marginHorizontal: cx(24),
    marginTop: cx(16),
    overflow: 'hidden',
  },

  timerPicker: {
    marginTop: cx(24),
  },
});

export default AddTimer;
