import React, { FC } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TYText, IconFont, Utils } from 'tuya-panel-kit';
import { IRowProps } from '../interface';

const {
  RatioUtils: { convertX: cx },
} = Utils;

const Row: FC<IRowProps> = ({ fontColor, label, value, onPress }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={styles.row}>
      <TYText style={styles.label}>{label}</TYText>
      <View style={styles.right}>
        <TYText style={styles.text} numberOfLines={1} ellipsizeMode="tail">
          {value}
        </TYText>
        <IconFont name="arrow" size={12} color={fontColor} style={{ opacity: 0.7 }} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: cx(14),
  },
  right: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    height: cx(70),
    justifyContent: 'space-between',
    paddingHorizontal: cx(24),
  },
  text: {
    fontSize: cx(12),
    marginRight: cx(4),
  },
});
export default Row;
