import { TYSdk } from '@tuya-rn/tuya-native-components';
import _get from 'lodash/get';
import _isString from 'lodash/isString';
import _isEmpty from 'lodash/isEmpty';

import { toJsonSafe, atHexToString } from '../../../utils/StringsUtils';

interface IOriginUpLoadData {
  infoType: number;
  message: 'ok' | 'fail';
  data: {
    cmd: 'process' | 'downloadAndApply';
    id: string; //当前下载的语音包
    error: number; // 错误码
    process?: number;
  };
}

function getFuncField(key: string, defaultValue: string) {
  return _get(TYSdk, ['devInfo', 'panelConfig', 'fun', key], defaultValue);
}

const encodeDataByUrl = (id: string, url: string) => {
  if (!url) return;
  const [, md5sum] = url.replace(/.*\/.+\/.+(md5_\w+)(\.\w)*/, '$1').split('_');
  const name = `voicetype_${id}`;
  const commData = {
    infoType: 21027,
    data: {
      cmd: 'downloadAndApply',
      id: `${id},${encodeURIComponent(name)}`, // 语音包包名
      downUrl: url, // 下载链接
      md5sum, // 语音包md5值
      size: 0, // 语音包大小
    },
    dInfo: {
      userId: '0',
      ts: `${new Date().getTime()}`,
    },
  };
  console.log('commData', commData);

  return commData;
};

const encodeData = (id: string) => {
  const name = `voicetype_${id}`;
  const voicelinkEnum = JSON.parse(getFuncField('voicelinkEnum', ''));

  if (!voicelinkEnum) return;

  const downUrl = voicelinkEnum[id] || '';
  if (downUrl === '') return;

  // https://images.tuyacn.com/app/package/yxzn_LS_amwreslbw9qpl7c9_vioce_en_md5_e3c907e0cdc6495035c0c55853fda4c6
  const [, md5sum] = downUrl.replace(/.*\/.+\/.+(md5_\w+)(\.\w)*/, '$1').split('_');
  const commData = {
    infoType: 21027,
    data: {
      cmd: 'downloadAndApply',
      id: `${id},${encodeURIComponent(name)}`, // 语音包包名
      downUrl, // 下载链接
      md5sum, // 语音包md5值
      size: 0, // 语音包大小
    },
    dInfo: {
      userId: '0',
      ts: `${new Date().getTime()}`,
    },
  };
  return commData;
};

const decodeData = (data: string): IOriginUpLoadData => {
  const temp = atHexToString(data);

  const rez = toJsonSafe(temp);
  if (_isString(rez) || _isEmpty(rez)) return { data: {} };
  return rez;
};

const decode = (voicelink: string) => {
  const { message = '', data } = decodeData(voicelink);

  if (!data)
    return {
      isSuccess: false,
      isFail: false,
      isProcessing: false,
      id: 0,
      errorCode: 0,
      process: 0,
    };
  const { cmd = '', id = '', error: errorCode = 0, process = 0 } = data;

  const isSuccess = message === 'ok' && errorCode === 0 && [0, 100].includes(process); // 成功状态
  const isFail = message === 'fail' || ![-1, 0].includes(errorCode); // 失败状态
  const isProcessing = ![0, 100].includes(process); // 进度中
  const curId = id.slice(0, 1); // 进程中的id

  return { isSuccess, isFail, isProcessing, id: curId, errorCode, process };
};

export default {
  encodeData,
  encodeDataByUrl,
  decode,
};
