import React, { FC } from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { ControlDeviceCommon } from '@tuya/tuya-panel-outdoor-sdk';
import Res from './res';
import icons from './res/icons';

const { convertX: cx, topBarHeight } = Utils.RatioUtils;

const Component: FC = () => {
  const onSearchResult = (result: any) => {
    const { error, device, phone } = result;
    if (error) {
      // 错误处理
    } else {
      // 根据位置，显示数据
    }
  };
  const onRingLampResult = (result: any) => {
    const { error } = result;
    if (error) {
      // 错误处理
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.contentTarget, { bottom: cx(300) }]}>
        <ControlDeviceCommon
          themeColor="red"
          deviceOnline
          bleState={false}
          iconProp={{
            color: '#333',
            size: cx(24),
            icon: icons.home_lamp,
            successIcon: icons.home_search_success,
            iconStyle: {
              width: cx(50),
              height: cx(50),
              borderRadius: cx(50),
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
          onSearchResult={onSearchResult}
          onRingLampResult={onRingLampResult}
          modalStartPoint={cx(300) - topBarHeight}
          searchModalProp={{
            title: 'title',
            subTitle: 'subTitle',
            done: 'done',
            bgImage: Res.searchBg,
            bgStyle: { width: cx(280), height: cx(170), justifyContent: 'center' },
            bgChildStyle: {
              width: cx(280),
              height: cx(150),
              marginTop: cx(40),
            },
            iconBoxStyle: styles.contentTarget,
          }}
          ringModalProp={{
            title: 'title',
            subTitle: 'subTitle',
            done: 'done',
            bgImage: Res.searchBg,
            bgStyle: { width: cx(280), height: cx(170), justifyContent: 'center' },
            iconBoxStyle: styles.contentTarget,
          }}
          lampModalProp={{
            title: 'title',
            subTitle: 'subTitle',
            done: 'done',
            bgImage: Res.searchBg,
            bgStyle: { width: cx(280), height: cx(170), justifyContent: 'center' },
            iconBoxStyle: styles.contentTarget,
          }}
          lampIcon={icons.home_search}
          iconSpace={cx(12)}
          viewStyle={styles.controlView}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  contentTarget: {
    position: 'absolute',
    right: cx(10),
  },
  controlView: {
    backgroundColor: 'blue',
  },
});

export default Component;
