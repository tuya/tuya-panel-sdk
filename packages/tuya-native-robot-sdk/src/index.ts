export * from './components';
export * from './page';
/** 地图组件 */
export * from './map';
/** 接口 */
export { default as Api } from './api';
export { default as LaserUIApi } from './api/laserUIApi';
/** 协议 */
export { default as Protocol } from './protocol';
/** 工具 */
export { default as Utils } from './utils';

// /* eslint-disable import/prefer-default-export */
// import Api from '@Api';
// import LaserUIApi from '@Api/laserUIApi';
// import {
//   HistoryList,
//   HistoryMapDisplay,
//   HistoryMultiSelectList,
// } from '@src/laser-sweep-history';
// import LaserSweepMap from '@src/laser-sweep-map';
// import TYRCTLaserMap, { TYLaserManager } from '@src/rct-laser-map';
// import RCTGyroMap, { TYRCTGyroMapManager } from '@src/rct-gyro-map';
// import RobotCleanInfo from '@components/RobotCleanInfo';
// import Toast from '@components/Toast';
// import RobotProvider from '@components/RobotProvider';
// import LaserSweepMapLeDong from '@src/laser-sweep-map-ledong';
// import LaserLeDongLayout from '@src/laser-sweep-map-ledong/layout';

// import Protocol from './protocol';
// import Utils from './utils';
// import { GyroSweepMap, GyroSweepMapProps } from './gyro-sweep-map/GyroSweepMap';
// import { GyroSweepMapOss } from './gyro-sweep-map/GyroSweepMapOss';
// import { GyroSweepSvgMap } from '@src/gyro-sweep-map/GyroSweepSvgMap';
// import { LaserMapFrame, LaserMapRealTime } from './laser-sweep-map/realTimeStore';
// export * from './components';

// export {
//   LaserMapFrame,
//   LaserMapRealTime,
//   /** 地图接口 */
//   Api,
//   /** 激光组件UI操作接口 */
//   LaserUIApi,
//   /** 协议 */
//   Protocol,
//   /** 扫地机工具库 */
//   Utils,
//   /** 历史地图列表单项删除 */
//   HistoryList,
//   /** 历史地图列表多选删除 */
//   HistoryMultiSelectList,
//   /** 历史地图展示地图 */
//   HistoryMapDisplay,
//   // 一微激光地图，V1，V2
//   LaserSweepMap as LaserMapYiWei,
//   /** 乐动激光地图 */
//   LaserSweepMapLeDong,
//   /** 乐动激光页面组件 */
//   LaserLeDongLayout,
//   /** RCTLaserMap封装 */
//   TYRCTLaserMap,
//   /** RCTLaserMap地图接口 */
//   TYLaserManager,
//   /** 陀螺仪地图 */
//   GyroSweepMap,
//   GyroSweepMapOss,
//   GyroSweepSvgMap,
//   GyroSweepMapProps,
//   /** 陀螺仪地图所有版本 */
//   // GyroSweepMapAll,
//   /** RCTPointMap封装 */
//   RCTGyroMap,
//   /** RCTPointMap接口 */
//   TYRCTGyroMapManager,
//   // /** 圆形手势基础类 */
//   // CircleGesture,
//   // /** 方向盘 */
//   // CircleDisk,
//   // /** 方向盘方向按钮 */
//   // CircleDiskActiveItem,
//   // /** 圆形进度条 */
//   // CircleProgress,
//   // /** 大转盘自定义滑块 */
//   // CircleThumb,
//   // /** 抽屉（上拉下拉） */
//   // PullUpDown,
//   // /** 抽屉枚举方向 */
//   // PullUpDownDirection,
//   // // RN定制的定时页
//   // Timer,
//   /** dp设置列表 */
//   // SettingsSectionList,
//   /** Loading样式（废弃） */
//   // LoadingBubbles,

//   /** 提供报警弹窗 */
//   RobotProvider,
//   /** 清扫时间、清扫面积、剩余电量 */
//   RobotCleanInfo,
//   Toast,
//   // -------------- 兼容接口，不推荐使用 ---------------------
//   /** 陀螺仪地图（向下兼容，废弃） */
//   GyroSweepMap as SweepMap,
//   /** 激光地图 （向下兼容，废弃）*/
//   LaserSweepMap,
// };
