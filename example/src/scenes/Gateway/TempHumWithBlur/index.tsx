import React, { FC, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, Utils, TopBar } from 'tuya-panel-kit';
import { TempHumWithBlur, TopBarWithArc } from '@tuya/tuya-panel-gateway-sdk';
import Strings from './i18n';

const { convertX: cx } = Utils.RatioUtils;

interface TempHumWithBlurProps {
  title: string;
}
const TopBarWithArcScene: FC<TempHumWithBlurProps> = ({ title }: TempHumWithBlurProps) => {
  const defaultArcHeight = cx(77);
  const defaultTemperatureValue = 20;
  const defaultHumidityValue = 32;
  const defaultValueStyle = {};
  const defaultUnitStyle = {};
  const defaultTemperatureUnit = '℃';
  const defaultFill = 'rgba(0, 0, 0, 0.35)';

  const [fill, setFill] = useState(defaultFill);
  const [temperatureValue, setTemperatureValue] = useState(defaultTemperatureValue);
  const [humidityValue, setHumidityValue] = useState(defaultHumidityValue);

  const [valueStyle, setValueStyle] = useState(defaultValueStyle);
  const [unitStyle, setUnitStyle] = useState(defaultUnitStyle);
  const [temperatureUnit, setTemperatureUnit] = useState<'℃' | '℉'>(defaultTemperatureUnit);

  const changeValue = () => {
    setTemperatureValue(6);
    setHumidityValue(88);
  };
  const changeStyle = () => {
    setValueStyle({ color: 'yellow' });
    setUnitStyle({ color: 'pink' });
  };
  const changeTemperatureUnit = () => {
    setTemperatureUnit('℉');
  };
  const changeTopBarComponentFill = () => {
    setFill('pink');
  };
  const backInitialState = () => {
    setFill(defaultFill);
    setTemperatureValue(defaultTemperatureValue);
    setHumidityValue(defaultHumidityValue);
    setTemperatureUnit(defaultTemperatureUnit);
    setValueStyle(defaultValueStyle);
    setUnitStyle(defaultUnitStyle);
  };
  const exampleConfigList = [
    {
      text: Strings.getLang('changeValue'),
      onPress: changeValue,
    },
    {
      text: Strings.getLang('changeStyle'),
      onPress: changeStyle,
    },
    {
      text: Strings.getLang('changeTemperatureUnit'),
      onPress: changeTemperatureUnit,
    },
    {
      text: Strings.getLang('changeTopBarComponentFill'),
      onPress: changeTopBarComponentFill,
    },
    {
      text: Strings.getLang('backInitialState'),
      onPress: backInitialState,
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <TopBarWithArc title={title} fill={fill} arcHeight={defaultArcHeight} />
      <TempHumWithBlur
        temperatureValue={temperatureValue}
        humidityValue={humidityValue}
        valueStyle={valueStyle}
        unitStyle={unitStyle}
        temperatureUnit={temperatureUnit}
        containerStyle={{
          position: 'absolute',
          top: TopBar.height + defaultArcHeight - cx(92) / 2,
          alignItems: 'center',
          alignSelf: 'center',
        }}
      />
      <ScrollView style={styles.scrollView}>
        <View style={styles.btnContainer}>
          {exampleConfigList.map(({ text, onPress }) => (
            <Button
              key={text}
              style={styles.btn}
              textStyle={styles.btnText}
              text={text}
              onPress={onPress}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#E5E5E5',
    borderRadius: 20,
    margin: 20,
    padding: 20,
  },
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 14,
  },
  scrollView: {
    paddingTop: 50,
  },
});

export default TopBarWithArcScene;
