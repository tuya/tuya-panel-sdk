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
      // 错误处理,比如超时（目前10s）
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
            iconBoxStyle: styles.contentTarget,
            bgStyle: { width: cx(280), height: cx(170), justifyContent: 'center' },
            bgChildStyle: {
              width: cx(280),
              height: cx(150),
              marginTop: cx(40),
              marginLeft: cx(20),
            },
          }}
          // ringModalProp={{
          //   title: 'title',
          //   subTitle: 'subTitle',
          //   done: 'done',
          //   bgImage: Res.searchBg,
          //   iconBoxStyle: styles.contentTarget,
          //   bgStyle: { width: cx(280), height: cx(170), justifyContent: 'center' },
          // }}
          // lampModalProp={{
          //   title: 'title',
          //   subTitle: 'subTitle',
          //   done: 'done',
          //   iconBoxStyle: styles.contentTarget,
          //   bgImage: Res.searchBg,
          //   bgStyle: { width: cx(280), height: cx(170), justifyContent: 'center' },
          // }}
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
    // backgroundColor: 'blue',
  },
});

export default Component;
