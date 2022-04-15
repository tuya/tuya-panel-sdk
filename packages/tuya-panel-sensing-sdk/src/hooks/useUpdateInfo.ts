import { DpType, TYSdk } from 'tuya-panel-kit';
import { SensingSDK } from '../SensingSDK';

const TYDevice = TYSdk.device;

const TEMP_DP_CODE = 'temp_current'; // 温度Dp
const UNIT_DP_CODE = 'temp_unit_convert';

const useUpdateInfo = () => {
  const getUnit = async (dpState: Record<string, DpType>) => {
    try {
      const result = {
        userInfo: {},
        tempUnit: '',
        isSameUnit: false,
      };
      const userUnit = await SensingSDK?.INSTANCE?.getUserInfo();
      const tempUnit = userUnit?.tempUnit === 2 ? 'f' : 'c';
      const { unit = 'c' } = TYDevice.getDpSchema(TEMP_DP_CODE); // 默认温标
      const tempDpUnit = unit === '℉' ? 'f' : 'c';
      const hasTempUnitDp = dpState[UNIT_DP_CODE] !== undefined; // 是否配置了温标切换dp
      result.userInfo = userUnit!;

      if (hasTempUnitDp) {
        // 配置了温标切换dp
        result.tempUnit = dpState[UNIT_DP_CODE];
        result.isSameUnit = tempDpUnit.toLowerCase() === dpState[UNIT_DP_CODE].toLocaleLowerCase();
        return result;
      }
      result.tempUnit = tempUnit;
      result.isSameUnit = tempDpUnit.toLowerCase() === tempUnit.toLocaleLowerCase();
      return result;
    } catch (error) {
      __DEV__ && console.log('error', error);
      throw error;
    }
  };
  return getUnit;
};

export default useUpdateInfo;
