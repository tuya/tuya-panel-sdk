import color from 'color';
import React, { useEffect, useState } from 'react';
import { View, Animated } from 'react-native';
import { IconFont } from 'tuya-panel-kit';
import Styles from './style';
import { TYIpcLoadingProps } from './interface';
import publicConfig from '../publicConfig';

const { cx } = publicConfig;
const timeOut = null;

const okSvg =
  'M257.91057 533.966436c-2.227974-2.289408-2.633433-6.035804-0.545731-8.855584l25.62273-34.604253c1.926952-2.601693 5.758331-2.984626 8.120435-1.187707l151.289296 115.091878c2.558689 1.946406 7.037164 1.534804 9.394147-0.414674l367.152991-303.591213c2.630361-2.174732 6.902011-1.84197 9.294831 0.504775l23.534004 23.06916c2.5034 2.454253 2.708177 6.226247-0.06348 8.9334L451.613291 723.736414c-2.538212 2.47985-6.765834 2.261763-8.630329 0.346073L257.91057 533.966436z';

const TYIpcLoading: React.FunctionComponent<TYIpcLoadingProps> = props => {
  const {
    loadSpeed,
    showComplete,
    onComplete,
    itemNum,
    dotSize,
    completeColor,
    sequenceColor,
    containerStyle,
    show,
  } = props;

  const arr = Array(itemNum)
    .fill(0)
    .map((__, i) => i);

  const [animatedValue, setAnimatedValue] = useState([]);
  const [complete, setComplete] = useState<boolean>(false);
  const [value, setValue] = useState<boolean>(show);
  const [completeAnimate] = useState(new Animated.Value(0));

  useEffect(() => {
    startAnimate();
    return () => {
      _clearAllTimer();
      clearAllAnimation();
    };
  }, []);

  useEffect(() => {
    show && startAnimate();
    !show && clearLoading();
    setValue(show);
    if (!show && showComplete) {
      _showCompleteAnimate();
    }
    return () => {
      _clearAllTimer();
      clearAllAnimation();
    };
  }, [show]);

  useEffect(() => {
    setTimeout(() => {
      Animated.spring(completeAnimate, {
        toValue: 0,
      }).start();
      setComplete(false);
      clearAllAnimation();
      !!onComplete && onComplete();
    }, 1000);
  }, [complete]);

  useEffect(() => {
    animateSequence();
  }, [animatedValue]);

  const startAnimate = async () => {
    await getAnimateValueReset();
    await animateSequence();
  };

  const getAnimateValueReset = async () => {
    const arr1 = [];
    arr.forEach(item => {
      arr1[item] = new Animated.Value(0);
    });
    await setAnimatedValue(arr1);
  };

  const animateSequence = () => {
    if (complete || animatedValue.length === 0) return;
    const animations = arr.map(item =>
      Animated.timing(animatedValue[item], {
        toValue: animatedValue[item]._value === 0 ? 1 : 0,
        duration: loadSpeed,
      })
    );
    Animated.sequence(animations).start(() => {
      animateSequence();
    });
  };

  const _clearAllTimer = () => {
    clearTimeout(timeOut);
  };

  const clearAllAnimation = () => {
    clearLoading();
    !!completeAnimate && completeAnimate.stopAnimation();
  };

  const clearLoading = () => {
    arr.forEach(item => {
      !!animatedValue[item] && animatedValue[item].stopAnimation();
    });
  };

  const _showCompleteAnimate = () => {
    !showComplete && clearAllAnimation();
    _clearAllTimer();
    Animated.spring(completeAnimate, {
      toValue: 1,
    }).start();
    setComplete(true);
  };

  const _getOpacityColor = (item, themeColor) =>
    Array(item)
      .fill(1)
      .map((__, index) =>
        color(themeColor)
          .alpha((index + 1) / item)
          .rgbString()
      );

  const renderAnimateItems = () => {
    const colors = _getOpacityColor(itemNum, sequenceColor);
    const inputRange = Array(itemNum)
      .fill(1)
      .map((__, i) => i / (itemNum - 1));
    const animations = arr.map((a, i) => {
      const isMid = i !== 0;
      const backgroundColor =
        !!animatedValue[a] && animatedValue.length > 0
          ? animatedValue[a].interpolate({
              inputRange,
              outputRange: [...colors],
            })
          : 'transparent';
      return (
        <Animated.View
          key={`view${i + 1}`}
          style={{
            height: dotSize,
            width: dotSize,
            borderRadius: dotSize / 2,
            backgroundColor,
            marginLeft: isMid ? dotSize : 0,
          }}
        />
      );
    });

    return animations;
  };

  const renderCompleteAnimateView = () => (
    <Animated.View style={{ opacity: completeAnimate }}>
      <IconFont
        d={okSvg}
        vFlip
        size={cx(28)}
        fill={completeColor || sequenceColor}
        stroke={completeColor || sequenceColor}
      />
    </Animated.View>
  );

  return (
    <View style={[Styles.container, containerStyle]}>
      {value && animatedValue.length !== 0 && renderAnimateItems()}
      {complete && showComplete && renderCompleteAnimateView()}
    </View>
  );
};

TYIpcLoading.defaultProps = {
  show: true,
  showComplete: true,
  itemNum: 3,
  loadSpeed: 400,
  onComplete: null,
  sequenceColor: '#7087FF',
  completeColor: '#7087FF',
  dotSize: cx(6),
  containerStyle: {},
};

export default TYIpcLoading;
