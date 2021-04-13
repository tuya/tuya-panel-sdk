// 此组件不兼容进组件内部

/* eslint-disable eqeqeq */
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import Config from '../config';

const { cx } = Config;

// 视频放大倍数的可切换枚举范围
const mulBtnScaleEnumData = [1, 2, 4, 8, 12];

export interface ZoomInTimesProps {
  isFullScreen: boolean;
  currentVideoScale: number;
  maxScaleMultiple: number;
  zoomInTimesStyle: any;
  onPress: (_: number) => void;
}

export interface ZoomInTimesState {}

class ZoomInTimes extends React.PureComponent<ZoomInTimesProps, ZoomInTimesState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onPress = () => {
    const { maxScaleMultiple, currentVideoScale } = this.props;
    let activeValue = 1.0;
    const mulLength = mulBtnScaleEnumData.length;
    for (let i = 0; i < mulLength; i++) {
      // 表示遍历到最后一项数据
      if (i === mulLength - 1) {
        mulBtnScaleEnumData[i] > currentVideoScale
          ? (activeValue = mulBtnScaleEnumData[i])
          : (activeValue = 1.0);
      } else if (
        currentVideoScale >= mulBtnScaleEnumData[i] &&
        currentVideoScale < mulBtnScaleEnumData[i + 1] &&
        mulBtnScaleEnumData[i + 1] <= maxScaleMultiple
      ) {
        mulBtnScaleEnumData[i] >= maxScaleMultiple
          ? (activeValue = 1.0)
          : (activeValue = mulBtnScaleEnumData[i + 1]);
        break;
      } else if (
        currentVideoScale >= mulBtnScaleEnumData[i] &&
        currentVideoScale < mulBtnScaleEnumData[i + 1] &&
        mulBtnScaleEnumData[i + 1] > maxScaleMultiple
      ) {
        if (currentVideoScale < maxScaleMultiple) {
          activeValue = maxScaleMultiple;
        }
        if (currentVideoScale == maxScaleMultiple) {
          activeValue = 1.0;
        }
        break;
      }
    }
    // 添加随机数 避免因数据与上次相同 无法更改数据
    const realActiveValue = activeValue + Math.random() / 100;
    this.props.onPress(realActiveValue);
  };

  render() {
    const { currentVideoScale, isFullScreen, zoomInTimesStyle } = this.props;
    const { zoomNormalPage, zoomFullPage } = zoomInTimesStyle;
    const times = String(currentVideoScale.toFixed(1));
    return (
      <View
        style={
          isFullScreen
            ? [styles.zoomFullPage, zoomFullPage]
            : [styles.zoomNormalPage, zoomNormalPage]
        }
      >
        <TouchableOpacity style={styles.zoomInTimesPage} activeOpacity={0.7} onPress={this.onPress}>
          <TYText style={styles.timeValue} text={`${times}x`} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  timeValue: {
    color: '#ffffff',
    fontSize: Math.ceil(14),
  },
  zoomFullPage: {
    left: 0,
    position: 'absolute',
    top: 10,
  },
  zoomInTimesPage: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: Math.ceil(cx(20)),
    height: Math.ceil(cx(40)),
    justifyContent: 'center',
    overflow: 'hidden',
    width: Math.ceil(cx(40)),
  },
  zoomNormalPage: {
    bottom: Math.ceil(cx(20)),
    left: Math.ceil(cx(20)),
    position: 'absolute',
  },
});

export default ZoomInTimes;
