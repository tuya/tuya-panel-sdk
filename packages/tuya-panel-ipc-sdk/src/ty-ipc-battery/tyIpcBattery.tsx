/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Svg, Path, Polygon } from 'react-native-svg';
import Styles from './style';
import { TYIpcBatteryProps } from './interface';
import publicConfig from '../publicConfig';

const { cx } = publicConfig;

const wrapBatteryD =
  'M6.5,0 C6.77614237,-5.07265313e-17 7,0.223857625 7,0.5 L7,1 L9.5,1 C10.3284271,1 11,1.67157288 11,2.5 L11,17.5 C11,18.3284271 10.3284271,19 9.5,19 L1.5,19 C0.671572875,19 0,18.3284271 0,17.5 L0,2.5 C0,1.67157288 0.671572875,1 1.5,1 L4,1 L4,0.5 C4,0.223857625 4.22385763,5.07265313e-17 4.5,0 L6.5,0 Z M9.5,2 L1.5,2 C1.22385763,2 1,2.22385763 1,2.5 L1,17.5 C1,17.7761424 1.22385763,18 1.5,18 L9.5,18 C9.77614237,18 10,17.7761424 10,17.5 L10,2.5 C10,2.22385763 9.77614237,2 9.5,2 Z';

const TYIpcBattery: React.FC<TYIpcBatteryProps> & {
  defaultProps: Partial<TYIpcBatteryProps>;
} = (props: TYIpcBatteryProps) => {
  const {
    value,
    size,
    batteryBorderColor,
    highColor,
    middleColor,
    lowColor,
    onCalcColor,
    isCharging,
    rotateZ,
    batteryContainer,
    standardDpMode,
    wireless_electricity,
    wireless_powermode,
    battery_report_cap,
    chargingColor,
  } = props;

  const [eleValue, setEleValue] = useState(value);
  const [isEleCharging, setIsEleCharging] = useState(isCharging);

  const addZero = (num, length) => {
    if (`${num}`.length >= length) {
      return num;
    }
    return addZero(`0${num}`, length);
  };

  const getChangeElectricityValue = (wirelessElectricity, wirelessPowermode, batteryReportCap) => {
    // 是否为精确上报
    let reportAccurately = false;
    let eleNumber = 0;
    if (typeof batteryReportCap !== 'undefined') {
      const reportValue = batteryReportCap.toString(2);
      const convertValue = addZero(reportValue, 4);
      if (convertValue[3] === '1') {
        reportAccurately = true;
      }
    }
    // 当不在充电而且上报能力集为精准上报时取上报的值即可,
    // 插电时无法准确上报电量的设备，DP145上报0，禁止非插电时上报DP145为0
    if (wirelessPowermode !== undefined) {
      if (reportAccurately) {
        wirelessElectricity !== undefined && (eleNumber = wirelessElectricity);
      } else {
        // 其他情况取电池的范围上报
        wirelessElectricity !== undefined && (eleNumber = getRealEleValue(wirelessElectricity));
      }
    }
    return eleNumber;
  };

  const getRealEleValue = ele => {
    if (ele <= 5) {
      return 5;
    }
    const _ele = ele % 10 === 5 ? Math.floor(ele / 10) : Math.round(ele / 10);
    return _ele * 10;
  };

  useEffect(() => {
    let currentEleValue = value;
    let isChargPower = isCharging;
    // 如果使用标准dp
    if (standardDpMode) {
      isChargPower = Boolean(wireless_powermode === '1');
      currentEleValue = getChangeElectricityValue(
        wireless_electricity,
        wireless_powermode,
        battery_report_cap
      );
      props.onChangeEleValue && props.onChangeEleValue(currentEleValue);
    }
    setIsEleCharging(isChargPower);
    setEleValue(currentEleValue);
  }, [
    value,
    isCharging,
    standardDpMode,
    wireless_electricity,
    wireless_powermode,
    battery_report_cap,
  ]);

  const calcBattery = () => {
    // 电池为100%, top: 3,电量20%: 14.2 ,电量10%: 15.6,电量为0%，top: 17
    const top = 17 - ((17 - 3) * eleValue) / 100;
    return top;
  };

  const calcColor = () => {
    const top = calcBattery();
    // 自定义电量的颜色分配规则
    const color =
      typeof onCalcColor === 'function' && onCalcColor(top, highColor, middleColor, lowColor);
    if (color) {
      return color;
    }
    if (top <= 14.2 && top >= 3) {
      return highColor;
    }
    if (top <= 15.6 && top > 14.2) {
      return middleColor;
    }
    return lowColor;
  };

  const top = calcBattery();
  const points = `2 ${top} 9 ${top} 9 17 2 17`;
  const insideColor = calcColor();

  return (
    <View
      style={[
        Styles.batteryContainer,
        {
          width: 1.9 * size,
          height: 1.9 * size,
          transform: [{ rotateZ: `${rotateZ}deg` }],
        },
        batteryContainer,
      ]}
    >
      <Svg width={1.1 * size} height={1.9 * size} viewBox="0 0 11 19">
        <Path d={wrapBatteryD} fill={batteryBorderColor} />
        <Polygon points={points} fill={insideColor} />
        {isEleCharging && (
          <Path
            d="M3.2 0L0 5h1.6L.8 9 4 4H2.4z"
            fill={chargingColor}
            fillRule="evenodd"
            x={3.5}
            y={5}
          />
        )}
      </Svg>
    </View>
  );
};

TYIpcBattery.defaultProps = {
  size: Math.ceil(cx(20)),
  batteryBorderColor: 'rgba(0,0,0,.5)',
  value: 0,
  highColor: '#61d914',
  middleColor: '#e38315',
  lowColor: '#d11d14',
  onCalcColor: undefined,
  chargingColor: 'rgba(0,0,0,.5)',
  isCharging: false,
  batteryContainer: {},
  rotateZ: 0,
  standardDpMode: true,
  wireless_electricity: undefined,
  wireless_powermode: undefined,
  battery_report_cap: undefined,
  onChangeEleValue: () => {},
};

export default TYIpcBattery;
