/* istanbul ignore file */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { SensingSDK } from '../../SensingSDK';

const useCurrentByDp = <T = ['temp_current', 'humidity_value'], U = { [props: string]: string }>(
  showDataTime: boolean,
  dpCodeArr: T[]
) => {
  const getLastData = async () => {
    if (!showDataTime) return false;

    try {
      const list = await SensingSDK?.INSTANCE?.getDpsInfos<U>();

      const timer = dpCodeArr.reduce((acc, item) => {
        const idx = list?.findIndex((d: any) => d.code === item);
        const curDpTime = list![idx!]?.time;
        if (acc < curDpTime) {
          return curDpTime;
        }
        return acc;
      }, 0);

      return timer;
    } catch (e) {
      __DEV__ && console.log('error', e);
      throw e;
    }
  };

  return getLastData;
};

export default useCurrentByDp;
