import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import Res from '../../res/index';
import { IAddButtonProps } from '../interface';

const {
  RatioUtils: { convertX: cx, isIphoneX },
} = Utils;
const AddButton: React.FC<IAddButtonProps> = ({ handleAdd, addBtnTintColor }) => {
  return (
    <TouchableOpacity style={styles.bottomAddBtn} activeOpacity={0.8} onPress={handleAdd}>
      <Image source={Res.addBorder} style={styles.addBorder} />
      <Image source={Res.addBtn} style={[styles.addBtn, { tintColor: addBtnTintColor }]} />
      <Image source={Res.plus} style={styles.plus} resizeMode="contain" />
    </TouchableOpacity>
  );
};

AddButton.defaultProps = {
  handleAdd() {},
};

const styles = StyleSheet.create({
  addBorder: {
    height: cx(76),
    position: 'absolute',
    width: cx(76),
    zIndex: 3,
  },
  addBtn: {
    height: cx(76),
    position: 'absolute',
    width: cx(76),
  },
  bottomAddBtn: {
    alignItems: 'center',
    bottom: isIphoneX ? cx(64) : cx(34),
    height: cx(76),
    justifyContent: 'center',
    position: 'absolute',
    right: cx(12),
    width: cx(76),
  },
  plus: {
    height: cx(19),
    position: 'absolute',
    top: cx(18),
    width: cx(19),
  },
});

export default AddButton;
