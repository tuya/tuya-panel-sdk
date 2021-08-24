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
