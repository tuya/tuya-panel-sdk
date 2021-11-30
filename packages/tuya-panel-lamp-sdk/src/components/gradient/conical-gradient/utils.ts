import { TYSdk } from 'tuya-panel-kit';

export const isLargeAppRnVersion = (target: number[]): boolean => {
  const { mobile } = TYSdk;
  if (!mobile.mobileInfo) {
    return true;
  }
  const {
    mobileInfo: { appRnVersion },
  } = mobile;
  let versionInfo = [];
  if (typeof appRnVersion === 'string') {
    versionInfo = appRnVersion.split('.');
  }
  if (+versionInfo[0] > +target[0]) {
    return true;
  }
  if (versionInfo[1] !== undefined && target[1] !== undefined && +versionInfo[1] > +target[1]) {
    return true;
  }
  if (versionInfo[2] !== undefined && target[2] !== undefined && +versionInfo[2] > +target[2]) {
    return true;
  }
  return false;
};
