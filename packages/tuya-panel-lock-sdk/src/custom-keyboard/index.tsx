/* eslint-disable consistent-return */
import React, { FC } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Utils, Button, Modal, TYText } from 'tuya-panel-kit';
import { ICustomKeyboardProps, IDefaultProps } from './interface';

const { convertX: cx, convertY: cy, width } = Utils.RatioUtils;

const Res = {
  // eslint-disable-next-line import/no-unresolved
  numDelete: require('../res/numDelete.png'),
};

const CustomKeyboard: FC<ICustomKeyboardProps> = ({
  visible,
  maxNum,
  isHasZero,
  themeColor,
  confirmText,
  confirmTextStyle,
  onConfirm,
  onMaskPress,
  onValueChange,
}) => {
  const numDefaultArr = Array.from(Array(maxNum), (item, index) => index + 1);
  isHasZero && numDefaultArr.push(0);
  numDefaultArr.push(-1);

  const len = numDefaultArr.length;
  const row = Math.ceil(len / 3);

  const _confirm = () => {
    if (typeof onConfirm === 'function') {
      return onConfirm();
    }
  };

  const _changeValue = item => {
    if (typeof onValueChange === 'function') {
      return onValueChange(item);
    }
  };

  return (
    <Modal
      visible={visible}
      onMaskPress={onMaskPress}
      maskStyle={{ backgroundColor: 'transparent' }}
    >
      <View style={[styles.container, { height: cy(row * 58 + 13) }]}>
        <View style={styles.numWrap}>
          {numDefaultArr.map(item => (
            <TouchableOpacity key={item} activeOpacity={0.9} onPress={() => _changeValue(item)}>
              <View style={styles.item}>
                {item === -1 && <Image source={Res.numDelete} />}
                {item !== -1 && (
                  <TYText style={styles.itemText}>{item < 0 || item > maxNum ? '' : item}</TYText>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <Button
          text={confirmText || 'Confirm'}
          type="primary"
          style={[styles.confirm, { height: cy(row * 58 - 8), backgroundColor: themeColor }]}
          textStyle={[styles.confirmText, confirmTextStyle]}
          stretch
          onPress={_confirm}
        />
      </View>
    </Modal>
  );
};

CustomKeyboard.defaultProps = IDefaultProps;

const styles = StyleSheet.create({
  confirm: {
    backgroundColor: '#239C8E',
    borderRadius: 2,
    height: cy(219),
    width: cx(89),
  },
  confirmText: {
    color: '#fff',
    fontSize: cx(16),
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#F8F8F8',
    flexDirection: 'row',
    height: cy(236),
    marginTop: 8,
    paddingHorizontal: cx(8),
    width,
  },
  item: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 2,
    height: cy(50),
    justifyContent: 'center',
    marginBottom: cy(8),
    marginRight: cx(8),
    width: cx(82),
  },
  itemText: {
    color: '#333',
    fontSize: cx(24),
    fontWeight: 'bold',
  },
  numWrap: {
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: cy(2),
    marginTop: cy(11),
  },
});

export default CustomKeyboard;
