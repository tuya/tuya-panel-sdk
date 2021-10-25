import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DateText } from '@tuya/tuya-panel-outdoor-sdk';

const DateTextView = () => {
  return (
    <View>
      <View style={styles.line}>
        <DateText
          date="2021-09-05 12:11:11"
          from="2021-09-05 09:09:03"
          format="max"
          style={{
            color: 'red',
          }}
        />
        <DateText time={34 * 6700} format="max" />
      </View>

      <View style={styles.line}>
        <DateText date="2021-09-05 12:11:11" from="2021-09-15 09:09:03" format="max" />
        <DateText time={34 * 6700} format="max2" />
      </View>

      <View style={styles.line}>
        <DateText
          time={34 * 6700}
          format="max2"
          lang="zh"
          i18nData={{
            zh: {
              TYOutdoor_after: '后',
            },
          }}
          space={false}
        />
        <DateText time={34 * 6700} format="max2" lang="zh" space={false} />
      </View>

      <View style={styles.line}>
        <DateText date="2021-09-27 12:12:12" from="2021-09-08 10:10:10" tail={false} format="dhm" />

        <DateText
          date="2021-09-27 12:12:12"
          from="2021-09-08 10:10:10"
          tail={false}
          format="hasValue"
        />
      </View>

      <View style={styles.line}>
        <DateText time={4000} tail={false} format="hm" />
        <DateText time={0} tail={false} format="max" />
        <DateText time={0} tail={false} format="max" parseNow={false} lang="zh" />
      </View>
    </View>
  );
};
export default DateTextView;

const styles = StyleSheet.create({
  line: {
    marginTop: 30,
    paddingLeft: 20,
  },
});
