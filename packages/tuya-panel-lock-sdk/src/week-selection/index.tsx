import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import Strings from './i18n';
import { WeekSelectionProps, weekItem } from './interface';
import { workingDayString, getWorkDay, getWeekSequence } from './utils/index';

const WeekSelection: React.FC<WeekSelectionProps> = (props: WeekSelectionProps) => {
  const { weekDay, defaultFirstDay, disable, themeColor } = props;
  const [weekData, setWeekData] = useState<weekItem[]>([]);
  const [weekValue, setWeekValue] = useState(workingDayString(weekDay));
  const weekList = getWeekSequence(defaultFirstDay);

  const getWeekData = (value: number[]) => {
    const week = value;
    const choiceWeek: number[] = [];

    const res = weekList.map(
      (item, index): weekItem => {
        if (week[index] === 1 && !disable) {
          choiceWeek.push(1);
          return {
            key: index,
            text: Strings.getLang(`TYLock_${item}`),
            choice: true,
            style: {
              backgroundColor: themeColor,
              width: 44,
              height: 44,
              borderRadius: 44,
            },
            textStyle: { fontSize: 14, color: 'white' },
            onPress: () => onWeekClick(index),
          };
        }
        choiceWeek.push(0);

        return {
          key: index,
          text: Strings.getLang(`TYLock_${item}`),
          type: 'primary',
          choice: false,
          style: {
            borderColor: '#D6D6D6',
            borderWidth: 1,
            backgroundColor: 'white',
            width: 44,
            height: 44,
            borderRadius: 44,
            opacity: props.disable ? 0.5 : 1,
          },
          textStyle: { fontSize: 14, color: 'rgba(51,51,51,0.5)' },
          onPress: () => onWeekClick(index),
        };
      }
    );

    setWeekData(res);

    setWeekValue(choiceWeek);
  };
  React.useEffect(() => {
    getWeekData(weekValue);
  }, [weekDay]);
  const onWeekClick = (item: number) => {
    const currentWeekValue = weekValue;
    currentWeekValue[+item] = currentWeekValue[item] === 1 ? 0 : 1;
    getWeekData(currentWeekValue);
    props.onWeekChange(getWorkDay(currentWeekValue));
  };
  return (
    <View style={[styles.container, props.style]}>
      {weekData.map(item => (
        <TouchableOpacity
          disabled={props.disable}
          key={item.text}
          onPress={item.onPress}
          style={[
            item.style,
            styles.weekDay,
            item.choice ? props.selectedWeekStyle : props.weekStyle,
          ]}
        >
          <TYText
            style={[
              item.textStyle,
              item.choice ? props.selectedWeekTextStyle : props.weekTextStyle,
            ]}
          >
            {item.text}
          </TYText>
        </TouchableOpacity>
      ))}
    </View>
  );
};
WeekSelection.defaultProps = {
  disable: false,
  themeColor: '#338CE5',
  defaultColor: 'white',
  defaultFirstDay: 0,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  weekDay: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default WeekSelection;
