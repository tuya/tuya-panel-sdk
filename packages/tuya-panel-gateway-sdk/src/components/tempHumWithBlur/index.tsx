import React, { FC } from 'react';
import { View, Image } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { BlurView } from '@react-native-community/blur';
import { TempHumWithBlurProps } from './interface';
import styles from './styles';
import Res from './res';
import Strings from './i18n';

const TempHumWithBlur: FC<TempHumWithBlurProps> = ({
  containerStyle,
  blurType,
  blurAmount,
  blurViewStyle,
  showSplit,
  showTemperature,
  temperatureLabel,
  temperatureValue,
  temperatureUnit,
  temperatureIcon,
  showHumidity,
  humidityLabel,
  humidityValue,
  humidityUnit,
  humidityIcon,
  labelStyle,
  valueStyle,
  unitStyle,
  iconStyle,
  renderSplit,
  renderTemperature,
  renderHumidity,
}: TempHumWithBlurProps) => {
  const renderItem = ({ icon, value, label, unit }) => {
    return (
      <View style={styles.tempHumItem}>
        <View style={styles.tempHumItemContent}>
          {!!icon && (
            <Image resizeMode="contain" source={icon} style={[styles.tempHumImage, iconStyle]} />
          )}
          <View style={styles.tempHumItemValueAndUnit}>
            <TYText text={value} style={[styles.tempHumItemValue, valueStyle]} />

            <TYText text={unit} style={[styles.tempHumUnit, unitStyle]} />
          </View>
        </View>
        <TYText text={label} style={[styles.tempHumItemLabel, labelStyle]} />
      </View>
    );
  };

  return (
    <View style={[styles.tempHumContent, containerStyle]}>
      <BlurView
        blurType={blurType}
        style={[styles.tempHumBlurView, blurViewStyle]}
        blurAmount={blurAmount}
      />
      {showSplit &&
        showTemperature &&
        showHumidity &&
        (renderSplit ? renderSplit() : <Image source={Res.splitLine} style={styles.splitLine} />)}
      {showTemperature && renderTemperature
        ? renderTemperature()
        : renderItem({
            icon: temperatureIcon,
            value: temperatureValue,
            label: temperatureLabel,
            unit: temperatureUnit,
          })}
      {showHumidity && renderHumidity
        ? renderHumidity()
        : renderItem({
            icon: humidityIcon,
            value: humidityValue,
            label: humidityLabel,
            unit: humidityUnit,
          })}
    </View>
  );
};
TempHumWithBlur.defaultProps = {
  containerStyle: {},
  blurType: 'xlight',
  blurAmount: 10,
  blurViewStyle: {},
  showSplit: true,
  showTemperature: true,
  temperatureLabel: Strings.getLang('temperature'),
  temperatureValue: 20,
  temperatureUnit: '℃',
  temperatureIcon: Res.temperature,
  showHumidity: true,
  humidityLabel: Strings.getLang('humidity'),
  humidityValue: 32,
  humidityUnit: '%',
  humidityIcon: Res.humidity,
  labelStyle: {},
  valueStyle: {},
  unitStyle: {},
  iconStyle: {},
  renderSplit: null,
  renderTemperature: null,
  renderHumidity: null,
};

export default TempHumWithBlur;
