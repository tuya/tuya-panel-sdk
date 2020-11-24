import _isString from 'lodash/isString';
import _isArray from 'lodash/isArray';
import _round from 'lodash/round';
import { toJsonSafe } from '../../../utils/StringsUtils';

interface IOriginCommRegion {
  message: string;
  infoType: number;
  userId: string;
  dInfo: {
    userId: string;
    ts: string;
  };
  data: {
    mapId: number;
    value: IOriginRegion[];
  };
}

interface IOriginRegion {
  vertexs: [[number, number], [number, number], [number, number], [number, number]];
  id: number;
  active: string;
  tag: string;
  mode: string;
}

const infoType = 21004;

/** 获取21004的区域信息 */
function getAreaFromComm(comm: string) {
  const commJson: IOriginCommRegion = toJsonSafe(comm);
  if (_isString(commJson)) return null;
  if (commJson.infoType && commJson.infoType !== infoType) return null;
  return commJson;
}

export default {
  decode: getAreaFromComm,
};
