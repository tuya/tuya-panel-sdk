import React from 'react';
import { Image, View, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from 'react-native';
import { TYText, Dialog, Utils } from 'tuya-panel-kit';

import Res from '../../res';
import Strings from './i18n';

const { convertX: cx } = Utils.RatioUtils;

interface DisturbProps {
  style?: StyleProp<ViewStyle>;
  title?: string;
  titleStyle?: StyleProp<ViewStyle>;
  subTitle?: string;
  subTitleStyle?: StyleProp<ViewStyle>;
  note?: string;
  noteStyle?: StyleProp<ViewStyle>;
  backgroundImage?: string;
  confirmText?: string;
}
const useDisturbDialog = (props: DisturbProps = { title: Strings.getLang('disturbTitle') }) => {
  const {
    style = { width: cx(311) },
    title = Strings.getLang('disturbTitle'),
    titleStyle,
    subTitle = Strings.getLang('disturbDesc'),
    subTitleStyle,
    backgroundImage = Res.disturbBg,
    note = Strings.getLang('disturbTips'),
    noteStyle,
    confirmText = Strings.getLang('ok'),
  } = props;
  return Dialog.custom({
    title: '',
    footer: () => <></>,
    header: () => <></>,
    confirmText: '',
    cancelText: '',
    content: (
      <View style={style}>
        <Image style={styles.tipsBg} source={backgroundImage} />
        <View style={{ width: '100%', paddingHorizontal: cx(25) }}>
          <TYText style={[styles.tipsTitle, titleStyle]}>{title}</TYText>
          <TYText style={[styles.subTitle, subTitleStyle]}>{subTitle}</TYText>
          <View style={[styles.noteBox, noteStyle]}>
            <TYText style={styles.note}>{note}</TYText>
          </View>
        </View>
        <TouchableOpacity
          style={styles.confirmBox}
          onPress={() => {
            Dialog.close();
          }}
        >
          <TYText style={styles.confirm}>{confirmText}</TYText>
        </TouchableOpacity>
      </View>
    ),
    onConfirm: (data, { close }) => {
      close();
    },
  });
};
const styles = StyleSheet.create({
  box: {
    borderRadius: cx(16),
    marginBottom: cx(12),
    shadowColor: '#000',
    shadowOffset: {
      width: cx(4),
      height: cx(12),
    },
    shadowOpacity: 0.04,
    shadowRadius: cx(16),
  },
  confirm: {
    color: '#fff',
    fontSize: cx(16),
  },
  confirmBox: {
    alignItems: 'center',
    borderTopColor: 'rgba(255,255,255,.1)',
    borderTopWidth: 1,
    height: cx(55),
    justifyContent: 'center',
    width: '100%',
  },
  note: {
    color: 'rgba(255,255,255,0.70)',
    fontSize: cx(14),
    marginHorizontal: cx(12),
    marginVertical: cx(8),
    textAlign: 'justify',
  },
  noteBox: {
    backgroundColor: 'rgba(255,255,255,.18)',
    borderRadius: cx(7),
    marginBottom: cx(32),
    marginTop: cx(8),
    overflow: 'hidden',
    width: '100%',
  },
  subTitle: {
    color: '#fff',
    fontSize: cx(14),
    marginTop: cx(20),
    textAlign: 'justify',
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: cx(14),
    fontWeight: 'bold',
  },
  tipsBg: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  tipsTitle: {
    color: '#fff',
    fontSize: cx(26),
    fontWeight: 'bold',
    marginVertical: cx(32),
  },
});
export default useDisturbDialog;
