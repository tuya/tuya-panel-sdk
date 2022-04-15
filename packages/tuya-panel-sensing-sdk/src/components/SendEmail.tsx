import React, { FC } from 'react';
import { Button, StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Dialog, DialogPromptProps } from 'tuya-panel-kit';
import { SensingUtils } from '../szos-utils-sdk';
import { cx, notification } from '../utils';

interface SendEmailProps extends DialogPromptProps {
  errInfo?: {
    emptyText: string;
    illegalText: string;
  };
  containerStyle?: StyleProp<ViewStyle>;
  exportCallback?: (email: string) => void;
  beforeExport?: () => void;
}

const SendEmail: FC<SendEmailProps> = props => {
  const {
    children,
    title,
    errInfo,
    containerStyle,
    exportCallback,
    beforeExport,
    ...promptProps
  } = props;

  const onPress = () => {
    beforeExport && beforeExport();
    Dialog.prompt({
      title: '邮箱',
      cancelText: '取消',
      confirmText: '导出',
      placeholder: '请输入邮箱地址',
      titleStyle: styles.titleStyle,
      cancelTextStyle: styles.cancelTextStyle,
      confirmTextStyle: styles.confirmTextStyle,
      selectionColor: '#37D4CF',
      contentStyle: styles.contentStyle,
      inputStyle: styles.inputStyle,
      textContentType: 'emailAddress',
      defaultValue: '',
      onConfirm: async (email, { close }) => {
        close();
        try {
          await close();
          if (!email) {
            return notification({
              message: errInfo?.emptyText || '邮箱不能为空',
              variant: 'error',
              autoCloseTime: 1000,
            });
          }
          if (!SensingUtils.validateEmail(email)) {
            return notification({
              message: errInfo?.illegalText || '邮箱不合法,请重新输入',
              variant: 'error',
              enableClose: false,
              autoCloseTime: 500,
            });
          }
          return exportCallback && exportCallback(email);
        } catch (error) {
          __DEV__ && console.log('error', error);
          throw error;
        }
      },
      ...promptProps,
    });
  };

  return (
    <>
      <TouchableOpacity style={containerStyle} activeOpacity={0.3} onPress={onPress}>
        {children || (
          <Button title="导出" onPress={onPress}>
            导出
          </Button>
        )}
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  cancelTextStyle: {
    color: '#FFFFFF',
    flex: 1,
    lineHeight: 55,
    width: cx(155),
  },
  confirmTextStyle: {
    color: '#1B7878',
    flex: 1,
    lineHeight: 55,
    opacity: 1,
    width: cx(158),
  },
  contentStyle: {
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
  },
  inputStyle: {
    paddingBottom: cx(16),
    paddingLeft: cx(20),
  },
  titleStyle: {
    paddingVertical: cx(16),
  },
  value: {
    marginRight: 15,
  },
});
export default SendEmail;
