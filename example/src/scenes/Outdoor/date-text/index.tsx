import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DateText } from '@tuya/tuya-panel-outdoor-sdk';

const LocationTextView = () => {
  return (
    <View>
      <View style={styles.line}>
        <DateText
          date="2021-09-05 12:11:11"
          from="2021-09-05 09:09:03"
          format="max"
          style={{
            color: 'red',
            fontSize: 18,
          }}
        />
      </View>
      <View style={styles.line}>
        <DateText
          date="2021-09-05 12:11:11"
          from="2021-09-15 09:09:03"
          format="max"
          style={{
            color: 'red',
            fontSize: 18,
          }}
        />
      </View>
      <View style={styles.line}>
        <DateText
          time={34 * 6700}
          format="max"
          style={{
            color: 'red',
            fontSize: 18,
          }}
        />
      </View>
      <View style={styles.line}>
        <DateText
          time={34 * 6700}
          format="max2"
          style={{
            color: 'green',
            fontSize: 18,
          }}
        />
      </View>
      <View style={styles.line}>
        <DateText
          time={34 * 6700}
          format="max2"
          lang="zh"
          space={false}
          style={{
            color: 'green',
            fontSize: 18,
          }}
        />
      </View>
      <View style={styles.line}>
        <DateText
          date="2021-09-27 12:12:12"
          from="2021-09-08 10:10:10"
          tail={false}
          format="dhms"
        />
      </View>
      <View style={styles.line}>
        <DateText time={4000} format="hm" tail={false} />
      </View>
    </View>
  );
};
export default LocationTextView;

const styles = StyleSheet.create({
  line: {
    marginTop: 30,
    paddingLeft: 20,
  },
});
