import _isString from 'lodash/isString';

import { stringToAtHex, ASCIIToJson, atHexToString } from '../../../utils/StringsUtils';


interface IPressComplex {
  infoTypes: number[] | []; // 原始协议infotype
  // decodeFuncs: any[]; // 使用的解析方法
}

interface IOriginCmd {
  infoType: number;
  data: any;
  cmds?: any[];
}

// const areaDecode = [cleanZone.decode, cleanPoint.decode, forbiddenZone.decode];

// const infoTypeMap = {
//   21003: areaDecode,
//   21004: areaDecode,
// }
// 解析使用哪个函数进行下一步解析数据
function decodeCommToCmd(data: string) {
  const error = { infoTypes: [] };
  const dataJson: IOriginCmd = ASCIIToJson(data);
  if (_isString(dataJson)) return error;

  const { infoType } = dataJson;

  if (infoType === 30000 && dataJson.cmds) {
    // const infoTypes = dataJson.cmds.map((cmd: IOriginCmd) => cmd.infoType);
    // return { infoTypes };
    return dataJson.cmds;
  }
  return dataJson;
}

function decodeToCmd(data: IOriginCmd) {
  const { infoType, data: cmdData } = data;

  if (infoType === 30000 && cmdData.cmds) {
    // const infoTypes = dataJson.cmds.map((cmd: IOriginCmd) => cmd.infoType);
    // return { infoTypes };
    return cmdData.cmds;
  }
  return data;
}

export default {
  decodeToCmd,
  decodeCommToCmd,
}
