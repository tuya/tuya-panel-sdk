import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { Utils, Progress } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

interface ICenterProps {
  bgImage: number;
  children: React.ReactNode;
}
interface IProps {
  /**
   * 当前值
   */
  curStep: number;
  /**
   * 目标值
   */
  targetSteps: number;
  /**
   * 目标描述
   */
  targetText: string;
  /**
   * 百分比描述
   */
  percentText: string;
  /**
   * 主题色
   */
  themeColor: string;
  /**
   * 中心区域的view
   */
  centerView: ICenterProps;
}
const SportTarget: React.FC<IProps> = (props: IProps) => {
  const {
    curStep = 0,
    targetSteps = 1,
    targetText = '',
    percentText = '',
    themeColor = '',
    centerView,
  } = props;

  const CenterView = () => {
    return (
      <View style={styles.progressCenterView}>
        <View style={styles.centerViewBox}>
          <ImageBackground style={styles.centerViewContent} source={centerView.bgImage}>
            {centerView.children}
          </ImageBackground>
        </View>
      </View>
    );
  };

  const percent = () => {
    return Math.floor((curStep / targetSteps) * 100);
  };

  return (
    <View style={styles.content}>
      <View style={styles.head}>
        <Text style={[styles.headTitle, { color: themeColor }]}>{targetText}</Text>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={styles.headContent}>
            {percentText}
            <Text style={{ color: themeColor }}>{`${percent()}%`}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.progress}>
        <Progress
          style={{ width: cx(216), height: cx(216) }}
          foreColor={themeColor}
          thumbFill={themeColor}
          thumbStroke={themeColor}
          thumbStrokeWidth={0}
          thumbRadius={cx(7)}
          scaleHeight={cx(16)}
          min={0}
          max={targetSteps}
          value={curStep}
          startDegree={135}
          andDegree={270}
          stepValue={10}
          disabled
        />
        <CenterView />
      </View>
    </View>
  );
};
export default SportTarget;

const styles = StyleSheet.create({
  centerViewBox: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  centerViewContent: {
    alignItems: 'center',
    height: cx(150),
    justifyContent: 'center',
    width: cx(150),
  },
  content: {
    height: cx(350),
  },
  head: {
    alignItems: 'center',
    height: cx(120),
  },
  headContent: {
    fontSize: cx(24),
    textAlign: 'center',
    width: cx(200),
  },
  headTitle: {
    fontSize: cx(12),
    height: cx(30),
    lineHeight: cx(30),
    marginBottom: cx(4),
    marginTop: cx(20),
    textAlign: 'center',
    width: cx(270),
  },
  progress: {
    alignItems: 'center',
    height: cx(230),
    justifyContent: 'center',
  },
  progressCenterView: {
    height: cx(230),
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
});
