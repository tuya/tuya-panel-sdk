import React, { useState } from 'react';
import { View } from 'react-native';
import { TYText, BrickButton } from 'tuya-panel-kit';
import { TipDialog } from '@tuya/tuya-panel-outdoor-sdk';

const TipDialogView = () => {
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('测试文字');

  const onConfirmPress = value => {
    setText(value);
    setVisible(false);
  };
  const textTypeCheck = value => {
    const t = +value;
    const isNumber = typeof t === 'number' && t >= 0 && !Number.isNaN(t);
    return isNumber;
  };
  const ruleCheck = value => {
    if (Number(value) < 100 || Number(value) > 999999) {
      return true;
    }
    return false;
  };

  const btnOnPress = () => {
    setVisible(!visible);
  };
  return (
    <View>
      <TYText>{text}</TYText>
      <BrickButton text="点击" onPress={btnOnPress} />
      <TipDialog
        alarmTip="范围限制在100-999999之间"
        visible={visible}
        setVisible={setVisible}
        onConfirmPress={onConfirmPress}
        textTypeCheck={textTypeCheck}
        ruleCheck={ruleCheck}
      />
    </View>
  );
};
export default TipDialogView;
