import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TYSdk } from 'tuya-panel-kit';
import {
  AlarmCloud,
  Utils,
  useBoolean,
  WhiteSpace,
  useDpSchema,
} from '@tuya/tuya-panel-sensing-sdk';

const { cx } = Utils;
const Alarm = () => {
  const [visible, { set }] = useBoolean(false);

  const schema = useDpSchema(TYSdk.devInfo.schema, 'schema');

  const onChange = () => {};

  const commonStepMixProps = {
    min: 0,
    max: 100,
    style: styles.stepper,
    ellipseIconColor: '#7F7F7F',
    placeholderTextColor: '#FFFFFF',
    buttonStyle: styles.stepperBtn,
    stepValue: 1,
    inputStyle: styles.stepperInput,
    editable: false,
  };

  return (
    <View style={{ paddingLeft: cx(16), paddingRight: cx(16) }}>
      <AlarmCloud
        style={[
          { backgroundColor: '#1C1C1E' },
          styles.temperatureAlarm,
          { paddingBottom: visible ? 20 : 0 },
        ]}
        title="湿度告警"
        titleStyle={[{ color: 'rgba(255,255,255,0.9)' }, styles.title]}
        switchButtonProps={{
          tintColor: 'rgba(255,255,255,0.5)',
          onTintColor: '#37D4CF',
          value: visible,
          onValueChange: set,
        }}
        multiSliderProps={{
          enabledTwo: true,
          enableLabel: true,
          snapped: false,
          markerOffsetY: 2,
          sliderLength: cx(303),
          labelTextColor: '#ffffff',
          min: 0,
          max: 100,
          markerStyle: {
            backgroundColor: '#5A5A63',
            borderColor: '#5A5A63',
            shadowColor: '#5A5A63',
          },
          step: 1,
          selectedStyle: { backgroundColor: '#37D4CF' },
          values: [0, 100],
          unit: '%',
          onValuesChangeFinish: onChange,
        }}
      />
      <WhiteSpace size="sm" />
      <AlarmCloud
        showStepComp
        style={[
          { backgroundColor: '#1C1C1E' },
          styles.temperatureAlarm,
          { paddingBottom: visible ? 20 : 0 },
        ]}
        title="温度告警"
        titleStyle={[{ color: 'rgba(255,255,255,0.9)' }, styles.title]}
        switchButtonProps={{
          tintColor: 'rgba(255,255,255,0.5)',
          onTintColor: '#37D4CF',
          value: visible,
          onValueChange: set,
        }}
        multiSliderProps={{
          enabledTwo: true,
          enableLabel: true,
          snapped: false,
          markerOffsetY: 2,
          sliderLength: cx(303),
          labelTextColor: '#ffffff',
          min: 0,
          max: 100,
          markerStyle: {
            backgroundColor: '#5A5A63',
            borderColor: '#5A5A63',
            shadowColor: '#5A5A63',
          },
          step: 1,
          selectedStyle: { backgroundColor: '#FF8E00' },
          values: [0, 100],
          onValuesChangeFinish: onChange,
          unit: 'c',
        }}
        minTitle="最小值"
        maxTitle="最大值"
        stepMixProps={{
          ...commonStepMixProps,
          value: 22,
          onValueChange: () => undefined,
        }}
        stepMaxProps={{
          ...commonStepMixProps,
          value: 33,
          onValueChange: () => undefined,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  stepper: {
    backgroundColor: '#000000',
    borderRadius: cx(8),
    padding: cx(1),
    width: cx(138),
  },
  stepperBtn: {
    backgroundColor: '#2D2D2D',
    borderRadius: cx(8),
    width: cx(42),
  },
  stepperInput: {
    color: '#FFFFFF',
    fontSize: cx(12),
    width: cx(40),
  },
  temperatureAlarm: {
    borderRadius: 8,
    justifyContent: 'flex-start',
    marginTop: 15,
    paddingLeft: cx(16),
    paddingRight: cx(16),
    paddingTop: 10,
  },
  title: {
    flex: 1,
  },
});

export default Alarm;
