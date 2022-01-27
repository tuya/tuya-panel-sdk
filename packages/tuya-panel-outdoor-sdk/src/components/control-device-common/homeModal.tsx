import React, { ReactElement } from 'react';
import { Utils, Modal } from 'tuya-panel-kit';
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text } from 'react-native';
import { IIcon, IModalProps } from './common/interface';

const { convertX: cx } = Utils.RatioUtils;

const homeModal = (props: IModalProps) => {
  const result = (Child: (childProps: IIcon) => ReactElement) => {
    const {
      title,
      subTitle,
      done,
      bgImage,
      bgStyle,
      bgChildStyle,
      showModal,
      v1Bottom,
      v2Bottom,
      iconBoxStyle,
      iconProp,
      icon,
      onMaskPress,
    } = props;
    const curIcon = { ...iconProp, ...{ icon } };
    return (
      <Modal style={styles.modalView} visible={showModal} onMaskPress={onMaskPress}>
        <View style={[iconBoxStyle, { bottom: v1Bottom }, iconProp.iconStyle]}>
          <Child {...curIcon} />
        </View>
        <View style={[styles.alertWrap, { bottom: v2Bottom }]}>
          <ImageBackground style={bgStyle} source={bgImage}>
            <View style={[{ width: '100%', height: '100%' }, bgChildStyle]}>
              <View style={styles.titleWrap}>
                <Text style={styles.titleViewName}>{title}</Text>
              </View>
              <Text numberOfLines={2} style={styles.titleTip}>
                {subTitle}
              </Text>
              <TouchableOpacity style={styles.modalButton} onPress={onMaskPress}>
                <Text style={styles.modalText}>{done}</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </Modal>
    );
  };
  return result;
};

export default homeModal;

const styles = StyleSheet.create({
  alertWrap: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  modalButton: {
    height: cx(20),
    justifyContent: 'center',
    marginBottom: cx(24),
    marginTop: cx(24),
  },
  modalText: {
    color: '#0376FF',
    fontSize: cx(16),
    fontWeight: '500',
  },
  modalView: {
    position: 'absolute',
  },
  titleTip: {
    color: 'rgba(0,0,0,0.5)',
    flex: 1,
    fontSize: cx(14),
    marginTop: cx(8),
  },
  titleViewName: {
    color: 'rgba(0,0,0,0.9)',
    fontSize: cx(16),
    fontWeight: '500',
  },
  titleWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    lineHeight: cx(20),
  },
});
