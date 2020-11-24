import React, { PureComponent } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';
import { Utils } from '@tuya-rn/tuya-native-components';
import Item, { CleanInfoEnum } from './Item';

const {
  RatioUtils: { convertY, convert },
} = Utils;

export { CleanInfoEnum };

interface HistoryCleanInfo {
  [CleanInfoEnum.CleanArea]: string | number;
  [CleanInfoEnum.CleanTime]: string | number;
}

interface RobotCleanInfoProps {
  style?: StyleProp<ViewStyle>;
  cleanAreaCode: string;
  cleanTimeCode: string;
  electricCode: string;
  cleanAreaFormat?: (d: any) => any;
  cleanTimeFormat?: (d: any) => any;
  electricFormat?: (d: any) => any;
  themeColor: string;
  data?: HistoryCleanInfo;
  isStatic: boolean;
  i18n?: any;
  isNumUnitText: boolean;
  isDpUnit?: boolean;
  numTextSize: number;
  descTextSize: number;
  vFlip?: boolean
}

interface ItemData {
  id: CleanInfoEnum;
  code: string;
  format: (d: any) => any;
}

export default class RobotCleanInfo extends PureComponent<RobotCleanInfoProps> {
  static defaultProps = {
    themeColor: '#FFFFFF',
    cleanAreaCode: 'clean_area',
    cleanTimeCode: 'clean_time',
    electricCode: 'residual_electricity',
    data: {},
    isStatic: false,
    isNumUnitText: false, // 数字部分是否是iconfont
    isDpUnit: false,// 是否使用dp点unit
    numTextSize: convert(20), // 数字大小
    descTextSize: convert(10), // 文字大小
    vFlip: false,
  };

  render() {
    const {
      style,
      cleanAreaCode,
      cleanTimeCode,
      electricCode,
      themeColor,
      data,
      isStatic,
      i18n,
      isNumUnitText,
      numTextSize,
      descTextSize,
      cleanAreaFormat,
      cleanTimeFormat,
      electricFormat,
      vFlip,
      isDpUnit,
    } = this.props;
    const dataSource = [
      { id: CleanInfoEnum.CleanArea, code: cleanAreaCode, format: cleanAreaFormat },
      { id: CleanInfoEnum.CleanTime, code: cleanTimeCode, format: cleanTimeFormat },
      { id: CleanInfoEnum.Electric, code: electricCode, format: electricFormat },
    ];
    return (
      <View style={[styles.robot, style]}>
        {dataSource.map(({ code, id, format }: ItemData) => {
          return (
            <Item
              key={code}
              id={id}
              isStatic={isStatic}
              value={data[id]}
              code={code}
              themeColor={themeColor}
              i18n={i18n}
              isNumUnitText={isNumUnitText}
              numTextSize={numTextSize}
              descTextSize={descTextSize}
              formatValue={format}
              vFlip={vFlip}
              isDpUnit={isDpUnit}
            />
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  robot: {
    height: convertY(56),
    flexDirection: 'row',
  },
});
