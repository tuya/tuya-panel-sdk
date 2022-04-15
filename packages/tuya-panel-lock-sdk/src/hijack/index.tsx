/* eslint-disable react-native/no-raw-text */
/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, TextInput, NativeModules } from 'react-native';
import {
  TYListItem,
  Divider,
  SwitchButton,
  Utils,
  TYText,
  GlobalToast,
  IconFont,
} from 'tuya-panel-kit';
import { HijackProps } from './interface';

const Res = {
  choose: require('../res/choosed.png'),
  appMessageImage: require('../res/appMessageImage.png'),
  messageImage: require('../res/messageImage.png'),
  arrow: require('../res/arrow.png'),
};
const { width, convertX: cx } = Utils.RatioUtils;
let timeOut: number;
const Hijack: React.FC<HijackProps> = props => {
  const {
    hasDivider,
    themeColor,
    hijackTitle,
    hijackSubTitle,
    unlockAttr,
    onValueChange,
    appMessageTitle,
    phoneMessageTitle,
    messageTypeTitle,
    codePlaceholder = '',
    phonePlaceholder = '',
    sendCodeTitle = 'Verification code',
    changeHijack,
    scrollUp,
    customGetPhoneCode,
    style,
    lockAttrStyle,
    lockAttrTextStyle,
    lockAttrItemStyle,
  } = props;
  const [isAppSend, setIsAppSend] = useState(false);
  const [isMsgPhone, setIsMsgPhone] = useState(false);
  const [msgPhone, setMsgPhone] = useState('');
  const [msgPhoneVerifyCode, setMsgPhoneVerifyCode] = useState('');
  const [countryCode, setCountryCode] = useState('86');
  const [countDownTime, setCountDownTime] = useState(60);

  React.useEffect(() => {
    if (countDownTime === 0) {
      clearTime();
      setCountDownTime(60);
    }
  }, [countDownTime]);

  const getPhoneCode = () => {
    if (typeof customGetPhoneCode === 'function') {
      customGetPhoneCode()
        .then(() => {
          GlobalToast.show({
            showIcon: false,
            text: '',
          });
          countDown(60);
        })
        .catch(err => {
          const e = typeof err === 'string' ? JSON.parse(err) : err;
          const message = e.errorMsg || err.message;
          GlobalToast.show({
            showIcon: false,
            text: message,
          });
        });
    }
  };

  const clearTime = () => {
    if (typeof timeOut !== 'undefined' && timeOut !== null) {
      clearTimeout(timeOut);
    }
  };

  const countDown = (timeNumber: number) => {
    clearTime();
    if (timeNumber > 0) {
      setCountDownTime((c: number) => c - 1);
      timeOut = setTimeout(() => countDown(timeNumber - 1), 1000);
    }
  };

  const click = item => {
    if (item.key === 'app') {
      setIsAppSend(!item.isSelected);
    }
    if (item.key === 'phone') {
      if (!item.isSelected) {
        scrollUp && scrollUp();
      }
      // 关闭短信通知开关时将原先手机号及验证码数据清空
      setIsMsgPhone(!item.isSelected);
      setMsgPhoneVerifyCode('');
      setMsgPhone('');
    }
    pushDataToFront();
  };
  const pushDataToFront = () => {
    const defaultNotifyInfo = {
      appSend: unlockAttr ? isAppSend : false,
      isMsgPhone: unlockAttr ? isMsgPhone : false,
      msgPhone: unlockAttr ? msgPhone : '',
      msgPhoneVerifyCode: unlockAttr ? msgPhoneVerifyCode : '',
      countryCode: unlockAttr ? countryCode : '86',
    };
    changeHijack && changeHijack({ unlockAttr: unlockAttr ? 1 : 0, notifyInfo: defaultNotifyInfo });
  };

  const DividerView = (marginLeft: number, height = 1) => {
    return (
      <Divider style={{ marginLeft: cx(marginLeft) }} height={height} color="rgba(51,51,51,0.1)" />
    );
  };

  const renderTel = () => (
    <View style={{ marginBottom: 5 }}>
      <View style={styles.inputView}>
        <TouchableOpacity
          onPress={() => {
            /* istanbul ignore next */
            NativeModules.TYRCTCountrySelectManager.show(
              (param: { name: string; code: string }) => {
                if (!param) return;
                const { code } = param;
                setCountryCode(code);
              }
            );
          }}
          style={styles.countryCode}
        >
          <TYText style={[styles.userTip, { marginRight: cx(4) }]}>+{countryCode}</TYText>
          <Image source={Res.arrow} />
        </TouchableOpacity>
        <TextInput
          autoFocus
          style={styles.textInput}
          placeholderTextColor="#b7b7b7"
          placeholder={phonePlaceholder}
          value={msgPhone}
          keyboardType="numeric"
          underlineColorAndroid="transparent"
          onChangeText={text => {
            if (!/^[0-9]*$/.test(text)) {
              return;
            }
            setMsgPhone(text);
            setMsgPhoneVerifyCode('');
          }}
          onEndEditing={pushDataToFront}
        />
      </View>
      {DividerView(24, 0.5)}
      <View style={[styles.inputView, { justifyContent: 'space-around' }]}>
        <TextInput
          style={[styles.textInput, { marginLeft: cx(62) }]}
          placeholderTextColor="#b7b7b7"
          placeholder={codePlaceholder}
          value={msgPhoneVerifyCode}
          keyboardType="numeric"
          maxLength={6}
          underlineColorAndroid="transparent"
          onChangeText={text => {
            if (!/^[0-9]*$/.test(text)) {
              return;
            }
            setMsgPhoneVerifyCode(text);
          }}
          onEndEditing={pushDataToFront}
        />
        {(msgPhone.length === 0 || countDownTime !== 60) && (
          <View style={[styles.sendCode, { backgroundColor: themeColor }]}>
            <TYText style={styles.sendCodeText}>
              {msgPhone.length === 0 ? sendCodeTitle : `${countDownTime}S`}
            </TYText>
          </View>
        )}
        {msgPhone.length !== 0 && countDownTime === 60 && (
          <TouchableOpacity
            testID="getPhoneCode"
            onPress={getPhoneCode}
            style={[styles.sendCode, { backgroundColor: themeColor }]}
          >
            <TYText style={styles.sendCodeText}>{sendCodeTitle}</TYText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
  const hijackData = [
    {
      key: 'app',
      text: appMessageTitle,
      image: Res.appMessageImage,
      isInfo: false,
      isSelected: isAppSend,
    },
    {
      key: 'phone',
      text: phoneMessageTitle,
      image: Res.messageImage,
      isInfo: true,
      isSelected: isMsgPhone,
      render: renderTel,
    },
  ];

  return (
    <View style={[styles.container, style]}>
      {hasDivider && DividerView(16)}
      <TYListItem
        style={{ height: cx(74) }}
        title={hijackTitle}
        subTitle={hijackSubTitle}
        Action={
          <SwitchButton onTintColor={themeColor} value={unlockAttr} onValueChange={onValueChange} />
        }
      />
      {unlockAttr && (
        <>
          {DividerView(16)}
          <View style={[styles.root, lockAttrStyle]}>
            <TYText style={[styles.title, lockAttrTextStyle]}>{messageTypeTitle}</TYText>
            {hijackData.map(item => {
              return (
                <View key={item.key}>
                  <TouchableOpacity
                    testID="TouchableOpacity"
                    activeOpacity={0.9}
                    onPress={() => click(item)}
                  >
                    <View style={[styles.massageView, lockAttrItemStyle]}>
                      <View style={styles.tipItem}>
                        <Image source={item.image} />
                        <TYText style={styles.textInfo} text={item.text} />
                      </View>
                      <View
                        style={[
                          styles.clickView,
                          item.isSelected ? { borderColor: 'transparent' } : {},
                        ]}
                      >
                        {item.isSelected && (
                          <IconFont color={themeColor} size={cx(16)} name="selected" />
                        )}
                      </View>
                    </View>
                  </TouchableOpacity>
                  {item.isSelected && item.render && item.render()}
                </View>
              );
            })}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  clickView: {
    alignItems: 'center',
    borderColor: '#D0D0D0',
    borderRadius: 8,
    borderWidth: 1,
    height: 16,
    justifyContent: 'center',
    width: 16,
  },
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    width,
  },
  countryCode: {
    alignItems: 'center',
    flexDirection: 'row',
    width: cx(62),
  },
  inputView: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: cx(27),
    width: width - cx(33),
  },
  massageView: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 38,
    justifyContent: 'space-between',
    width: width - cx(32),
  },
  root: {
    backgroundColor: '#fff',
    marginHorizontal: cx(16),
  },
  sendCode: {
    borderRadius: 2,
    height: 21,
    justifyContent: 'center',
  },
  sendCodeText: {
    color: '#fff',
    fontSize: 12,
    paddingHorizontal: 8,
  },
  textInfo: {
    color: '#515151',
    fontSize: 14,
    marginLeft: cx(7),
  },
  textInput: {
    backgroundColor: '#fff',
    color: '#333',
    flex: 1,
    fontSize: cx(14),
    height: 40,
    textAlign: 'left',
  },

  tipItem: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    color: '#999',
    fontSize: 12,
    marginTop: 11,
  },
  userTip: {
    color: '#515151',
    fontSize: 14,
  },
});

export default Hijack;
