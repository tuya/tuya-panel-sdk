import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Progress, TYText, Utils } from 'tuya-panel-kit';
import Res from './res';

const { convertX: cx } = Utils.RatioUtils;
const { color } = Utils.ColorUtils;

interface IProps {
  themeColor: string;
  circleWidth: number;
  // 进度条渲染高度
  scaleHeight: number;
  progressValue: number;
  shadowWidth: number;
  title: string;
  unit: string;
  titleSize: number;
  onValueChange: () => void;
  onSlidingComplete: () => void;
}
const CircleProgress = ({
  themeColor = '#FB7319',
  circleWidth = 206,
  scaleHeight = 25,
  title = '',
  progressValue = 0,
  shadowWidth = 7,
  unit = '',
  titleSize = cx(36),
  onValueChange,
  onSlidingComplete,
}: IProps) => {
  const renderCenterView = () => {
    const width = cx(circleWidth - scaleHeight * 3);

    const styleCircle = {
      width,
      height: width,
      borderRadius: width / 2,
    };
    const styleContent = {
      marginTop: -(width / 2),
      marginLeft: -(width / 2 + cx(shadowWidth)),
    };

    return (
      <ImageBackground
        source={{ uri: Res.progressY }}
        style={[
          styles.content,
          styleContent,
          {
            height: width + cx(shadowWidth * 2),
            width: width + cx(shadowWidth * 2),
            alignItems: 'center',
            justifyContent: 'flex-start',
          },
        ]}
      >
        <View style={[styleCircle, styles.center, { backgroundColor: '#FFF' }]}>
          <TYText color="#000" size={titleSize}>
            {title}
          </TYText>
          <TYText style={styles.unit}>{unit}</TYText>
        </View>
      </ImageBackground>
    );
  };

  return (
    <ImageBackground
      source={{ uri: Res.progressYY }}
      style={[styles.container, { width: cx(circleWidth), height: cx(circleWidth) }]}
    >
      <Progress
        foreColor={{
          '0%': color.hex2RgbString(themeColor, 0.1),
          '50%': color.hex2RgbString(themeColor, 0.5),
          '100%': color.hex2RgbString(themeColor, 1),
        }}
        thumbRadius={0}
        startDegree={270}
        andDegree={360}
        value={progressValue}
        scaleHeight={cx(scaleHeight)}
        x1="50%"
        y1="0%"
        x2="50%"
        y2="100%"
        style={{ width: cx(circleWidth), height: cx(circleWidth), marginTop: -cx(15) }}
        backColor="#fff"
        disabled
        renderCenterView={renderCenterView()}
        onValueChange={onValueChange}
        onSlidingComplete={onSlidingComplete}
      />
    </ImageBackground>
  );
};

export default CircleProgress;

const styles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  content: {
    left: '50%',
    position: 'absolute',
    top: '50%',
  },
  unit: {
    color: color.hex2RgbString('#000', 0.4),
    fontSize: cx(14),
  },
});
