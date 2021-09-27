import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Utils } from 'tuya-panel-kit';
import { useControllableValue } from 'ahooks';
import _ from 'lodash';
import Strings from './i18n';
import { WeekGroupProps } from './interface';

const { convertX: cx } = Utils.RatioUtils;
const DefaultValue: number[] = Array(7).fill(0);
const weekGroupData = _.times(7, v => ({
  key: v,
  name: Strings.getLang(`WeekGroup_week${v}` as any),
}));

const WeekGroup: React.FC<WeekGroupProps> = props => {
  const {
    style,
    theme,
    background,
    activeColor = '#1082FE',
    size = cx(40),
    accessibilityLabel = 'WeekGroup',
    disabled,
    defaultValue = DefaultValue,
  } = props;

  const [value, setValue] = useControllableValue(props, { defaultValue });

  const handlePress = (index: number) => {
    setValue?.(value.map((v, i) => (i === index ? +!+v : v)));
  };

  return (
    <View style={[styles.container, style]} accessibilityLabel={accessibilityLabel}>
      {weekGroupData.map(({ key, name }, index) => {
        const isActive = !!value[key];
        return (
          <Button
            key={key}
            theme={theme}
            background={isActive ? activeColor : background}
            size={size}
            text={name}
            disabled={disabled}
            onPress={() => handlePress(index)}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default WeekGroup;
