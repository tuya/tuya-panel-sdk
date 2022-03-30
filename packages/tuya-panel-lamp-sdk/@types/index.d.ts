declare interface ConnectProps {
  suction?: string;
  workMode?: string;
  robotStatus?: string;
  updateDp(d: any): void;
}
declare interface IColour {
  hue?: number;
  saturation: number;
  value: number;
}

declare interface IWhite {
  temperatureMin?: number;
  saturation: number;
  value: number;
}

declare interface SceneColor {
  isColour?: boolean;
  hue?: number;
  saturation: number;
  value: number;
  brightness: number;
  temperature: number;
}

declare interface SceneUnit {
  time: number;
  speed: number;
  mode: number;
  hue: number;
  saturation: number;
  value: number;
  brightness: number;
  temperature: number;
  isColour?: boolean;
}

declare interface SceneValue {
  id: number;
  colors?: SceneUnit[];
}
declare interface SceneData {
  sceneId: number;
  pic?: any; // 小图
  name: string;
  addTime?: number; // 自定义时使用
  value: SceneValue;
}
declare interface SceneCloudPic {
  sceneId?: number;
  fileUrl?: string;
}

declare interface IControlData {
  mode: number;
  hue: number;
  saturation: number;
  value: number;
  brightness: number;
  temperature: number;
}

declare interface CommonColor {
  name: string;
  pic: any;
  color: SceneColor;
}

declare interface UploadResponser {
  success: boolean;
  cloudKey: string;
  uri: string;
  fileSize: number;
}

declare interface AppleMusicDataType {
  mode: number;
  hue: number;
  saturation: number;
  value: number;
  brightness: number;
  temperature: number;
}

declare interface AppleMusicColorAreaType {
  area: number[];
  hue: number;
  saturation: number;
  value: number;
}

declare interface AppMusicListItemType {
  id: number;
  mode: number;
  title: string;
  icon: ImageSourcePropType;
  colorArea?: AppleMusicColorAreaType[];
}

declare interface IRhythmData {
  version: number;
  power: boolean;
  mode: number;
  weeks: number[];
  number: number;
  rhythms: RhythmItem[];
  key?: number;
}

declare interface RandomTimerItem {
  power: boolean;
  channel: number;
  weeks: number[];
  startTime: number;
  endTime: number;
  color: {
    hue: number;
    saturation: number;
    value: number;
    brightness: number;
    temperature: number;
  };
}

declare interface RandomTimerData {
  version: number;
  length: number;
  nodes: RandomTimerItem[];
}

declare interface CycleTimerItem {
  power: boolean;
  channel: number;
  weeks: number[];
  startTime: number;
  endTime: number;
  openTime: number;
  closeTime: number;
  color: {
    hue: number;
    saturation: number;
    value: number;
    brightness: number;
    temperature: number;
  };
}

declare interface CycleTimerData {
  version: number;
  length: number;
  nodes: CycleTimerItem[];
}

declare interface PowerMemoryData {
  version: number;
  mode: number;
  hue: number;
  saturation: number;
  value: number;
  brightness: number;
  temperature: number;
}

declare interface ISleepData {
  version: number;
  number: number;
  nodes: Array;
  mode?: number;
}

declare interface SleepItem {
  power: boolean;
  weeks: number[];
  delay: number;
  hour: number;
  minute: number;
  hue: number;
  saturation: number;
  value: number;
  brightness: number;
  temperature: number;
}
declare interface IWakeUpData {
  version: number;
  number: number;
  nodes: Array;
  mode?: number;
}
declare interface WakeUpItem {
  power: boolean;
  weeks: number[];
  delay: number;
  hour: number;
  minute: number;
  hue: number;
  saturation: number;
  value: number;
  brightness: number;
  temperature: number;
  last: number;
}
declare interface DpCodes {
  powerCode: string; // 开关
  workModeCode: string; // 工作模式
  brightCode: string; // 白光亮度
  temperatureCode: string; // 色温
  colourCode: string; // 彩光
  sceneCode: string; // 场景
  controlCode: string; // 调节dp
  musicCode: string; // 音乐
  countdownCode: string; // 倒计时
  rhythmCode: string; // 生物节律
  cycleTimingCode: string; // 循环定时
  randomTimingCode: string; // 随机定时
  powerMemoryCode: string; // 断电记忆
  doNotDisturbCode: string; // 停电勿扰
  sleepCode: string; //入睡
  wakeUpCode: string; //唤醒
}

declare interface ISceneData {
  dpCode: string;
  icon: string;
  sceneName: string;
  sceneData: string;
  sceneId: number;
  gmtCreate?: number;
  gmtModified?: number;
}

declare interface ISwitchGradient {
  on: number;
  off: number;
}
