/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TYText, Utils, IconFont } from 'tuya-panel-kit';

const chargePath =
  'M574.6688 430.3872h234.0864L393.216 1010.9952l56.0128-430.3872H215.1424L630.784 0l-56.0128 430.3872z';
const { convertX: cx } = Utils.RatioUtils;
interface BatteryProps {
  /**
   * 电池电量
   */
  total: number;
  /**
   * 主题色
   */
  themeColor: string;
  /**
   * 充电状态
   */
  chargeState: boolean;
  /**
   * 设备在线状态
   */
  deviceOnline: boolean;
}
const checkResult = (index: number, total: number): boolean => {
  return total >= index * 10;
};
const widthList = [34, 32, 30, 28, 26, 24, 22, 20, 18, 16];
const Battery = ({ themeColor = '#72E19A', chargeState, deviceOnline, total }: BatteryProps) => {
  return (
    <View style={styles.wrapper}>
      <TYText
        style={[
          styles.label,
          !deviceOnline && styles.textDisabled,
          chargeState ? styles.mB5 : styles.mB14,
        ]}
      >
        {`${total}%`}
      </TYText>
      {chargeState ? (
        <IconFont
          viewBox="0 0 1024 1024"
          d={chargePath}
          size={cx(17)}
          color={themeColor}
          style={styles.icon}
        />
      ) : null}
      <View style={styles.battery}>
        {widthList.map((item: number, index: number) => {
          return (
            <View
              key={item}
              style={[
                styles.base,
                checkResult(10 - index, total) ? styles.active : styles.noActive,
                !deviceOnline && styles.disabled,
                { width: cx(item) },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Battery;

const styles = StyleSheet.create({
  active: {
    backgroundColor: '#72E19A',
  },
  base: {
    borderRadius: cx(2.5),
    height: cx(3),
    marginBottom: cx(11),
    width: cx(18),
  },
  battery: {
    alignItems: 'flex-end',
    display: 'flex',
  },
  disabled: {
    backgroundColor: '#797A80',
  },
  icon: {
    marginBottom: cx(2),
  },
  label: {
    color: '#72E19A',
    fontSize: cx(14),
    fontWeight: 'bold',
    lineHeight: cx(18),
  },
  mB14: {
    marginBottom: cx(14),
  },
  mB5: {
    marginBottom: cx(5),
  },
  noActive: {
    backgroundColor: '#797A80',
  },
  textDisabled: {
    color: '#797A80',
  },
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    width: cx(60),
  },
});
