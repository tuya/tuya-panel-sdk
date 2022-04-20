import React from 'react';
import { Text, Image, StyleSheet } from 'react-native';
import { SendEmail, Utils } from '@tuya/tuya-panel-sensing-sdk';

const { cx } = Utils;
const iconExport = require('./res/icon_export.png');

export default () => {
  const exportFn = email => {
    console.log('email', email);
  };

  const beforeExport = () => {
    console.log('nhuihn');
  };

  return (
    <SendEmail
      exportCallback={exportFn}
      beforeExport={beforeExport}
      containerStyle={styles.modalItem}
      inputWrapperStyle={{ backgroundColor: '#1C1C1E' }}
      inputStyle={{ color: '#ffffff' }}
      titleStyle={{ color: '#ffffff', paddingVertical: cx(16) }}
      cancelTextStyle={styles.cancelTextStyle}
      confirmTextStyle={styles.confirmTextStyle}
      contentStyle={styles.contentStyle}
      placeholderTextColor="#1B7878"
    >
      <Text style={{ color: '#000000' }}>邮箱</Text>
      <Image source={iconExport} />
    </SendEmail>
  );
};

const styles = StyleSheet.create({
  cancelTextStyle: {
    backgroundColor: '#1C1C1E',
    color: '#FFFFFF',
    flex: 1,
    lineHeight: 55,
    width: cx(155),
  },
  confirmTextStyle: {
    backgroundColor: '#1C1C1E',
    color: '#1B7878',
    flex: 1,
    lineHeight: 55,
    opacity: 1,
    width: cx(158),
  },
  contentStyle: {
    backgroundColor: '#1C1C1E',
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
  },

  modalItem: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
  },
});
