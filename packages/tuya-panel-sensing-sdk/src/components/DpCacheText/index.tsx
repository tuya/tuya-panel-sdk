import React, { FC } from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { IconFont } from 'tuya-panel-kit';
import { cx } from '../../utils';

interface DpCacheTextProps {
  title: string;
  showIcon: boolean;
  style?: StyleProp<ViewStyle | TextStyle>;
}

const DpCacheText: FC<DpCacheTextProps> = props => {
  const { title, showIcon, style } = props;
  if (showIcon) {
    return (
      <View style={[styles.container, style]}>
        <Text numberOfLines={1}>{title}</Text>
        <IconFont name="warning" color="red" size={12} style={styles.icon} />
      </View>
    );
  }
  return (
    <Text style={style} numberOfLines={1}>
      {title}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  icon: {
    marginLeft: cx(4),
  },
});

export default DpCacheText;
