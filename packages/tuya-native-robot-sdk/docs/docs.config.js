module.exports = [
  {
    name: 'GyroSweepMap',
    nameZh: '陀螺仪地图-流服务V1',
    file: 'tuya-native-robot-elements/dist/gyro-sweep-map/GyroSweepMap/index.js',
    entry: 'tuya-native-robot-elements/src/gyro-sweep-map/GyroSweepMap/index.tsx',
  },
  {
    name: 'GyroSweepMapOss',
    nameZh: '陀螺仪地图-流服务V2&OSS通道',
    file: 'tuya-native-robot-elements/dist/gyro-sweep-map/GyroSweepMapOss/index.js',
    entry: 'tuya-native-robot-elements/src/gyro-sweep-map/GyroSweepMapOss/index.tsx',
  },
  {
    name: 'GyroSweepSvgMap',
    nameZh: '陀螺仪地图RN绘图版-流服务V1',
    file: 'tuya-native-robot-elements/dist/gyro-sweep-map/GyroSweepSvgMap/index.js',
    entry: 'tuya-native-robot-elements/src/gyro-sweep-map/GyroSweepSvgMap/index.tsx',
  },
  {
    name: 'SvgMap',
    nameZh: 'SVG地图画布',
    file: 'tuya-native-robot-elements/dist/components/SvgMap/index.js',
    entry: 'tuya-native-robot-elements/src/components/SvgMap/index.tsx',
  },
  {
    name: 'GyroHistory',
    nameZh: '通用陀螺仪清扫记录列表&地图',
    file: 'tuya-native-robot-elements/dist/components/GyroHistory/index.js',
    entry: [
      {
        title: 'GyroHistory.HistoryRecords',
        path: 'tuya-native-robot-elements/src/components/GyroHistory/HistoryRecords.tsx',
      },
      {
        title: 'GyroHistory.HistoryMap',
        path: 'tuya-native-robot-elements/src/components/GyroHistory/HistoryMap.tsx',
      },
    ],
  },
  {
    name: 'RecordList',
    nameZh: '通用扫地机清扫记录列表-单选删除',
    file: 'tuya-native-robot-elements/dist/components/RecordList/RecordsScene.js',
    entry: 'tuya-native-robot-elements/src/components/RecordList/RecordsScene.tsx',
  },
  {
    name: 'RecordMultiSelectList',
    nameZh: '通用扫地机清扫记录列表-多选删除',
    file: 'tuya-native-robot-elements/dist/components/RecordList/multiSelectScene.js',
    entry: 'tuya-native-robot-elements/src/components/RecordList/multiSelectScene.tsx',
  },
  {
    name: 'Loading',
    nameZh: '通用加载动画组件',
    file: 'tuya-native-robot-elements/dist/components/loading/loading.js',
    entry: 'tuya-native-robot-elements/src/components/loading/loading.tsx',
  },
  {
    name: 'CircleProgress',
    nameZh: '圆形进度条',
    file: 'tuya-native-robot-elements/dist/components/CircleProgress/index.js',
    entry: 'tuya-native-robot-elements/src/components/CircleProgress/index.tsx',
  },
  {
    name: 'CircleDisk',
    nameZh: '圆形方向盘',
    file: 'tuya-native-robot-elements/dist/components/CircleDisk/index.js',
    entry: 'tuya-native-robot-elements/src/components/CircleDisk/index.tsx',
  },
  {
    name: 'CircleButton',
    nameZh: '圆形热区按钮',
    file: 'tuya-native-robot-elements/dist/components/CircleButton/index.js',
    entry: 'tuya-native-robot-elements/src/components/CircleButton/index.tsx',
  },
  {
    name: 'CircleThumb',
    nameZh: '圆形方向盘项',
    file: 'tuya-native-robot-elements/dist/components/CircleThumb/index.js',
    entry: 'tuya-native-robot-elements/src/components/CircleThumb/index.tsx',
  },
  {
    name: 'ConsumableLife',
    nameZh: '通用扫地机耗材列表',
    file: 'tuya-native-robot-elements/dist/components/ConsumableLife/index.js',
    entry: 'tuya-native-robot-elements/src/components/ConsumableLife/index.tsx',
  },
  // {
  //   name: 'EmptyMap',
  //   nameZh: '通用地图加载提示',
  // file: 'tuya-native-robot-elements/dist/components/EmptyMap/index.js',
  //   entry: 'tuya-native-robot-elements/src/components/EmptyMap/index.tsx',
  // },
  {
    name: 'MultiFaultDetail',
    nameZh: '故障详情列表',
    file: 'tuya-native-robot-elements/dist/components/MultiFaultDetail/index.js',
    entry: 'tuya-native-robot-elements/src/components/MultiFaultDetail/index.tsx',
  },
  {
    name: 'MultiFaultToast',
    nameZh: '故障提示',
    file: 'tuya-native-robot-elements/dist/components/MultiFaultToast/index.js',
    entry: 'tuya-native-robot-elements/src/components/MultiFaultToast/index.tsx',
  },
  {
    name: 'PullUpDown',
    nameZh: '上下拉动手势',
    file: 'tuya-native-robot-elements/dist/components/PullUpDown/index.js',
    entry: 'tuya-native-robot-elements/src/components/PullUpDown/index.tsx',
  },

  {
    name: 'RobotCleanInfo',
    nameZh: '清扫信息',
    file: 'tuya-native-robot-elements/dist/components/RobotCleanInfo/index.js',
    entry: 'tuya-native-robot-elements/src/components/RobotCleanInfo/index.tsx',
  },
  {
    name: 'SettingsSectionList',
    nameZh: '通用DP设置列表',
    file: 'tuya-native-robot-elements/dist/components/SettingsSectionList/index.js',
    entry: 'tuya-native-robot-elements/src/components/SettingsSectionList/index.tsx',
  },

  {
    name: 'Toast',
    nameZh: '调用式Toast',
    file: 'tuya-native-robot-elements/dist/components/Toast/index.js',
    entry: 'tuya-native-robot-elements/src/components/Toast/index.tsx',
  },
];
