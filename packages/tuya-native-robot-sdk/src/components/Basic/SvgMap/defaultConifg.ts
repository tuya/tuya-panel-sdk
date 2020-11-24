export interface ISvgMapConfig {
  mapPointsDataType: { [type: string]: string }; // 背景地图类型对应颜色
  curPointIconUrl: string,
  pilePointIconUrl: string,
}

const defaultConfig: ISvgMapConfig = {
  mapPointsDataType: {},
  curPointIconUrl: '',
  pilePointIconUrl: '',
};

export default defaultConfig;
