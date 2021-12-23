import React, { FC, useState } from 'react';
import AnimatedModal from '@tuya/tuya-panel-lamp-sdk/src/components/container/animatedModal';
import { SwitchButton, Utils, TYText } from 'tuya-panel-kit';
import { View, StyleSheet } from 'react-native';

const { convertX: cx, isIphoneX } = Utils.RatioUtils;

const AnimatedModalScene: FC = () => {
  const [lightVisible, setLightVisible] = useState(false);
  const [darkVisible, setDarkVisible] = useState(false);

  const [value, setValue] = React.useState(true);

  const onLightClose = () => {
    setLightVisible(false);
  };

  const onDarkClose = () => {
    setDarkVisible(false);
  };

  const renderDarkAnimatedContent = () => {
    return (
      <View style={{ marginTop: 16 }}>
        <View style={styles.darkContentSettingStyle}>
          <TYText style={{ color: '#FFF' }}>自定义渲染动画区域内容</TYText>
        </View>
      </View>
    );
  };

  const renderLightAnimatedContent = () => {
    return (
      <View style={{ marginTop: 16 }}>
        <View style={styles.lightContentSettingStyle}>
          <TYText style={{ color: '#000' }}>自定义渲染动画区域内容</TYText>
        </View>
      </View>
    );
  };

  const renderDarkContent = () => {
    return (
      <View style={styles.darkContentSettingStyle}>
        <TYText style={{ color: '#FFF' }}>自定义渲染内容用于内部控制动画</TYText>
        <SwitchButton
          value={value}
          onValueChange={v => setValue(v)}
          onTintColor="#1082FE"
          tintColor="rgba(255,255,255,0.2)"
        />
      </View>
    );
  };

  const renderLightContent = () => {
    return (
      <View style={styles.lightContentSettingStyle}>
        <TYText style={{ color: '#000' }}>自定义渲染内容用于内部控制动画</TYText>
        <SwitchButton
          value={value}
          onValueChange={v => setValue(v)}
          onTintColor="#FD8252"
          tintColor="#E5EDF3"
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View style={styles.settingStyle}>
        <TYText>浅色模式效果</TYText>
        <SwitchButton
          value={lightVisible}
          onValueChange={v => setLightVisible(v)}
          onTintColor="#FD8252"
          tintColor="rgba(255,255,255,0.5)"
        />
      </View>

      <View style={styles.settingStyle}>
        <TYText>深色模式效果</TYText>
        <SwitchButton
          value={darkVisible}
          onValueChange={v => setDarkVisible(v)}
          onTintColor="#1082FE"
          tintColor="rgba(255,255,255,0.5)"
        />
      </View>

      <AnimatedModal
        visible={darkVisible}
        isExpand={value}
        wrapperStyle={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: '#1A1A1A',
        }}
        headerConfig={{
          contentHeaderStyle: {
            height: cx(56),
            borderBottomWidth: 1,
            justifyContent: 'center',
            borderBottomColor: 'rgba(255,255,255,0.05)',
          },
          contentHeaderTextStyle: { fontSize: 16, color: '#FFF' },
          contentHeaderTitle: '深色模式下头部栏',
        }}
        footerConfig={{
          contentFooterStyle: {
            borderTopWidth: 1,
            borderTopColor: '#000',
            height: 56,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: cx(isIphoneX ? 20 : 0),
          },
          cancelText: '取消',
          cancelTextStyle: { alignSelf: 'center', color: 'rgba(255,255,255,0.5)' },
          confirmText: '确认',
          confirmTextStyle: { alignSelf: 'center', color: '#1082FE' },
          footerDivideStyle: {
            height: cx(24),
            width: cx(1),
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.1)',
          },
        }}
        animatedConfig={{
          animatedHeight: [0, 118],
          animatedOpacity: [0, 1],
          animatedScale: [0.9, 1],
          duration: 300,
        }}
        renderContent={renderDarkContent}
        renderAnimatedContent={renderDarkAnimatedContent}
        onMaskPress={onDarkClose}
        onCancel={onDarkClose}
        onConfirm={onDarkClose}
      />

      <AnimatedModal
        visible={lightVisible}
        isExpand={value}
        wrapperStyle={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          backgroundColor: '#FFF',
        }}
        headerConfig={{
          contentHeaderStyle: {
            height: cx(56),
            borderBottomWidth: 1,
            justifyContent: 'center',
            borderBottomColor: '#f8f8f8',
          },
          contentHeaderTextStyle: { fontSize: 16, color: '#000' },
          contentHeaderTitle: '浅色模式下头部栏',
        }}
        footerConfig={{
          contentFooterStyle: {
            borderTopWidth: 1,
            borderTopColor: '#f8f8f8',
            height: 56,
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: cx(isIphoneX ? 20 : 0),
          },
          cancelText: '取消',
          cancelTextStyle: { alignSelf: 'center', color: 'rgba(0,0,0,0.5)' },
          confirmText: '确认',
          confirmTextStyle: { alignSelf: 'center', color: '#FD8252' },
          footerDivideStyle: {
            height: cx(24),
            width: cx(1),
            justifyContent: 'center',
            backgroundColor: 'rgba(255,255,255,0.1)',
          },
        }}
        animatedConfig={{
          animatedHeight: [0, 118],
          animatedOpacity: [0, 1],
          animatedScale: [0.9, 1],
          duration: 300,
        }}
        renderContent={renderLightContent}
        renderAnimatedContent={renderLightAnimatedContent}
        onMaskPress={onLightClose}
        onCancel={onLightClose}
        onConfirm={onLightClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  darkContentSettingStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 16,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    marginVertical: 16,
    paddingHorizontal: 16,
    width: 320,
  },
  lightContentSettingStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#F0F6F9',
    borderRadius: 16,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    marginVertical: cx(16),
    paddingHorizontal: 16,
    width: 320,
  },
  settingStyle: {
    alignItems: 'center',
    backgroundColor: '#DFE8EC',
    borderRadius: 16,
    flexDirection: 'row',
    height: 70,
    justifyContent: 'space-between',
    marginTop: 30,
    paddingHorizontal: 16,
    width: 320,
  },
});
export default AnimatedModalScene;
