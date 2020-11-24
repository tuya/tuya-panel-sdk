/* eslint-disable indent */
/* eslint-disable no-param-reassign */
/* eslint-disable new-cap */
/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import _get from 'lodash/get';
import * as React from 'react';
import { View, TouchableOpacity, ScrollView, StatusBar, StyleSheet, Image } from 'react-native';
import { TYSdk, Utils, Popup } from '@tuya-rn/tuya-native-components';
import { AppointedCleaning as Appointed } from '../../../../protocol/ledong';
import SettingsSectionList from '../../../../components/Basic/SettingsSectionList';
// import {
//   dpCodesEnum,
//   dpCodesValueEnum,
// } from "@src/laser-sweep-map-ledong/constant/dpCodes";

// import Map from "./map";

// import Dialog from '../../dialog';
// import Popup from '../../popup';
import Repeat from './repeat';
import GetTimerList from '../timer/getTimerList';
import RepeatCircle from './repeatCircle';
import { timer } from '../theme';
import { TopBar } from '../components';
import { addTimer, updateTimer } from '../api';
// @ts-ignore
import Strings from '../i18n';
import I18n from '../../../../i18n';
// import Res from '@Res';
import { parseHour12, GetRepeatStr } from '../utils';
import { ITimerData, IAddTimerProps, IDpDic, IRowProps, ITheme, IRowConfirm } from './interface';
import {
  StyledContainer,
  StyledCell,
  StyledTitle,
  StyledSubTitle,
  StyledIcon,
  StyledDivider,
  StyledTimeZone,
  StyledTimeZoneHeader,
  StyledTimeZoneItem,
  StyledTimeZoneText,
  StyledTimeZoneTitle,
  StyledTimeZoneSymbol,
  StyledTimerPointPicker,
  StyledTimerRangePicker,
  StyledNoticeItem,
} from './style';
import _round from 'lodash/round';
import _isEmpty from 'lodash/isEmpty';


const timerList = new GetTimerList();
const { parseJSON } = Utils.JsonUtils;
const { convertX: cx, convertY: cy, viewWidth } = Utils.RatioUtils;

class AddTimer extends React.Component<IAddTimerProps, any> {
  tempTime: string;
  showItemArr: ITimerData[] = [];
  map: any;
  constructor(props: IAddTimerProps) {
    super(props);
    let time = _round(new Date().getTime() / 1000);

    let suckValue = props.laserMapConfig?.timer?.fan?.enumValues[0] || '';
    let waterValue = props.laserMapConfig?.timer?.water?.enumValues[0] || '';
    let cleanModeValue = props.laserMapConfig?.timer?.cleanMode?.enumValues[0] || '';

    let status = true;
    let roomTagIds = [];
    let mode = 'smart';

    if (props.isEdit) {
      // 编辑
      const { originalData } = props.dataSource[props.index];
      time = originalData.timestamp;

      originalData.workNoisy !== undefined && (suckValue = originalData.workNoisy);
      originalData.waterPump !== undefined && (waterValue = `${originalData.waterPump}`);
      originalData.cleanMode !== undefined && (cleanModeValue = `${originalData.cleanMode}`);

      status = originalData.unlock;
      roomTagIds = originalData.segmentTagIds;
      mode = roomTagIds.length ? 'selectedRoom' : 'smart';
    }

    const repeatValue = props.isEdit
      ? props.dataSource[props.index].repeatStr || '0000000'
      : '0000000';
    const repeatContent = GetRepeatStr(repeatValue);
    this.tempTime = time;
    this.state = {
      repeatSelected: repeatValue,
      // dpData: dpDic,
      repeatContent,
      time,
      suckValue, // 吸力
      waterValue, // 水箱
      cleanModeValue, // 工作模式
      status, // 开关
      mode, // 地图模式
      roomTagIds, // 选区
    };
  }

  get theme() {
    const theme = this.props.theme ? { timer: this.props.theme } : {};
    return theme;
  }

  save = async () => {
    const {
      laserMapConfig: {
        timer: { fan, water, cleanMode },
      },
      dataSource,
      mute,
      index,
    } = this.props;

    const {
      time,
      repeatSelected,
      suckValue,
      waterValue,
      cleanModeValue,
      status,
      roomTagIds,
    } = this.state;

    const extendsData = [];

    dataSource.forEach((item, i) => {
      if (index !== i && item.originalData) extendsData.push(item.originalData);
    });
    if (!_isEmpty(mute)) extendsData.push(mute);

    const cmd = Appointed.encode({
      startTime: time,
      // unlock: status,
      unlock: true,
      loops: repeatSelected,
      roomIds: roomTagIds,
      suck: cleanModeValue !== fan.disableWithCleanMode ? suckValue : undefined,
      water: cleanModeValue !== water.disableWithCleanMode ? waterValue : undefined,
      cleanMode: cleanModeValue,
      extendsData,
    });
    TYSdk.mobile.showLoading();
    await timerList.putTimerList(cmd);

    TYSdk.mobile.hideLoading();
    this.props.navigator.pop();
  };

  confirmTime = () => {
    this.setState({ time: this.tempTime });
    // @ts-ignore
    Popup.close();
  };

  onRepeatSelect = (value: string) => {
    this.setState({
      repeatSelected: value,
      repeatContent: GetRepeatStr(value),
    });
  };

  onRepeatPress = () => {
    const { theme, repeatRouter } = this.props;
    if (!repeatRouter) {
      // @ts-ignore
      Popup.custom({
        title: Strings.getLang('repeat'),
        cancelText: Strings.getLang('cancel'),
        confirmText: Strings.getLang('confirm'),
        content: <Repeat selected={this.state.repeatSelected} onSelect={this.onRepeatSelect} />,
        onConfirm: () => {
          this.onRepeatSelect(this.state.repeatSelected);
          // @ts-ignore
          Popup.close();
        },
      });
      return;
    }
    this.props.navigator.push({
      id: repeatRouter,
      hideTopbar: true,
      title: Strings.getLang('repeat'),
      theme,
      repeat: this.state.repeatSelected,
      onRepeatChange: (repeat: any) => {
        this.setState({
          repeatSelected: repeat,
          repeatContent: GetRepeatStr(repeat),
        });
      },
    });
  };
  onMapPress = () => {
    const { theme, laserMapConfig } = this.props;
    const { mode, roomTagIds } = this.state;

    this.props.navigator.push({
      id: 'EidtMapTimerCustomTimer',
      hideTopbar: true,
      title: Strings.getLang('selectCleanMode'),
      // repeat: this.state.repeatSelected,
      laserMapConfig,
      mode,
      roomTagIds,
      disabled: !roomTagIds.length,
      onChange: (mapInfo: any) => {
        console.warn('mapInfo', mapInfo);

        this.setState({
          roomTagIds: mapInfo.roomTags,
          mode: mapInfo.mode,
        });
      },
    });
  };

  renderHeader = () => {
    const { isEdit, navigator } = this.props;
    return (
      <TopBar
        title={Strings.getLang(isEdit ? 'editTimer' : 'addTimer')}
        leftActions={[
          {
            accessibilityLabel: 'TopBar_Btn_Back',
            contentStyle: { fontSize: 16 },
            source: Strings.getLang('cancel'),
            onPress: navigator.pop,
          },
        ]}
        actions={[
          {
            accessibilityLabel: 'TopBar_Btn_Save',
            contentStyle: { fontSize: 16 },
            source: Strings.getLang('save'),
            onPress: this.save,
          },
        ]}
      />
    );
  };

  handlePopupList = (key: string, value: string, range: string[], i18nTitle: string) => {
    const dataSource = range.map(value => ({
      key: value,
      title: I18n.getLang(`${i18nTitle}_${value}`),
      value,
    }));
    Popup.list({
      dataSource,

      title: I18n.getLang(`${i18nTitle}`),
      value,
      footerType: 'singleCancel',
      cancelText: I18n.getLang('cancel'),
      type: 'radio',
      onSelect: (v: string) => {
        this.setState({ [key]: v });
        Popup.close();
      },
    });
  };

  renderDatePicker = () => {
    const { is12Hours, isPickerAlignCenter, loop } = this.props;
    const date = new Date(Number(`${this.state.time}000`));

    return (
      <StyledTimerPointPicker
        is12Hours={is12Hours}
        loop={loop}
        hour={date.getHours()}
        minute={date.getMinutes()}
        singlePicker={true}
        onTimerChange={(value: number) => {
          console.warn('onTimerChange', value, Appointed.minToStartTimeUnix(value));

          this.setState({ time: Appointed.minToStartTimeUnix(value) });
        }}
      />
    );
  };

  get dataList() {
    const {
      laserMapConfig: {
        timer: { fan, water, cleanMode },
      },
    } = this.props;
    return [
      {
        data: [
          {
            key: 'repeat',
            title: Strings.getLang('repeat'),
            value: this.state.repeatContent,
            onPress: this.onRepeatPress,
            arrow: true,
          },
          {
            key: 'timer_cleanMode',
            title: I18n.getLang('timer_cleanMode'),
            value: I18n.getLang(`timer_cleanMode_${this.state.cleanModeValue}`),
            onPress: () => {
              this.handlePopupList(
                'cleanModeValue',
                this.state.cleanModeValue,
                cleanMode.enumValues,
                'timer_cleanMode'
              );
            },
            arrow: true,
            visible: cleanMode.isShow,
          },
          {
            key: 'timer_fan',
            title: I18n.getLang('timer_fan'),
            value: I18n.getLang(`timer_fan_${this.state.suckValue}`),
            onPress: () => {
              this.handlePopupList('suckValue', this.state.suckValue, fan.enumValues, 'timer_fan');
            },
            arrow: true,
            visible: fan.isShow,
            disabled: this.state.cleanModeValue === fan.disableWithCleanMode,
            actionDisabled: this.state.cleanModeValue === fan.disableWithCleanMode,
          },
          {
            key: 'timer_water',
            title: I18n.getLang('timer_water'),
            value: I18n.getLang(`timer_water_${this.state.waterValue}`),
            onPress: () => {
              this.handlePopupList(
                'waterValue',
                this.state.waterValue,
                water.enumValues,
                'timer_water'
              );
            },
            arrow: true,
            visible: water.isShow,
            disabled: this.state.cleanModeValue === water.disableWithCleanMode,
            actionDisabled: this.state.cleanModeValue === water.disableWithCleanMode,
          },
          {
            key: 'chooseLocation',
            title: Strings.getLang('chooseLocation'),
            value: Strings.getLang(`${this.state.mode}`),
            onPress: this.onMapPress,
            arrow: true,
          },
        ],
      },
    ];
  }

  render() {
    return (
      <StyledContainer>
        <StatusBar barStyle={timer.statusBgStyle} />
        {this.renderHeader()}
        <StyledContainer style={{ marginTop: cy(16) }}>
          {this.renderDatePicker()}
          <SettingsSectionList sections={this.dataList} />
        </StyledContainer>
      </StyledContainer>
    );
  }
}

export default AddTimer;

const styles = StyleSheet.create({
  popupList: {
    position: 'absolute',
    textAlign: 'center',
  },
  popupListDisable: {
    position: 'absolute',
    textAlign: 'center',
    color: 'rgba(0,0,0,0.5)',
  },
  disable: {
    opacity: 0.5,
  },
  btnStyle: {
    flex: 1,
    // opacity: 0.5,
  },
  cell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  cellText: {
    color: '#000',
    fontSize: cy(12),
    maxWidth: viewWidth - cy(100),
    textAlign: 'center',
    flex: 0,
  },
});
