/* eslint-disable import/prefer-default-export */

export const getImageInfoUrl = (url: string) => {
  if (url) {
    const realUrl = url.split('@');
    return realUrl[0];
  }
  return '';
};

export const getImageKey = (url: string) => {
  if (url) {
    const realUrl = url.split('@');
    return realUrl[1];
  }
  return '';
};

export const checkVersion = (v1: string, v2: string) => {
  let result = 0;
  try {
    const v1parts = v1.split('.');
    const v2parts = v2.split('.');
    const maxLen = Math.max(v1parts.length, v2parts.length);
    for (let i = 0; i < maxLen; i++) {
      if (+v1parts[i] > +v2parts[i]) {
        result = 1;
        break;
      } else if (+v1parts[i] < +v2parts[i]) {
        result = 2;
        break;
      }
    }
    return v1 === v2 ? 1 : result;
  } catch (e) {
    return 2;
  }
};
