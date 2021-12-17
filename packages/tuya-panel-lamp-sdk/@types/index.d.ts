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

declare interface SceneValue {
  id?: number;
  time?: number;
  mode?: number;
  speed?: number;
  colors?: SceneColor[];
}
declare interface SceneData {
  sceneId?: number;
  pic?: any; // 小图
  picBig?: any; // 大图
  picMiddle?: any; // 中图
  isDefault?: boolean; // 是否为默认的配置
  isCustom?: boolean; // 是否为自定义产品
  picIndex?: number; // 自定义默认图序号
  name?: string;
  value?: SceneValue;
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
}
