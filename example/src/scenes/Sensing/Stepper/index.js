import React from 'react';
import { StyleSheet } from 'react-native';
import { Theme } from 'tuya-panel-kit';
import { Stepper, Utils } from '@tuya/tuya-panel-sensing-sdk';

const { cx } = Utils;
const Demo = () => {
  const commonStepMixProps = {
    style: styles.stepper,
    ellipseIconColor: '#7F7F7F',
    placeholderTextColor: '#FFFFFF',
    buttonStyle: styles.stepperBtn,
    inputStyle: styles.stepperInput,
    editable: false,
  };
  return (
    <Theme theme={{}}>
      <Stepper
        min={0}
        max={100}
        ellipseIconColor="#7F7F7F"
        placeholderTextColor="#FFFFFF"
        value={20}
        stepValue={1}
        editable={false}
        {...commonStepMixProps}
      />
    </Theme>
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
});

export default Demo;
