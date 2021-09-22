import React, { FC, useEffect, useState } from 'react';
import { View } from 'react-native';
import { TYText, Progress, TYSdk } from 'tuya-panel-kit';
import { AddProgressProps } from './interface';
import Strings from './i18n';
import GatewayUtils from '../../utils';
import styles from './style';

let timer;
const { getAllSubDevList } = GatewayUtils;

const AddProgress: FC<AddProgressProps> = ({
  isCustomProgressChange,
  foreColor,
  title,
  prompt,
  progressText,
  progressTextStyle,
  progressStyle,
  progressProps,
  containerStyle,
  titleStyle,
  promptStyle,
  devIds,
  timeoutSecond,
  customTotal,
  customProgress,
  onTimeout,
  onFinish,
}) => {
  const total = isCustomProgressChange ? customTotal : devIds.length;
  const [progress, setProgress] = useState(0);

  // 监听设备添加触发的事件
  useEffect(() => {
    if (!isCustomProgressChange) {
      countdown();
      TYSdk.DeviceEventEmitter.addListener('subDevInfoUpdate', getSubDevList);
    }

    return () => {
      clearTimeout(timer);
      TYSdk.DeviceEventEmitter.removeListener('subDevInfoUpdate', getSubDevList);
    };
  }, []);

  // 监听进度，如果已添加数和待添加总数相同，则触发完成事件，否则刷新倒计时。
  useEffect(() => {
    if (progress !== total) {
      if (!isCustomProgressChange) {
        clearTimeout(timer);
        countdown();
      }
    } else if (typeof onFinish === 'function') {
      onFinish();
    }
  }, [progress]);

  // 监听进度，如果已添加数和待添加总数相同，则触发完成事件，否则刷新倒计时。
  useEffect(() => {
    if (isCustomProgressChange) {
      setProgress(customProgress);
    }
  }, [customProgress]);

  // 获取当前网关下的子设备，与要添加的设备id列表比对，获取当前进度
  const getSubDevList = async () => {
    const list = await getAllSubDevList();
    let num = 0;
    devIds.forEach(devId => {
      if (list.some(d => d.devId === devId)) {
        num++;
      }
    });
    setProgress(num);
  };

  // 如果 timeoutSecond 秒内，添加进度没有变化，则认为超时，触发超时事件
  const countdown = () => {
    timer = setTimeout(() => {
      typeof onTimeout === 'function' && onTimeout(progress);
    }, timeoutSecond * 1000);
  };

  // 渲染进度
  const renderProgressView = () => {
    return (
      <View style={styles.progressMain}>
        <Progress
          foreColor={foreColor}
          style={[styles.progressBar, progressStyle]}
          startColor="#1381FB"
          value={(progress * 100) / total}
          startDegree={-90}
          andDegree={360}
          disabled
          thumbRadius={0}
          scaleHeight={6}
          {...progressProps}
        />
        <TYText
          text={progressText || `${progress} / ${total}`}
          style={[styles.centerText, progressTextStyle]}
        />
      </View>
    );
  };
  return (
    <View style={[styles.main, containerStyle]}>
      <TYText text={title} style={[styles.tip, titleStyle]} />
      {renderProgressView()}
      <TYText text={prompt} style={[styles.desc, promptStyle]} />
    </View>
  );
};

AddProgress.defaultProps = {
  isCustomProgressChange: false,
  devIds: [],
  foreColor: {
    '0%': '#1381FB',
    '100%': '#00C36C',
  },
  title: Strings.getLang('addProgressTip'),
  prompt: Strings.getLang('addProgressDesc'),
  progressText: '',
  progressTextStyle: {},
  progressStyle: {},
  progressProps: {},
  containerStyle: {},
  titleStyle: {},
  promptStyle: {},
  timeoutSecond: 30,
  customTotal: 1,
  customProgress: 0,
};

export default AddProgress;
