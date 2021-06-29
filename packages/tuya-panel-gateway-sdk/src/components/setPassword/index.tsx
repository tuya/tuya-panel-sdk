import React, { FC, useState } from 'react';
import { View, TextInput } from 'react-native';
import { Utils, Dialog } from 'tuya-panel-kit';
import Strings from './i18n';
import styles from './styles';
import { SetPasswordProps, SetPasswordModalProps } from './interface';

const { range } = Utils.NumberUtils;

const SetPasswordModal = {
  show: ({
    title = Strings.getLang('pwdTitle'),
    cancelText = Strings.getLang('cancel'),
    confirmText = Strings.getLang('confirm'),
    onConfirm = () => Dialog.close(),
    onCancel = () => Dialog.close(),
    dialogOption,
    dialogElseOption,
    ...rest
  }: SetPasswordModalProps) => {
    Dialog.custom(
      {
        title,
        cancelText,
        confirmText,
        content: <SetPassword {...rest} />,
        onConfirm: (data, { close }) => {
          typeof onConfirm === 'function' && onConfirm();
        },
        onCancel: () => {
          typeof onCancel === 'function' && onCancel();
        },
        ...dialogOption,
      },
      { ...dialogElseOption }
    );
  },
};

const SetPassword: FC<SetPasswordProps> = ({
  keyboardType,
  passwordLength,
  normalDotColor,
  activedDotColor,
  containerStyle,
  passwordRowStyle,
  dotStyle,
  dotMarginHorizontal,
  renderPasswordItem,
  onChangeText: customOnChangeText,
}: SetPasswordProps) => {
  const [password, setPassword] = useState('');

  const renderItem = (d: number, i: number) => {
    return (
      <View
        style={[
          styles.dot,
          dotStyle,
          {
            marginHorizontal: dotMarginHorizontal,
            backgroundColor: i < password.length ? activedDotColor : normalDotColor,
          },
        ]}
        key={d}
      />
    );
  };

  const onChangeText = (value: string) => {
    let res = value;
    if (typeof customOnChangeText === 'function') {
      res = customOnChangeText(value);
    }
    setPassword(res);
  };
  const renderPwd = () => {
    return (
      <View style={[styles.mainContainer, containerStyle]}>
        <View style={[styles.row, passwordRowStyle]}>
          {range(0, passwordLength, 1).map(renderPasswordItem || renderItem)}
        </View>
        <TextInput
          keyboardType={keyboardType}
          underlineColorAndroid="transparent"
          style={styles.input}
          onChangeText={onChangeText}
          maxLength={passwordLength}
          selectTextOnFocus={false}
          numberOfLines={1}
          autoFocus
        />
      </View>
    );
  };
  return <>{renderPwd()}</>;
};

SetPassword.defaultProps = {
  keyboardType: 'numeric',
  passwordLength: 4,
  normalDotColor: 'transparent',
  activedDotColor: '#333',
  containerStyle: {},
  passwordRowStyle: {},
  dotStyle: {},
  dotMarginHorizontal: 10,
  renderPasswordItem: null,
  onChangeText: null,
};

export { SetPassword, SetPasswordModal };
