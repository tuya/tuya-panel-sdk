import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { TouchableWithoutFeedback, View, Text } from 'react-native';
import { delayCall } from './utils';
import { useCountDownTimer } from './hooks';
import { CountDownBtnProps, Timer } from './interface';

/**
 * 倒计时按钮
 */

const CountDownBtn = React.forwardRef<Timer, CountDownBtnProps>(
  (
    {
      style,
      textStyle,
      customCountDownText,
      btnText = '',
      onPress,
      countDownNumber = 3,
      onIdleEndCallBack,
      onCountChange,
    },
    forWardRef
  ) => {
    const [count, timer] = useCountDownTimer(countDownNumber);

    React.useEffect(() => {
      onCountChange && onCountChange(count, timer);
      if (timer.isEnd()) {
        delayCall(() => {
          onIdleEndCallBack && onIdleEndCallBack();
        }, 1000);
      }
    }, [count]);

    React.useImperativeHandle(forWardRef, () => timer, []);

    const handlePress = () => {
      timer.stop();
      onPress && onPress();
    };

    const renderBtnText = () => {
      if (customCountDownText && typeof customCountDownText === 'function') {
        return `${btnText} ${customCountDownText(count)}`;
      }
      return `${btnText} (${count} s)`;
    };

    return (
      <TouchableWithoutFeedback onPress={handlePress}>
        <View style={style}>
          <Text style={textStyle}>{renderBtnText()}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
);

CountDownBtn.displayName = 'CountDownButton';

export default CountDownBtn;

export { useCountDownTimer };
