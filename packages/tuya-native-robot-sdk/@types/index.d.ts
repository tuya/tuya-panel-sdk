// declare module '@tuya-rn/tuya-native-components' {
//   export let defaultTheme: any;
//   export let Theme: any;
//   export let NavigatorLayout: any;
//   export let FullView: any;
//   export let TopBar: any;
//   export let OfflineView: any;
//   export let CircleView: any;
//   export let Checkbox: any;
//   export let Slider: any;
//   export let SwitchButton: any;
//   export let BrickButton: any;
//   export let Button: any;
//   export let LineChart: any;
//   export let BarChart: any;
//   export let LinearGradient: any;
//   export let RadialGradient: any;
//   export let TYSectionList: any;
//   export let TYFlatList: any;
//   export let TYListItem: any;
//   export let Toast: any;
//   export let RotationView: any;
//   export let IconFont: any;
//   export let UnitText: any;
//   export let TYText: any;
//   export let WebView: any;
//   export let Picker: any;
//   export let DatePicker: any;
//   export let Swipeout: any;
//   export let Modal: any;
//   export let Collapsible: any;
//   export let Tab: any;
//   export let Tabs: any;
//   export let TabBar: any;
//   export let Carousel: any;
//   export let imageUpload: any;
//   export let Dialog: any;
//   export let Popup: any;
//   export let ControllerBar: any;
//   export let Notification: any;
//   export let TimerPicker: any;

//   export class I18N {
//     constructor(strings: { en: any; zh: any });
//     getLang: (value: string) => string;
//     getDpLang: (code: string, value?: string | number | boolean) => string;
//     formatValue: (key: any, ...value: Array<string | number>) => string;
//     getFaultStrings: (code: any, value: number, isShowFirst?: boolean)
//   }

//   export let Divider: any;

//   export interface UtilsInterface {
//     RatioUtils: {
//       isIphoneX: boolean;
//       convert(d: any): number;
//       convertX(d: any): number;
//       convertY(d: any): number;
//       viewWidth: number;
//       viewHeight: number;
//       width: number;
//       isIos: boolean;
//     };
//     ColorUtils: {
//       color: {
//         hex2RgbString(hex: string, alpha?: number): string;
//         hsv2hex(hue: number, saturation: number, brightness: number): string;
//         decode(color: any): number[];
//         hsv2hex(hue: number, s: number, v: number): string;
//       };
//     };
//     NumberUtils: {
//       highLowToInt(high: number, low: number): number;
//       intToHighLow(num: number): [number, number];
//       scaleNumber(scale: number, num: number): number;
//     };
//     CoreUtils: {
//       toFixed(str: string, count: number): string;
//     };
//     ThemeUtils: {
//       ThemeConsumer: any;
//       getTheme: any;
//     };
//     StringUtils: {
//       hexStringToNumber: any;
//     };
//     JsonUtils: {
//       parseJSON(str: string): any;
//     };
//     TimeUtils: {
//       dateFormat(format: string, date: Date): string;
//     };
//   }
//   export let Utils: UtilsInterface;
//   export let TYSdk: {
//     /**
//      * EventEmit
//      *
//      * @param {string} event
//      * @param {(d: any) => any} callback
//      */
//     on(event: string, callback: Function): void;
//     emit(event: string, data: any): void;
//     remove(event: string, callback: Function): void;

//     DeviceEventEmitter: {
//       addListener(event: string, callback: (d: any) => any): void;
//       removeListener(event: string, callback: (d: any) => any): void;
//     }
//     /**
//      * 检查dp点是否存在
//      *
//      * @param {string} code
//      * @returns {boolean}
//      */
//     checkDpExist(code: string): boolean;

//     Navigator: {
//       pop(): void;
//       push(d: { id: string; title?: string; [x: string]: any }): void;
//     };

//     devInfo: {
//       state: any;
//     };
//     /**
//      * 设置设备属性
//      *
//      * @param {Object} devInfo
//      */
//     setDevInfo(devInfo: any): void;

//     /**
//      * 获取设备属性
//      */
//     getDevInfo(): any;

//     /**
//      * 跳转native定时页面
//      *
//      * @param {*} d
//      */
//     gotoDpAlarm(d: any): void;

//     putDpData(cmd: any): Promise<any>;

//     getDpIdByCode(code: string): string;

//     getDpSchema<T>(code: string): T | any;

//     getState<T>(id: string): T;

//     simpleTipDialog(title: string, callback: () => void): void;

//     simpleConfirmDialog(
//       title: string,
//       subTitle: string,
//       confirm: () => void,
//       cancel: () => void
//     ): void;

//     hideLoading(): void;
//     showEditDialog(
//       title: string,
//       context: string,
//       confirm: (text: string) => any,
//       cancel: () => any
//     ): void;
//   };
//   // export let I18N: I18NBase;
// }

// declare module '@tuya-rn/tuya-native-elements';

// declare module '@tuya-rn/tuya-native-lamp-elements' {
//   export let WaterRipple: any;
// }

declare module '@RecordDataCollection' {
  export interface IRecord {
    // 原始数据
    bucket: string;
    extend: string;
    file: string;
    id: number;
    time: string;
    date?: string;

    startTime?: string; // 开始时间
    endTime?: string;
    cleanArea?: number; // 清扫面积
    cleanTime?: number; // 清扫时间
    mapId?: number; // 地图id
    mapLen?: number; // 地图长度
    pathLen?: number; // 路径长度
    time12: string; // 十二小时制时间
    time12Unit: string; // 十二小时制单位
    time24: string; // 二十四小时制时间
    dateTitle: string; // 二级页面时间标题
    dateTitle24: string; // 二级页面时间标题二十四小时制
    sectionTitle: string; // sectionList标题
  }

  export interface IRecordOSSOriginData {
    datas: IRecord[];
    totalCount: number;
  }

  export interface IRecordInterfaceOriginData {
    dps: [{ [index: string]: string }];
    gmtCreate: string;
  }

  export interface IRecordSectionList {
    title: string;
    data: IRecord[];
  }

  export interface IRecordCollectionState {
    hasNextPage: boolean;
    offset: number;
    isRequesting: boolean;
    pageSize: number;
  }

  export interface IRecordCollectionStore {
    logData: IRecord[];
    sectionListData: IRecordSectionList[]; // SectionList 类型数据
    totalCount: number;
  }
}
