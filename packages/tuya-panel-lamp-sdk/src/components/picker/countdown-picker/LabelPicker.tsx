/* eslint-disable react/jsx-props-no-spreading */
import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker, TYText, Utils } from 'tuya-panel-kit';
import { useControllableValue } from 'ahooks';
import { PickerUnitProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;

const PickerUnit: FC<PickerUnitProps> = props => {
  const { style, label, list, defaultValue, ...restProps } = props;
  const [value, setValue] = useControllableValue(props, { defaultValue });

  return (
    <View style={[styles.container, style]}>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        theme={{ fontSize: cx(40) }}
        visibleItemCount={7}
        selectedValue={value}
        onValueChange={setValue}
        {...restProps}
      >
        {list.map(v => (
          <Picker.Item key={v} value={v} label={v} />
        ))}
      </Picker>
      <TYText style={styles.label} text={label} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  label: {
    fontSize: cx(14),
    marginTop: cx(10),
  },
  picker: {
    height: cx(324),
    width: cx(60),
  },
  pickerItem: {
    height: cx(324),
  },
});

export default PickerUnit;
