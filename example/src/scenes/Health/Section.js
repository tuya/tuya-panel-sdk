import React, { SFC } from 'react';
import { View, StyleSheet } from 'react-native';
import { TYText, Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

const Section = props => {
  // eslint-disable-next-line react/prop-types
  const { title, children } = props;
  return (
    <View style={styles.box}>
      <TYText style={styles.title}>{title}</TYText>
      <View style={{ marginVertical: 12 }}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    minHeight: 200,
  },
  title: {
    backgroundColor: '#F0F0F0',
    fontSize: cx(22),
    marginVertical: cx(10),
    paddingHorizontal: cx(10),
    paddingVertical: cx(10),
  },
});
export default Section;
