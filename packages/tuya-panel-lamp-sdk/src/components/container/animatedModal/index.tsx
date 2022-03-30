import React, { useEffect, useRef, useState } from 'react';
import { Modal, Motion, TYText, Utils } from 'tuya-panel-kit';
import { View, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { footOperationType } from './interface';

const { winWidth } = Utils.RatioUtils;
const AnimatedModal: React.FC<any> = props => {
  const {
    motionStyle,
    isRenderHead,
    headerConfig,
    animatedConfig,
    visible,
    wrapperStyle,
    contentStyle,
    isExpand,
    footOperation,
    footerConfig,
    motionProps,
    modalProps,
    onMaskPress,
    onCancel,
    onConfirm,
    renderAnimatedContent,
    renderContent,
  } = props;

  const { contentHeaderStyle, contentHeaderTextStyle, contentHeaderTitle } = headerConfig;
  const { animatedHeight, animatedOpacity, duration } = animatedConfig;

  const {
    contentFooterStyle,
    cancelText,
    cancelTextStyle,
    confirmText,
    confirmTextStyle,
    footerDivideStyle,
  } = footerConfig;

  // 控制Modal显示消失
  const [modalVisible, setModalVisible] = useState<boolean>(visible);
  // 控制Motion显示消失
  const [motionVisible, setMotionVisible] = useState<boolean>(visible);

  // 默认显示
  const heightRef = useRef(new Animated.Value(1)).current;
  const opacityRef = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    changeHeightByContentValue(isExpand);
  }, [isExpand]);

  useEffect(() => {
    if (visible) {
      setMotionVisible(visible);
      setModalVisible(visible);
    } else {
      setMotionVisible(false);
    }
  }, [visible]);

  const changeHeightByContentValue = (value: boolean) => {
    if (value) {
      Animated.sequence([
        Animated.timing(heightRef, {
          toValue: 1,
          duration,
        }),
        Animated.timing(opacityRef, {
          toValue: 1,
          duration,
        }),
      ]).start();
    } else {
      Animated.sequence([
        Animated.timing(opacityRef, {
          toValue: 0,
          duration,
        }),
        Animated.timing(heightRef, {
          toValue: 0,
          duration,
        }),
      ]).start();
    }
  };

  const renderHead = () => {
    if (isRenderHead) {
      return (
        <View style={[contentHeaderStyle, styles.headerWrapperStyle]}>
          <TYText style={contentHeaderTextStyle}>{contentHeaderTitle}</TYText>
        </View>
      );
    }
    return null;
  };

  const renderFoot = (value: footOperationType) => {
    switch (value) {
      case 'none':
        return null;
      case 'onlyCancel':
        return (
          <View style={contentFooterStyle}>
            <TouchableOpacity style={styles.footerOnlyOneItemStyle} onPress={onCancel}>
              <TYText style={cancelTextStyle}>{cancelText}</TYText>
            </TouchableOpacity>
          </View>
        );
      case 'onlyConfirm':
        return (
          <View style={contentFooterStyle}>
            <TouchableOpacity style={styles.footerOnlyOneItemStyle} onPress={onConfirm}>
              <TYText style={confirmTextStyle}>{confirmText}</TYText>
            </TouchableOpacity>
          </View>
        );
      default:
        return (
          <View style={contentFooterStyle}>
            <TouchableOpacity style={styles.footerItemStyle} onPress={onCancel}>
              <TYText style={cancelTextStyle}>{cancelText}</TYText>
            </TouchableOpacity>
            <View style={footerDivideStyle} />
            <TouchableOpacity style={styles.footerItemStyle} onPress={onConfirm}>
              <TYText style={confirmTextStyle}>{confirmText}</TYText>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <Modal visible={modalVisible} onMaskPress={onMaskPress} {...modalProps}>
      <Motion.PullUp
        style={motionStyle}
        show={motionVisible}
        onHide={() => {
          setModalVisible(false);
        }}
        {...motionProps}
      >
        <View style={wrapperStyle}>
          {/* 头部 */}
          {renderHead()}
          {/* 内容区域 */}
          <View style={contentStyle}>
            {/* 动画内容区域 */}
            <Animated.View
              style={{
                height: heightRef.interpolate({
                  inputRange: [0, 1],
                  outputRange: animatedHeight,
                }),
                opacity: opacityRef.interpolate({
                  inputRange: [0, 1],
                  outputRange: animatedOpacity,
                }),
              }}
            >
              {renderAnimatedContent()}
            </Animated.View>
            {/* 其它内容 */}
            {renderContent?.()}
          </View>
          {/* 底部 */}
          {renderFoot(footOperation)}
        </View>
      </Motion.PullUp>
    </Modal>
  );
};

AnimatedModal.defaultProps = {
  motionStyle: {
    bottom: 0,
    position: 'absolute',
  },
  isRenderHead: true,
  headerConfig: {
    contentHeaderTitle: 'Header',
    contentHeaderStyle: {
      height: 56,
      borderBottomWidth: 1,
      backgroundColor: '#1A1A1A',
      borderBottomColor: '#FFFFFF',
    },
    contentHeaderTextStyle: { fontSize: 16, color: '#FFF' },
  },
  wrapperStyle: { backgroundColor: '#1A1A1A', width: winWidth },
  contentStyle: {},
  footOperation: 'both',
  footerConfig: {
    contentFooterStyle: {
      borderTopWidth: 9,
      borderTopColor: '#FFF',
      height: 56,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1A1A1A',
    },
    cancelText: 'cancel',
    cancelTextStyle: { alignSelf: 'center', color: '#FFF', fontSize: 16 },
    confirmText: 'confirm',
    confirmTextStyle: { alignSelf: 'center', color: '#FFF', fontSize: 16 },
    footerDivideStyle: {
      height: 24,
      width: 1,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },
  },
  animatedConfig: {
    animatedHeight: [0, 200],
    animatedOpacity: [0, 1],
    animatedScale: [0.9, 1],
    duration: 300,
  },
  modalProps: {},
  motionProps: {},
};

const styles = StyleSheet.create({
  footerItemStyle: {
    alignItems: 'center',
    height: 56,
    justifyContent: 'center',
    width: winWidth / 2,
  },
  footerOnlyOneItemStyle: {
    alignItems: 'center',
    height: 56,
    justifyContent: 'center',
    width: winWidth,
  },
  headerWrapperStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AnimatedModal;
