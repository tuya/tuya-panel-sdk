import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Utils,
  TYText as TYTextBase,
  RefText as RefTextBase,
  IconFont,
  TYSdk,
  I18N,
  UnitText,
} from '@tuya-rn/tuya-native-components';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import isUndefined from 'lodash/isUndefined';

import icons from './icons';
import { handleError } from '../../../utils/FunctionUtils';
import { createDpValue$ } from '../../../utils/RxUtils';


const defaultiI18n = new I18N();
const TYText = TYTextBase || RefTextBase;

const {
  RatioUtils: { convert },
  ColorUtils: { color: Color },
} = Utils;

interface ItemProps {
  id: string;
  code: string;
  themeColor: string;
  value?: number | string | undefined;
  isStatic: boolean;
  i18n: any;
  isNumUnitText: boolean;
  isDpUnit: boolean;
  numTextSize: number;
  descTextSize: number;
  formatValue: (value: any) => any;
  vFlip: boolean;
}

interface ItemState {
  value: number;
}

export enum CleanInfoEnum {
  CleanArea = 'CleanArea',
  CleanTime = 'CleanTime',
  Electric = 'Electric',
}

const infoIconMap = {
  [CleanInfoEnum.CleanArea]: icons.m,
  [CleanInfoEnum.CleanTime]: icons.minute,
  [CleanInfoEnum.Electric]: icons.percent,
};

export default class Item extends PureComponent<ItemProps, ItemState> {
  static defaultProps = {
    isStatic: false,
    isNumUnitText: false, // 数字部分是否是iconfont
    isDpUnit: false, // 是否使用dp点单位 dp_unit
    numTextSize: convert(20), // 数字大小
    descTextSize: convert(10), // 文字大小
    formatValue: (d: any) => d,
    vFlip: false,
  };

  state = {
    value: 0,
  };

  $dpSubscription: Subscription;
  isStatic: boolean;

  constructor(props: ItemProps) {
    super(props);
    // this.isStatic = !isUndefined(props.value);
  }

  componentDidMount() {
    if (this.props.isStatic) return;
    const { code, formatValue } = this.props;
    const { scale = 0 } = TYSdk.device.getDpSchema(code) || {};
    const $value = createDpValue$(code).pipe(
      map((d: any) => {
        return formatValue(d);
      }),
      map((d: any) => parseFloat((d / 10 ** scale).toFixed(1)))
    );
    this.$dpSubscription = $value.subscribe((value: number) => {
      this.setState({ value });
    }, handleError);
  }

  componentWillUnmount() {
    if (this.props.isStatic) return;
    this.$dpSubscription.unsubscribe();
  }

  renderUnit() {
    const { isDpUnit, code, i18n, themeColor, id, vFlip } = this.props;
    const icon = infoIconMap[id as CleanInfoEnum];
    if (isDpUnit)
      return (
        <TYText style={[styles.textUnit, { color: themeColor }]}>
          {(i18n || defaultiI18n).getDpLang(code, 'unit')}
        </TYText>
      );
    return (
      <IconFont
        d={icon}
        color={Color.hex2RgbString(themeColor, 0.6)}
        size={convert(16)}
        vFlip={vFlip}
      />
    );
  }

  render() {
    const {
      code,
      themeColor,
      isStatic,
      i18n,
      isNumUnitText,
      numTextSize,
      descTextSize,
    } = this.props;
    if (isStatic && isUndefined(this.props.value)) return null;
    if (!TYSdk.device.checkDpExist(code)) return null;

    const value = isStatic ? this.props.value : this.state.value;
    const fontStyle = { color: themeColor };
    const numberStyle = { ...fontStyle, fontSize: numTextSize };
    const descStyle = { ...fontStyle, fontSize: descTextSize };

    return (
      <View style={styles.item}>
        <View style={styles.header}>
          {isNumUnitText ? (
            <UnitText valueSize={numTextSize} valueColor={themeColor} value={`${value}`} />
          ) : (
            <TYText style={[styles.number, numberStyle]}>{value}</TYText>
          )}
          {this.renderUnit()}
        </View>
        <TYText style={[styles.desc, descStyle]} numberOfLines={1}>
          {(i18n || defaultiI18n).getDpLang(code)}
        </TYText>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  desc: {
    textAlign: 'center',
    fontSize: convert(10),
    marginTop: convert(5),
  },
  number: {
    fontSize: convert(20),
    // lineHeight: convert(24),
    minWidth: convert(35),
    textAlign: 'right',
    marginRight: convert(2),
  },
  textUnit: {
    fontSize: 10,
    // color: 'rgba(255,255,255, 1)',
    marginBottom: 2,
  },
});
