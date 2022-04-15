import { DpType, TYSdk, Utils } from 'tuya-panel-kit';
import { Utils as Normal } from '../szos-utils-sdk';
import { useDpSchema } from './index';

const { transLateNumber } = Normal;
const {
  NumberUtils: { scaleNumber },
} = Utils;

const useDpState = <T = Record<string, DpType>>(
  dpState: Record<string, DpType> = TYSdk.devInfo.state
): T => {
  const { prefix, schema } = useDpSchema();

  const wrapPrefix = prefix ? `${prefix}_` : '';

  return Object.keys(dpState).reduce((memo, item) => {
    return {
      ...memo,
      [item]:
        schema[`${wrapPrefix}${item}`]?.type === 'value'
          ? transLateNumber(
              +scaleNumber(schema[`${wrapPrefix}${item}`]?.scale || 0, +dpState[item]),
              schema[`${wrapPrefix}${item}`]?.scale
            )
          : dpState[item],
    };
  }, {} as T);
};

export default useDpState;
