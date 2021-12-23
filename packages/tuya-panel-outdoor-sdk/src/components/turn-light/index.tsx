import React, { FC, useState, useCallback, useRef, useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Utils, TabBar } from 'tuya-panel-kit';
import Strings from './i18n';
import { TurnLightProps } from './interface';
import res from './res';
import Gradient from './LinearGradient';

const {
  RatioUtils: { convertX: cx },
} = Utils;

const HeaderList = [
  { name: 'turnLeft', key: 'left' },
  { name: 'stop', key: 'stop' },
  { name: 'turnRight', key: 'right' },
];

const ImageList = [
  { common: 'turnLeft', active: 'turnLeftActive', key: 'left' },
  { common: 'straight', active: 'stop', init: 'straightActive', key: 'stop' },
  { common: 'turnRight', active: 'turnRightActive', key: 'right' },
];
const activeList = ['left', 'stop', 'right'];

const TurnLight: FC<TurnLightProps> = (props: TurnLightProps) => {
  const { direction = 'left', switchLight, onChange = null } = props;
  const [activeKey, setActiveKey] = useState<string>(direction);
  const tabRadios = HeaderList.map(({ key, name }: { key: string; name: any }) => {
    return {
      key,
      title: Strings.getLang(`TYOutdoor_${name}`),
      tabStyle: { alignItems: 'center', justifyContent: 'center' },
      textStyle: { fontSize: 16, color: 'rgba(255, 255, 255, 0.5)' },
      activeTextStyle:
        direction === 'straight'
          ? { color: 'rgba(255, 255, 255, 0.5)' }
          : { color: 'rgba(255, 255, 255, 1)' },
    };
  });
  // 顶部内容
  const topContent = useCallback(() => {
    return ImageList.map(({ key, active, common, init }) => {
      let source = activeKey === key ? active : common;
      if (direction === 'straight') {
        // 直行灯亮
        source = init ?? common;
      }
      if (!switchLight) {
        source = common;
      }
      return <Image key={key} style={{ flex: 1 }} resizeMode="contain" source={res[source]} />;
    });
  }, [direction, switchLight, activeKey]);

  useEffect(() => {
    if (activeList.includes(direction)) {
      setActiveKey(direction);
    }
  }, [direction]);

  // tab 改变的回调
  const change = value => {
    setActiveKey(value);
    onChange && onChange(value);
  };
  return (
    <View style={styles.wrapper}>
      <View style={styles.tabWrapper}>{topContent()}</View>
      <View style={styles.flex}>
        <Gradient
          width={cx(335)}
          height={cx(38)}
          wrapperStyle={{
            borderRadius: cx(8),
          }}
        />
        <TabBar
          type="radio"
          tabs={tabRadios}
          activeKey={activeKey}
          onChange={change}
          style={{
            height: cx(38),
            width: cx(335),
            backgroundColor: 'transparent',
            borderRadius: cx(8),
          }}
          tabStyle={{
            backgroundColor: 'transparent',
          }}
          tabActiveStyle={{
            backgroundColor: direction === 'straight' ? 'transparent' : '#4DC478',
            borderRadius: cx(7),
          }}
          activeColor={direction === 'straight' ? 'transparent' : '#4DC478'}
        />
      </View>
    </View>
  );
};
export default TurnLight;
const styles = StyleSheet.create({
  flex: {
    flex: 1,
    marginTop: cx(20),
  },
  tabWrapper: {
    alignContent: 'center',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    height: cx(48),
    justifyContent: 'center',
    marginBottom: cx(50),
  },
  wrapper: {
    borderRadius: cx(8),
    display: 'flex',
    marginBottom: cx(24.5),
    marginTop: cx(20),
    paddingHorizontal: cx(20),
  },
});
