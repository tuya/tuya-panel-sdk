import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, TextInput } from 'react-native';
import { TYText } from 'tuya-panel-kit';

import stepButtonProps from './interface';
import Res from './res';
import styles from './style';

let timer = null;

const StepButton: React.FunctionComponent<stepButtonProps> = props => {
  const {
    min,
    max,
    step,
    initialValue,
    reduceButton,
    addButton,
    unit,
    subUnit,
    speed,
    onValueChange,
    containerStyle,
    numStyle,
    unitStyle,
    subUnitStyle,
  } = props;

  const [_value, setValue] = useState(initialValue);

  const handleAdd = () => {
    let newValue = _value + step;
    if (newValue > max) {
      newValue = max;
    }

    setValue(newValue);
  };

  const handleLongAdd = () => {
    timer = setInterval(() => {
      setValue(value => {
        let newValue = value + step;
        if (newValue > max) {
          newValue = max;
        }

        return newValue;
      });
    }, speed * 1000);
  };

  const handleReduce = () => {
    let newValue = _value - step;
    if (newValue < min) {
      newValue = min;
    }

    setValue(newValue);
  };

  const handleLongReduce = () => {
    timer = setInterval(() => {
      setValue(value => {
        let newValue = value - step;
        if (newValue < min) {
          newValue = min;
        }

        return newValue;
      });
    }, speed * 1000);
  };

  const clearTimer = () => {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  };

  const onChangeText = (value: string) => {
    let newValue = Number(value);
    if (Object.is(newValue, NaN)) return;

    if (newValue < min) newValue = min;

    if (newValue > max) newValue = max;

    setValue(newValue);
  };

  useEffect(() => {
    onValueChange(_value);
  }, [_value]);

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        onPress={handleReduce}
        onLongPress={handleLongReduce}
        onPressOut={clearTimer}
      >
        {reduceButton}
      </TouchableOpacity>
      <View style={styles.textWrap}>
        <TextInput
          style={[styles.value, numStyle]}
          value={_value.toString()}
          onChangeText={onChangeText}
          keyboardType="numeric"
        />
        {unit && <TYText style={[styles.unit, unitStyle]}>{unit}</TYText>}
        {subUnit && (
          <TYText style={[styles.unit, subUnitStyle]}>
            ({_value}
            {subUnit})
          </TYText>
        )}
      </View>
      <TouchableOpacity onPress={handleAdd} onLongPress={handleLongAdd} onPressOut={clearTimer}>
        {addButton}
      </TouchableOpacity>
    </View>
  );
};

StepButton.defaultProps = {
  min: 1,
  max: 100,
  step: 1,
  initialValue: 1,
  reduceButton: (
    <View style={styles.controlButton}>
      <Image source={Res.cutNum} />
    </View>
  ),
  addButton: (
    <View style={styles.controlButton}>
      <Image source={Res.addNum} />
    </View>
  ),
  speed: 0.5,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onValueChange: () => {},
  containerStyle: {},
  numStyle: {},
  unitStyle: {},
  subUnitStyle: {},
};

export default StepButton;
