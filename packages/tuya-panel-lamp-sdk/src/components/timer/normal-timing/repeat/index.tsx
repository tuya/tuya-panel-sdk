/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TYText, Utils, IconFont, TYSdk } from 'tuya-panel-kit';
import _ from 'lodash';
import Strings from '../i18n/index';
import { IWeekRepeatProps } from './interface';
import CustomTopBar from '../components/CustomTopBar';

const {
  RatioUtils: { convertX: cx },
} = Utils;

const weekData = _.times(7, v => ({
  key: v,
  name: Strings.getLang(`TYLamp_day${v}` as any),
}));

const Repeat: React.FC<IWeekRepeatProps> = props => {
  const {
    route: {
      params: {
        useNavigation = true,
        weeks = [0, 0, 0, 0, 0, 0, 0, 0],
        themeColor,
        backgroundColor,
        weekOptionStyle: {
          centerBgc = 'rgba(0,0,0,0.05)',
          borderBottomColor = 'rgba(0,0,0,0.1)',
          borderColor = 'rgba(0,0,0,0.2)',
        },
        onChange,
      },
    },
  } = props;
  const initWeeks = (d: number[]) => {
    return _.isEqual(d, [1, 1, 1, 1, 1, 1, 1, 0]) ? [0, 0, 0, 0, 0, 0, 0, 0] : d;
  };

  const [currWeeks, setCurrWeeks] = useState(() => initWeeks(weeks));

  useEffect(() => {
    initWeeks(weeks);
  }, weeks);

  const handleClick = (index: any) => {
    const newWeeks = [...currWeeks];
    newWeeks[index] = newWeeks[index] ? 0 : 1;
    setCurrWeeks(newWeeks);
  };

  const handleSave = () => {
    onChange && onChange(currWeeks);
    if (useNavigation) {
      props.navigation && props.navigation.goBack();
    } else {
      // @ts-ignore
      TYSdk.Navigator.pop();
    }
  };

  const handleBack = () => {
    if (useNavigation) {
      props.navigation && props.navigation.goBack();
    } else {
      // @ts-ignore
      TYSdk.Navigator.pop();
    }
  };

  return (
    <View style={[styles.flex1, { backgroundColor }]}>
      <CustomTopBar
        themeColor={themeColor}
        title={Strings.getLang('TYLamp_custom')}
        onSave={handleSave}
        onBack={handleBack}
      />
      {/* Text tip */}
      <View style={[styles.weeks, { backgroundColor: centerBgc }]}>
        {weekData.map(({ key, name }, index) => {
          const isActive = !!currWeeks[key];
          return (
            <TouchableOpacity style={styles.week} key={key} onPress={() => handleClick(key)}>
              <View
                style={[
                  styles.week,
                  index === 6 && {
                    borderBottomWidth: 0,
                  },
                  {
                    borderBottomColor,
                  },
                ]}
              >
                <TYText style={styles.weekName}>{name}</TYText>
                {isActive ? (
                  <IconFont
                    name="correct"
                    size={cx(18)}
                    color={themeColor}
                    style={{ marginRight: cx(16) }}
                  />
                ) : (
                  <View style={[styles.textStyle, { borderColor }]} />
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    alignItems: 'center',
    flex: 1,
  },
  textStyle: {
    borderRadius: Math.round(cx(9)),
    borderWidth: 1,
    height: cx(18),
    marginRight: cx(16),
    overflow: 'hidden',
    width: cx(18),
  },
  week: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'transparent',
    flexDirection: 'row',
    height: cx(70),
    justifyContent: 'space-between',
    width: '100%',
  },
  weekName: {
    fontSize: cx(16),
  },
  weeks: {
    alignItems: 'center',
    borderRadius: Math.round(cx(16)),
    marginHorizontal: cx(24),
    marginTop: cx(16),
    overflow: 'hidden',
    paddingLeft: cx(24),
  },
});

export default Repeat;
