/* istanbul ignore file */
import { Utils, DpSchema, TYSdk } from 'tuya-panel-kit';
import { Utils as Normal } from '../../szos-utils-sdk';

const { NumberUtils } = Utils;

const { transLateNumber } = Normal;

const { scaleNumber } = NumberUtils;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useDpSchema = (schema?: { [props: string]: DpSchema }, prefix?: string) => {
  const wrapPrefix = prefix ? `${prefix}_` : '';

  const wrapSchema = schema || TYSdk.devInfo?.schema || {};

  const source = Object.keys(wrapSchema || TYSdk.devInfo?.schema);

  const result = source.reduce((memo, item) => {
    const isTranslate = wrapSchema?.[item].type === 'value';
    if (!isTranslate) {
      return {
        ...memo,
        [`${wrapPrefix}${item}`]: {
          ...wrapSchema?.[item],
        },
      };
    }

    return {
      ...memo,
      [`${wrapPrefix}${item}`]: {
        ...wrapSchema?.[item],
        max: transLateNumber(
          +scaleNumber(wrapSchema?.[item]?.scale || 0, wrapSchema?.[item]?.max || 0),
          wrapSchema?.[item]?.scale
        ), // 转化
        min: transLateNumber(
          +scaleNumber(wrapSchema?.[item]?.scale || 0, wrapSchema?.[item]?.min || 0),
          wrapSchema?.[item]?.scale
        ), // 转化
        step: transLateNumber(
          +scaleNumber(wrapSchema?.[item]?.scale || 0, wrapSchema?.[item]?.step || 0),
          wrapSchema?.[item]?.scale
        ), // 转化
      },
    };
  }, {});

  return {
    prefix: wrapPrefix,
    schema: result as Partial<{ [props: string]: DpSchema }>,
  };
};

export default useDpSchema;
