import React, { FC, useState, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Utils, Button, TYText } from 'tuya-panel-kit';

import CustomKeyboard from '../custom-keyboard';
import { getPswMaxLen, getDefaultRandomLen } from '../utils';
import { IRandomPasswordProps, IDefaultProps } from './interface';

const { convertX: cx, width } = Utils.RatioUtils;

function wrapPsd(psd: string) {
  return psd.indexOf('******') !== -1 ? psd.replace('******', '') : psd;
}

const RandomPassword: FC<IRandomPasswordProps> = ({
  savePassword,
  passwordColor,
  randomText,
  randomTextColor,
  themeColor,
  wrapperStyle,
  style,
  password,
  digitalBase,
  confirmText,
  isHideZero,
}) => {
  const maxLen = getPswMaxLen(+digitalBase); // 密码最大长度
  const maxNum = isHideZero ? +digitalBase : +digitalBase - 1; // 支持的最大数字
  const defaultRandomLen = getDefaultRandomLen(+digitalBase); // 默认的随机生成密码长度

  const pswColor = passwordColor || themeColor;
  const randomColor = randomTextColor || themeColor;

  const [currPassword, setCurrPassword] = useState(password || '');
  const [showKeyBoard, setShowKeyBoard] = useState(false);

  const onValueChange = item => {
    const len = currPassword.length;
    if (len < maxLen && item >= 0 && item <= maxNum) {
      setCurrPassword(wrapPsd(`${currPassword}${item}`));
      if (typeof savePassword === 'function') {
        savePassword(wrapPsd(`${currPassword}${item}`));
      }
    } else if (item === -1) {
      setCurrPassword(wrapPsd(currPassword.substring(0, len - 1)));
      if (typeof savePassword === 'function') {
        savePassword(wrapPsd(currPassword.substring(0, len - 1)));
      }
    }
  };

  // 获取随机密码
  const getRandomPassword = () => {
    let result = '';
    const arr = new Array(defaultRandomLen).fill(0);
    arr.forEach(_ => {
      const _item = Math.round(Math.random() * maxNum);
      const item = isHideZero && _item === 0 ? _item + 1 : _item;
      result += item.toString();
    });
    setCurrPassword(result);
    if (typeof savePassword === 'function') {
      savePassword(result);
    }
  };

  const getFontsize = useCallback(() => {
    return currPassword.length > 8 ? cx(20) : cx(24);
  }, [currPassword]);

  return (
    <View style={[styles.container, wrapperStyle]}>
      <TouchableOpacity activeOpacity={1} onPress={() => setShowKeyBoard(true)}>
        <View style={[styles.pwdRandom, style]}>
          <TYText style={[styles.pwdText, { color: pswColor, fontSize: getFontsize() }]}>
            {currPassword}
          </TYText>
          <Button
            wrapperStyle={{
              height: cx(60),
              alignItems: 'center',
              justifyContent: 'center',
            }}
            style={{
              height: cx(60),
            }}
            text={randomText || 'Random'}
            textStyle={[styles.randomText, { color: randomColor }]}
            onPress={getRandomPassword}
          />
        </View>
      </TouchableOpacity>
      <CustomKeyboard
        visible={showKeyBoard}
        onMaskPress={() => setShowKeyBoard(false)}
        maxNum={maxNum}
        confirmText={confirmText}
        isHasZero={!isHideZero}
        onConfirm={() => setShowKeyBoard(false)}
        onValueChange={item => onValueChange(item)}
        themeColor={themeColor}
      />
    </View>
  );
};

RandomPassword.defaultProps = IDefaultProps;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    height: cx(60),
    justifyContent: 'center',
    padding: cx(16),
    width,
  },
  pwdRandom: {
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderColor: 'rgba(0,0,0,0.08)',
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    height: cx(60),
    justifyContent: 'space-between',
    padding: cx(16),
    width: width - cx(48),
  },
  pwdText: {
    backgroundColor: 'transparent',
    fontSize: cx(24),
    fontWeight: 'bold',
    letterSpacing: cx(8),
  },
  randomText: {
    fontSize: cx(12),
    fontWeight: 'bold',
  },
});

export default RandomPassword;
