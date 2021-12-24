export interface ITimerParams {
  category: string;
  loops: string;
  instruct: any[];
  aliasName: string;
  bizId?: string;
  // 设备定时或设备组定时
  bizType?: 0 | 1;
  timeZone?: string;
  isAppPush?: boolean;
  actionType?: 'device' | 'device_group';
  options?: any;
}

export interface IEditTimerParams extends ITimerParams {
  groupId: string;
}

export interface ISceneInfo {
  currVersion: string;
  allVersionList: string[];
}

export interface ISceneData {
  dpCode: string;
  icon: string;
  sceneName: string;
  sceneData: string;
  sceneId: number;
  gmtCreate?: number;
  gmtModified?: number;
}
