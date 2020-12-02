// 放置一些特殊的页面级别的组件
/* eslint-disable react/no-array-index-key */
/* eslint-disable indent */

import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import {
  BatteryStats,
  BatteryCharge,
  Timer,
  TimerClassic,
  TimerSpring,
  CountryList,
  Popup,
} from 'tuya-panel-kit';
// import {
//   FullRoomTimer,
//   WeeklyTiming,
//   VoiceAssistant,
// } from '@tuya-rn/tuya-native-fullroom-elements';
// import { CbtTimer, CbtCountdown } from '@tuya-rn/tuya-native-cbt-elements';
// import { SwitchLog, EleSetting, GroupTimer } from '@tuya-rn/tuya-native-electrician-elements';
import { Navigator } from 'react-native-deprecated-custom-components';
import TYSdk from '../api';
import Strings from '../i18n';
import { themeDark } from './theme';

const batteryStatsRouters = [
  {
    id: 'Basic.BatteryStats',
    Scene: BatteryStats.EleStats,
    // props pass to EleStats
    onPress: () => {
      TYSdk.Navigator.push({
        id: 'Basic.BatteryStats',
        dpId: +TYSdk.device.getDpIdByCode('add_ele'),
        title: Strings['Basic.BatteryStats'] || 'Basic.BatteryStats',
        chartRoute: 'BatteryStatsChart',
        type: 'dark',
        theme: { fontColor: '#000', themeColor: 'blue' },
        isNeedChange: true,
        needChangeKey: {
          curCurrent: 'cur_current',
          curPower: 'cur_power',
          curVoltage: 'cur_voltage',
        },
      });
    },
  },
  {
    id: 'BatteryStatsChart',
    Scene: BatteryStats.EleChart,
  },
];

const batteryChargeRouters = [
  {
    id: 'Basic.BatteryCharge.Basic',
    Scene: BatteryCharge.EleStats,
    // props pass to EleStats
    onPress: () => {
      TYSdk.Navigator.push({
        id: 'Basic.BatteryCharge.Basic',
        hideTopbar: true, // 电费统计需要定制头部栏
        dpId: +TYSdk.device.getDpIdByCode('add_ele'),
        title: Strings['Basic.BatteryCharge'] || 'Basic.BatteryCharge',
        chartRoute: 'BatteryChargeChart',
        type: 'light',
        theme: { fontColor: '#000', themeColor: 'blue' },
        isNeedChange: true,
        needChangeKey: {
          curCurrent: 'cur_current',
          curPower: 'cur_power',
          curVoltage: 'cur_voltage',
        },
      });
    },
  },
  {
    id: 'Basic.BatteryCharge.Charge',
    Scene: BatteryCharge.EleStats,
    // props pass to EleStats
    onPress: () => {
      TYSdk.Navigator.push({
        id: 'Basic.BatteryCharge.Charge',
        hideTopbar: true, // 电费统计需要定制头部栏
        dpId: +TYSdk.device.getDpIdByCode('add_ele'),
        title: Strings['Basic.BatteryCharge'] || 'Basic.BatteryCharge',
        chartRoute: 'BatteryChargeChart',
        chargeRoute: 'BatteryChargeCharge',
        isSupportCharge: true,
        type: 'light',
        theme: { fontColor: '#000', themeColor: 'blue' },
        isNeedChange: true,
        needChangeKey: {
          curCurrent: 'cur_current',
          curPower: 'cur_power',
          curVoltage: 'cur_voltage',
        },
      });
    },
  },
  {
    id: 'BatteryChargeCharge',
    Scene: BatteryCharge.EleCharge,
  },
  {
    id: 'BatteryChargeChart',
    Scene: BatteryCharge.EleChart,
  },
];

const countryListRouters = [
  {
    id: 'Basic.CountryList',
    Scene: CountryList,
  },
];

// TODO dpType timer
const timerRouters = [
  /**
   * Basic Config
   * -------------------------------------------------------------------------------------
   * -------------------------------------------------------------------------------------
   */
  {
    id: 'Basic.Timer.Basic',
    Scene: Timer.Timer,
    // props pass to Timer
    routeProps: {
      hideTopbar: true,
      is12Hours: true,
      timerConfig: {
        isAppPush: true,
        addTimerRouter: 'addTimerBasic',
        repeatRouter: 'repeat',
        category: 'rnTimerTest_Basic',
        repeat: 0,
        // 删除定时的动作是否都是侧滑
        // isBothSwipout: true,
        // loop: true,
        // limit: 5,
        data: [
          {
            dpId: 101,
            dpName: '开关1',
            selected: 0,
            rangeKeys: [true, false],
            rangeValues: [{ dpValue: '开' }, { dpValue: '关' }],
          },
          {
            dpId: 102,
            dpName: '灯光模式',
            selected: 0,
            rangeKeys: ['colour', 'white', 'gradient'],
            rangeValues: [{ dpValue: '彩光' }, { dpValue: '白光' }, { dpValue: '渐变' }],
          },
        ],
      },
    },
  },
  {
    id: 'addTimerBasic',
    Scene: Timer.AddTimer,
  },
  {
    id: 'repeat',
    Scene: Timer.Repeat,
  },

  // 自定义空白页面
  {
    id: 'Basic.Timer.renderEmptyPage',
    Scene: Timer.Timer,
    // props pass to Timer
    routeProps: {
      hideTopbar: true,
      is12Hours: true,
      // pushToAdd: 跳转至添加定时页面
      /* eslint-disable react/prop-types */
      renderEmptyPage: ({ pushToAdd }) => {
        return (
          <View
            style={{
              width: 375,
              height: 300,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              flex: 1,
            }}
          >
            <Text> No Timer Data</Text>
            <TouchableOpacity
              style={{
                marginTop: 40,
                width: 180,
                height: 54,
                borderRadius: 28,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => pushToAdd()}
              activeOpacity={0.8}
            >
              <Text>添加定时</Text>
            </TouchableOpacity>
          </View>
        );
      },
      timerConfig: {
        isAppPush: true,
        addTimerRouter: 'addTimerEmpty',
        repeatRouter: 'repeatEmpty',
        category: 'rnTimerTest_Basic',
        repeat: 0,
        data: [
          {
            dpId: 101,
            dpName: '开关1',
            selected: 0,
            rangeKeys: [true, false],
            rangeValues: [{ dpValue: '开' }, { dpValue: '关' }],
          },
          {
            dpId: 102,
            dpName: '灯光模式',
            selected: 0,
            rangeKeys: ['colour', 'white', 'gradient'],
            rangeValues: [{ dpValue: '彩光' }, { dpValue: '白光' }, { dpValue: '渐变' }],
          },
        ],
      },
    },
  },
  {
    id: 'addTimerEmpty',
    Scene: Timer.AddTimer,
  },
  {
    id: 'repeatEmpty',
    Scene: Timer.Repeat,
  },
  /**
   * TimeZone Config
   * -------------------------------------------------------------------------------------
   * -------------------------------------------------------------------------------------
   */
  {
    id: 'Basic.Timer.TimeZone',
    Scene: Timer.Timer,
    // props pass to Timer
    routeProps: {
      hideTopbar: true,
      is12Hours: true,
      theme: themeDark,
      timerConfig: {
        addTimerRouter: 'addTimerTimeZone',
        category: 'rnTimerTest_TimeZone',
        isTimeZone: true,
        timeZoneType: 'timerPicker',
        repeat: 0,
        data: [
          {
            dpId: 101,
            dpName: '开关1',
            selected: 0,
            rangeKeys: [true, false],
            rangeValues: [{ dpValue: '开' }, { dpValue: '关' }],
          },
          {
            dpId: 102,
            dpName: '灯光模式',
            selected: 0,
            rangeKeys: ['colour', 'white', 'gradient'],
            rangeValues: [{ dpValue: '彩光' }, { dpValue: '白光' }, { dpValue: '渐变' }],
          },
        ],
      },
    },
  },
  {
    id: 'addTimerTimeZone',
    Scene: Timer.AddTimer,
  },
  /**
   * SubItem Config
   * -------------------------------------------------------------------------------------
   * -------------------------------------------------------------------------------------
   */
  {
    id: 'Basic.Timer.SubItem',
    Scene: Timer.Timer,
    // props pass to Timer
    routeProps: {
      hideTopbar: true,
      timerConfig: {
        addTimerRouter: 'addTimerSubItem',
        category: 'rnTimerTest_SubItem',
        repeat: 0,
        isPickerAlignCenter: false,
        data: [
          {
            dpId: 101,
            dpName: '开关1',
            selected: 0,
            rangeKeys: [true, false],
            rangeValues: [{ dpValue: '开', subItem: '102' }, { dpValue: '关' }], // 选中`开`时，才会出现subItem
          },
          {
            dpId: 102,
            dpName: '灯光模式',
            selected: 0,
            rangeKeys: ['colour', 'white', 'gradient'],
            rangeValues: [{ dpValue: '彩光' }, { dpValue: '白光' }, { dpValue: '渐变' }],
            isSubItem: true,
          },
        ],
      },
    },
  },
  {
    id: 'addTimerSubItem',
    Scene: Timer.AddTimer,
  },

  {
    id: 'Basic.Timer.SpecailSubItem',
    Scene: Timer.Timer,
    // props pass to Timer
    routeProps: {
      hideTopbar: true,
      timerConfig: {
        addTimerRouter: 'addTimerSpecialSubItem',
        category: 'rnSpecialTimerTest_SubItem',
        repeat: 0,
        isPickerAlignCenter: false,
        // 参数分别为：
        // rowItem: 要自定义的当前dp栏所包含的信息；
        // index: 要自定义的当前dp栏在展示数组中的索引；
        // renderRow 渲染dp栏组件；
        // dpStateData： 定时组件内部的state里的数组实时更新；
        // onDpConfirm： 当前dp栏确认按钮回调,其包含{value: 选择的dp的value值, rowItem, dpStateData}；
        // showItemArr： 联动展示的定时dp数组
        renderDpItem: data => {
          const { rowItem, renderRow, dpStateData, onDpConfirm } = data;
          if (rowItem.dpId === 104) {
            console.log(data);
            return renderRow({
              onPress: () =>
                Popup.list({
                  dataSource: rowItem.rangeValues.map((data, idx) => ({
                    key: idx,
                    value: rowItem.rangeKeys[idx],
                    title: data.dpValue,
                  })),
                  value: rowItem.rangeKeys[rowItem.selected],
                  title: rowItem.dpName,
                  cancelText: Strings.getLang('cancel'),
                  confirmText: Strings.getLang('confirm'),
                  onConfirm: value => onDpConfirm({ value, rowItem, dpStateData }),
                }),
            });
          }
          return renderRow();
        },
        data: [
          {
            dpId: 101,
            dpName: '开关1',
            selected: 0,
            rangeKeys: [true, false],
            rangeValues: [{ dpValue: '开', subItem: ['102', '103'] }, { dpValue: '关' }], // 选中`开`时，才会出现subItem
          },
          {
            dpId: 102,
            dpName: '灯光模式',
            selected: 0,
            rangeKeys: ['colour', 'white', 'gradient'],
            rangeValues: [{ dpValue: '彩光' }, { dpValue: '白光' }, { dpValue: '渐变' }],
            isSubItem: true,
          },
          {
            dpId: 103,
            dpName: '增加电量',
            selected: 0,
            rangeKeys: [true, false],
            rangeValues: [{ dpValue: '开', subItem: '104' }, { dpValue: '关' }],
            isSubItem: true,
          },
          {
            dpId: 104,
            dpName: '当前电流',
            selected: 0,
            renderDp: {
              PopupType: 'list',
            },
            rangeKeys: ['0', '1', '2'],
            rangeValues: [{ dpValue: '0' }, { dpValue: '1' }, { dpValue: '2' }],
            isSubItem: true,
          },
        ],
      },
    },
  },
  {
    id: 'addTimerSpecialSubItem',
    Scene: Timer.AddTimer,
  },
];

const timerSpringRouters = [
  /**
   * Basic Config
   * -------------------------------------------------------------------------------------
   * -------------------------------------------------------------------------------------
   */
  {
    id: 'Basic.TimerSpring',
    Scene: TimerSpring.TimerList,
    // props pass to TimerSpring
    routeProps: {
      hideTopbar: true,
      type: 'default',
      no: 0,
      themeColor: '#00B294', // 必须传16进制， 便于拼接带透明度的背景color
      tintColor: '#FFFFFF',
      showSchedule: true,
      showAstronomicalSchedule: true,
      countdownCode: 'countdown',
      inchingCode: 'switch_inching',
      cycleTimerCode: 'cycle_time',
      randomTimerCode: 'random_time',
      addCycleTimerRouter: 'addTimerSpringCycle',
      addRandomTimerRouter: 'addTimerSpringRandom',
      addMap: 'updateTimerSpringMap',
      timerConfig: {
        addTimerRouter: 'addTimerSpringBasic',
        category: 'rnTimerTest_Spring',
        repeat: 0,
        data: [
          {
            dpId: 101,
            dpName: Strings.getDpLang('switch_1'),
            selected: 0,
            rangeKeys: [true, false],
            rangeValues: [
              { dpValue: Strings.getDpLang('switch_1', true) },
              { dpValue: Strings.getDpLang('switch_1', false) },
            ],
          },
        ],
      },
    },
  },
  {
    id: 'addTimerSpringBasic',
    Scene: TimerSpring.AddTimerSchedule,
  },
  {
    id: 'addTimerSpringCycle',
    Scene: TimerSpring.AddTimerCycle,
  },
  {
    id: 'addTimerSpringRandom',
    Scene: TimerSpring.AddTimerRandom,
  },
  {
    id: 'addTimerAstronomical',
    Scene: TimerSpring.AddTimerAstronomical,
  },
  {
    id: 'Basic.TimerSpringTest',
    Scene: TimerSpring.TimerList,
    // props pass to TimerSpring
    routeProps: {
      hideTopbar: true,
      type: 'default',
      no: 1,
      showSchedule: true,
      is12Hours: true,
      inchingCode: 'switch_inching',
      cycleTimerCode: 'cycle_time',
      randomTimerCode: 'random_time',
      addCycleTimerRouter: 'addTimerSpringCycle',
      addRandomTimerRouter: 'addTimerSpringRandom',
      timerConfig: {
        addTimerRouter: 'addTimerSpringBasic',
        category: 'rnTimerTest_Spring',
        repeat: 0,
        data: [
          {
            dpId: 101,
            dpName: Strings.getDpLang('switch_1'),
            selected: 0,
            rangeKeys: [true, false],
            rangeValues: [
              { dpValue: Strings.getDpLang('switch_1', true) },
              { dpValue: Strings.getDpLang('switch_1', false) },
            ],
          },
        ],
      },
    },
  },
  {
    id: 'updateTimerSpringMap',
    Scene: TimerSpring.MapTimerSpring,
  },
];

const timerClassicRouters = [
  {
    id: 'Basic.TimerClassic',
    Scene: TimerClassic.TimerList,
    // props pass to Timer
    routeProps: {
      hideTopbar: true,
      is12Hours: true,
      timerConfig: {
        dpId: 1,
        addTimerRouter: 'addClassicTimer',
        category: 'rnTimerTest_Classic',
        repeat: 0,
      },
    },
  },
  {
    id: 'addClassicTimer',
    Scene: TimerClassic.AddTimer,
  },
];

// const timerFullRoom = [
//   {
//     id: 'FullRoom.TimerClassic.Timer',
//     Scene: FullRoomTimer.Timer,
//     routeProps: {
//       title: Strings.getLang('schedule'),
//       selectIndex: 0, // 进入页面选中的开关 // 默认0
//       names: { switch_1: '开关1', switch_2: '开关2' },
//       switchCodes: ['switch_1', 'switch_2'],
//       rangeKeys: [true, false], // 每个开关定时执行项； 默认 [true, false]
//       timerConfig: {
//         addTimerRouter: 'addTimer',
//       },
//     },
//   },
//   {
//     id: 'addTimer',
//     Scene: FullRoomTimer.AddTimer,
//     routeProps: {
//       title: Strings.getLang('addTimer'),
//     },
//   },
// ];

// const countdownCbt = [
//   {
//     id: 'Cbt.CbtCountdownClassic.CbtCountdown',
//     Scene: CbtCountdown,
//     routeProps: {
//       hideTopbar: true,
//       sceneConfigs: {
//         ...Navigator.SceneConfigs.FloatFromBottom,
//         gestures: null,
//       },
//       max: 43200 / 60, // 最大值（以分为单位） 6
//       value: 60 / 60, // 当前值 /60（以分为单位）
//       min: 1, // 最小值
//       countdownCode: 'countdown',
//       theme: {
//         themType: 'default', // 主题色 dark / default
//         // backgroundImage: Res.countBgDefault, // 背景图 Res.countdownBg / Res.countBgDefault
//       },
//       hourText: 'h',
//       minuteText: 'm',
//       backTip: () => {}, // 保存+清零返回函数
//     },
//   },
// ];

// const SwitchLogs = [
//   {
//     id: 'Electrician.ElectricianClass.SwitchLog',
//     Scene: SwitchLog,
//     routeProps: {
//       hideTopbar: true,
//       themeColor: '#00B294',
//       switchCodes: ['switch_1', 'switch_2', 'switch_3'],
//       logsConfig: ['switch_1', 'switch_2', 'switch_3'].map(d => {
//         return {
//           id: 1,
//           values: [true, false],
//           code: d,
//         };
//       }),
//     },
//   },
// ];

// const EleSettings = [
//   {
//     id: 'Electrician.ElectricianSet.EleSetting',
//     Scene: EleSetting.Setting,
//     routeProps: {
//       settingDps: [
//         {
//           code: 'mode',
//           dptype: 'obj',
//           id: '102',
//           mode: 'rw',
//           name: '灯光模式',
//           range: ['colour', 'white', 'gradient'],
//           type: 'enum',
//         },
//         {
//           code: 'switch_1',
//           dptype: 'obj',
//           id: '101',
//           mode: 'rw',
//           name: '开关',
//           type: 'bool',
//         },
//       ],
//       showSwitchLog: false,
//       isStatusMultichannel: false,
//       themeColor: '#338CE5',
//     },
//   },
//   {
//     id: 'Electrician.ElectricianSet.RelayStatus',
//     Scene: EleSetting.RelayStatus,
//     routeProps: {
//       themeColor: '#338CE5',
//     },
//   },
// ];

// const GroupTimers = [
//   {
//     id: 'Electrician.ElectricianTimer.GroupTimer',
//     Scene: GroupTimer.TimerList,
//     routeProps: {
//       tintColor: '#333',
//       themeColor: '#338CE5',
//       showSchedule: true,
//       is12Hours: true,
//       navigator: TYSdk.Navigator,
//       timerConfig: {
//         addTimerRouter: 'addGroupTimer',
//         category: 'category_power',
//         repeat: 0,
//         data: [
//           {
//             dpId: 101,
//             dpName: '开关',
//             selected: 0,
//             rangeKeys: [true, false],
//             rangeValues: [{ dpValue: '开启' }, { dpValue: '关闭' }],
//           },
//         ],
//       },
//     },
//   },
//   {
//     id: 'addGroupTimer',
//     Scene: GroupTimer.AddGroupTimer,
//   },
// ];

// const timerCbt = [
//   {
//     id: 'Cbt.TimerClassic.TimerList',
//     Scene: CbtTimer.TimerList,
//     routeProps: {
//       hideTopbar: true,
//       title: Strings.getLang('schedule'),
//       selectIndex: 0, // 进入页面选中的开关 // 默认0
//       names: { switch_1: '开关1', switch_2: '开关2' },
//       switchCodes: ['switch_1', 'switch_2'],
//       rangeKeys: [true, false], // 每个开关定时执行项； 默认 [true, false]
//       timerConfig: {
//         addTimerRouter: 'addTimer',
//       },
//     },
//   },
//   {
//     id: 'addTimer',
//     Scene: CbtTimer.AddTimer,
//     routeProps: {
//       title: Strings.getLang('addTimer'),
//     },
//   },
// ];

/**
 * 全屋周程序相关配置
 */
// const weeklyTimingRoutes = [
//   {
//     id: 'FullRoom.WeeklyTiming.WeekProgram1',
//     Scene: WeeklyTiming.WeekProgram1,
//     routeProps: {
//       settingPageRoute: 'WeeklyTiming.WeekProgram1Setting',
//       weekProgramConfig: [
//         {
//           dpName: '开关',
//           dpId: 1,
//           selected: 0,
//           unit: '',
//           rangeKeyValue: Array.from(Array(2), (__, k) => k).map(v => ({
//             label: v === 0 ? '开' : '关',
//             value: v === 0,
//           })),
//         },
//         {
//           dpName: '模式',
//           dpId: 2,
//           selected: 0,
//           unit: '',
//           rangeKeyValue: Array.from(Array(4), (__, k) => k).map(v => ({
//             label: `模式${v}`,
//             value: v,
//           })),
//         },
//       ],
//     },
//   },
//   {
//     id: 'FullRoom.WeeklyTiming.WeekProgram2',
//     Scene: WeeklyTiming.WeekProgram2,
//     routeProps: {
//       weekProgramPeriods: 4,
//       settingPageRoute: 'WeeklyTiming.WeekProgram234Setting',
//       weekProgramOriginData:
//         '0600000800011100001600010600000800011100001600010600000800011100001600010600000800011' +
//         '10000160001060000080001110000160001060000080001110000160001060000080001110000160001',
//       saveData: () => {
//         // 周程序保存时回调，返回修改后的raw数据
//       },
//       weekProgramConfig: [
//         {
//           dpName: '开关',
//           length: 2,
//           selected: 0,
//           unit: '',
//           rangeKeyValue: Array.from(Array(2), (__, k) => k).map(v => ({
//             label: v === 1 ? '开' : '关',
//             value: v,
//           })),
//         },
//       ],
//     },
//   },
//   {
//     id: 'FullRoom.WeeklyTiming.WeekProgram3',
//     Scene: WeeklyTiming.WeekProgram3,
//     routeProps: {
//       weekProgramPeriods: [4, 2],
//       detailPageRoute: 'WeeklyTiming.WeekProgram3Detail',
//       settingPageRoute: 'WeeklyTiming.WeekProgram234Setting',
//       weekProgramOriginData: '060000080001110000160001060001160000',
//       workDays: '5+2',
//       saveData: () => {
//         // 周程序保存时回调，返回修改后的raw数据
//       },
//       weekProgramConfig: [
//         {
//           dpName: '开关',
//           length: 2,
//           selected: 0,
//           unit: '',
//           rangeKeyValue: Array.from(Array(2), (__, k) => k).map(v => ({
//             label: v === 1 ? '开' : '关',
//             value: v,
//           })),
//         },
//       ],
//     },
//   },
//   {
//     id: 'FullRoom.WeeklyTiming.WeekProgram4',
//     Scene: WeeklyTiming.WeekProgram4,
//     routeProps: {
//       weekProgramPeriods: 4,
//       settingPageRoute: 'WeeklyTiming.WeekProgram234Setting',
//       weekProgramOriginData:
//         '0600001401080000000211000016011600000f030600001401080000000211000016' +
//         '011600000f030600001401080000000211000016011600000f03',
//       saveData: () => {
//         // 周程序保存时回调，返回修改后的raw数据
//       },
//       weekProgramConfig: [
//         {
//           dpName: '温度',
//           length: 4,
//           selected: 0,
//           unit: '°C',
//           rangeKeyValue: Array.from(Array(30), (__, k) => k).map(v => ({
//             label: `${v}`,
//             value: v,
//           })),
//         },
//         {
//           dpName: '模式',
//           length: 2,
//           selected: 0,
//           unit: '',
//           rangeKeyValue: Array.from(Array(4), (__, k) => k).map(v => ({
//             label: `模式${v}`,
//             value: v,
//           })),
//         },
//       ],
//     },
//   },
//   {
//     id: 'FullRoom.WeeklyTiming.WeekProgram5',
//     Scene: WeeklyTiming.WeekProgram5,
//     routeProps: {
//       hideTopbar: true,
//       saveData: () => {
//         // 周程序保存时回调，返回修改后的raw数据
//       },
//       weekProgramConfig: [
//         {
//           dpName: '温度',
//           length: 4,
//           selected: 0,
//           unit: '°C',
//           rangeKeyValue: Array.from(Array(30), (__, k) => k).map(v => ({
//             label: `${v}`,
//             value: v,
//           })),
//         },
//         {
//           dpName: '模式',
//           length: 2,
//           selected: 0,
//           unit: '',
//           rangeKeyValue: Array.from(Array(4), (__, k) => k).map(v => ({
//             label: `模式${v}`,
//             value: v,
//           })),
//         },
//         {
//           dpName: 'test',
//           length: 2,
//           selected: 0,
//           unit: '',
//           rangeKeyValue: Array.from(Array(4), (__, k) => k).map(v => ({
//             label: `test${v}`,
//             value: v,
//           })),
//         },
//       ],
//     },
//   },
//   {
//     id: 'FullRoom.WeeklyTiming.WeekProgram6',
//     Scene: WeeklyTiming.WeekProgram6,
//     routeProps: {
//       settingPageRoute: 'WeeklyTiming.WeekProgram567Setting',
//       hideTopbar: true,
//       saveData: () => {
//         // 周程序保存时回调，返回修改后的raw数据
//       },
//     },
//   },
//   {
//     id: 'FullRoom.WeeklyTiming.WeekProgram7',
//     Scene: WeeklyTiming.WeekProgram7,
//     routeProps: {
//       settingPageRoute: 'WeeklyTiming.WeekProgram567Setting',
//       hideTopbar: true,
//       saveData: () => {
//         // 周程序保存时回调，返回修改后的raw数据
//       },
//     },
//   },
//   {
//     id: 'WeeklyTiming.WeekProgram3Detail',
//     Scene: WeeklyTiming.WeekProgram3Detail,
//   },
//   {
//     id: 'WeeklyTiming.WeekProgram1Setting',
//     Scene: WeeklyTiming.WeekProgram1Setting,
//   },
//   {
//     id: 'WeeklyTiming.WeekProgram234Setting',
//     Scene: WeeklyTiming.WeekProgram234Setting,
//   },
//   {
//     id: 'WeeklyTiming.WeekProgram567Setting',
//     Scene: WeeklyTiming.WeekProgram567Setting,
//   },
// ];

// const VoiceAssistantRoutes = [
//   {
//     id: 'VoiceAssistant.Skill',
//     Scene: VoiceAssistant.Skills,
//     routeProps: {
//       hideTopbar: true,
//     },
//   },
//   {
//     id: 'VoiceAssistant.Scene',
//     Scene: VoiceAssistant.VoiceScene,
//     routeProps: {
//       hideTopbar: true,
//     },
//   },
// ];

export default [
  ...batteryStatsRouters,
  ...batteryChargeRouters,
  ...timerRouters,
  ...timerClassicRouters,
  ...timerSpringRouters,
  ...countryListRouters,
  // ...timerFullRoom,
  // ...countdownCbt,
  // ...timerCbt,
  // ...weeklyTimingRoutes,
  // ...VoiceAssistantRoutes,
  // ...SwitchLogs,
  // ...EleSettings,
  // ...GroupTimers,
];
