import get from 'lodash/get';

interface IConfig {
  pointsColorData: {
    barrier: string;
    clear: string;
    pile: string;
    unknown: string;
    current: string;
  };
  pileIcon: string;
  markerIcon: string;
}

export function getGyroIotConfig(
  Config: { getUiValue: (key: string, state?: boolean) => any },
  defaultValue?: { barrier?: string; clear?: string; current?: string }
): IConfig {
  const defaultBarrier = get(defaultValue, 'barrier');
  const defaultClear = get(defaultValue, 'clear');
  // const defaultCurrent = get(defaultValue, 'current');
  const fontColor = Config.getUiValue('fontColor');
  const themeColor = Config.getUiValue('themeColor');
  const clean = Config.getUiValue('sweeper.clean');
  const machineUrl = Config.getUiValue('sweeper.machine');
  const obstacle = Config.getUiValue('sweeper.obstacle');
  const pileUrl = Config.getUiValue('sweeper.pile');
  const clear = clean || defaultClear || themeColor;
  return {
    pointsColorData: {
      barrier: obstacle || defaultBarrier || fontColor,
      clear,
      pile: themeColor,
      unknown: '#00000000',
      current: clear,
    },
    pileIcon: get(pileUrl, 'uri'),
    markerIcon: get(machineUrl, 'uri'),
  };
}
