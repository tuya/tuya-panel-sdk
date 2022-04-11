import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  GestureResponderEvent,
  Platform,
} from 'react-native';
import { DeviceItem } from '@tuya/tuya-panel-remote-sdk';
import { Motion, TYText, Utils, TopBar } from 'tuya-panel-kit';

import Res from './res';

const { convertX: cx } = Utils.RatioUtils;
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const fontColor = 'rgb(51, 51, 51)';

const swipeContent = [
  {
    id: 'rename',
    text: 'rename',
    onPress: () => {},
    type: 'delete',
    textStyle: { color: '#fff', fontSize: cx(14) },
    backgroundColor: '#595AD3',
  },
  {
    id: 'delete',
    text: 'delete',
    onPress: () => {},
    type: 'delete',
    textStyle: { color: '#fff', fontSize: cx(14) },
  },
];

const Icon = (
  <View>
    <TYText text="custom" />
  </View>
);

const Right = (
  <TouchableOpacity activeOpacity={0.9}>
    <View style={{ justifyContent: 'center', alignItems: 'center', width: cx(40), height: cx(40) }}>
      <Image source={Res.iconEdit} />
    </View>
  </TouchableOpacity>
);

const Extra = (
  <>
    <TouchableOpacity activeOpacity={0.9} style={{ flexDirection: 'row' }}>
      <View
        style={{ justifyContent: 'center', alignItems: 'center', width: cx(40), height: cx(40) }}
      >
        <Image source={Res.iconTime} />
      </View>
    </TouchableOpacity>
    <TouchableOpacity activeOpacity={0.9}>
      <View
        style={{ justifyContent: 'center', alignItems: 'center', width: cx(40), height: cx(40) }}
      >
        <Image source={Res.iconEdit} />
      </View>
    </TouchableOpacity>
  </>
);

const Index = () => {
  const [toastVisible, setToastVisible] = useState(false);

  const [top, setTop] = useState(0);

  const [left, setLeft] = useState(0);

  const onLongPressWithToast = (e: GestureResponderEvent) => {
    const { pageX, pageY } = e.nativeEvent;
    setTop(
      screenHeight - pageY < cx(110) ? pageY - TopBar.height - cx(110) : pageY - TopBar.height
    );
    setLeft(screenWidth - pageX < cx(110) ? pageX - cx(110) : pageX);
    setToastVisible(true);
  };

  const renderPopUpItem = () => {
    return swipeContent.map(item => {
      return (
        <TouchableOpacity
          style={styles.popItem}
          activeOpacity={0.8}
          onPress={() => {
            item.onPress();
            setToastVisible(false);
          }}
          key={item.id}
        >
          <TYText style={{ color: fontColor }} text={item.text} />
        </TouchableOpacity>
      );
    });
  };

  const renderPopUp = () => {
    if (Platform.OS === 'ios') {
      return <View style={[styles.popUp, styles.shadow]}>{renderPopUpItem()}</View>;
    }
    return <View style={styles.popUp}>{renderPopUpItem()}</View>;
  };

  const renderToast = () => (
    <Motion.Toast
      style={{ position: 'absolute', top, left, zIndex: 100 }}
      show={toastVisible}
      onFinish={() => null}
    >
      {renderPopUp()}
    </Motion.Toast>
  );

  const renderMask = () => (
    <TouchableOpacity
      style={[
        styles.mask,
        {
          position: 'absolute',
          zIndex: 99,
        },
      ]}
      activeOpacity={1}
      onPressIn={() => setToastVisible(false)}
    />
  );
  return (
    <View style={{ flex: 1, paddingVertical: cx(20) }}>
      <ScrollView>
        <DeviceItem
          title="电视机"
          subTitle="海尔"
          icon={Res.iconLight}
          style={{ marginBottom: cx(20), backgroundColor: 'red' }}
          swipeContent={swipeContent}
          enableSwipe={false}
          onLongPress={onLongPressWithToast}
        />
        <DeviceItem
          title="不展示Arrow"
          subTitle="灯控"
          icon={Res.iconLight}
          showRightArrow={false}
          style={{ marginBottom: cx(20), backgroundColor: 'red' }}
          swipeContent={swipeContent}
          onLongPress={onLongPressWithToast}
        />
        <DeviceItem
          title="自定义右侧内容"
          subTitle="灯控"
          icon={Res.iconLight}
          rightIcon={Right}
          style={{ marginBottom: cx(20) }}
          swipeContent={swipeContent}
          onLongPress={onLongPressWithToast}
        />
        <DeviceItem
          title="不展示阴影"
          subTitle="灯控"
          icon={Res.iconLight}
          showShadow={false}
          swipeContent={swipeContent}
          style={{ marginBottom: cx(20) }}
          onLongPress={onLongPressWithToast}
        />
        <DeviceItem
          title="自定义title样式"
          subTitle="自定义subTitle样式"
          titleStyle={{ fontSize: cx(20), color: 'green' }}
          subTitleStyle={{ fontSize: cx(18), color: 'red' }}
          icon={Res.iconLight}
          style={{ marginBottom: cx(20) }}
          swipeContent={swipeContent}
          onLongPress={onLongPressWithToast}
        />
        <DeviceItem
          title="很长很长很长很长很长很长很长很长很长很长很长很长很长"
          subTitle="很长很长很长很长很长很长很长很长很长很长很长很长很长"
          icon="https://avatars.githubusercontent.com/u/56244178?v=4"
          iconStyle={{ width: cx(40), height: cx(40), borderRadius: cx(20) }}
          style={{ marginBottom: cx(20) }}
          swipeContent={swipeContent}
          onLongPress={onLongPressWithToast}
        />
        <DeviceItem
          title="自定义icon"
          subTitle="灯控"
          icon={Icon}
          style={{ marginBottom: cx(20) }}
          swipeContent={swipeContent}
          onLongPress={onLongPressWithToast}
        />
        <DeviceItem
          title="Extra"
          subTitle="灯控"
          icon={Icon}
          style={{ marginBottom: cx(20) }}
          extra={Extra}
          swipeContent={swipeContent}
          onLongPress={onLongPressWithToast}
        />
        <DeviceItem
          content={<TYText text="自定义内容" style={{ height: '100%' }} />}
          style={{ marginBottom: cx(20) }}
          swipeContent={swipeContent}
          onLongPress={onLongPressWithToast}
          enableSwipe
        />
      </ScrollView>
      {toastVisible && renderMask()}
      {renderToast()}
    </View>
  );
};

const styles = StyleSheet.create({
  mask: {
    height: screenHeight,
    width: screenWidth,
  },
  popItem: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: cx(15),
  },
  popUp: {
    backgroundColor: '#FFF',
    elevation: 8,
    height: cx(110),
    width: cx(110),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

export default Index;
