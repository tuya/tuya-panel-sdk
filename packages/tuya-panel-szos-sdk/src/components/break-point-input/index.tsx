/* eslint-disable react/display-name */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-children-prop */
import PropTypes from 'prop-types';
import React, { FC, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import { StyleSheet, TextInput, StyleProp, TextStyle, ViewPropTypes } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;

interface IPutProps {
  /*
   * 必须有一个唯一的name
   */
  name: string;
  /*
   * placeholder站位
   */
  placeholder?: string;
  /*
   * 改变placeholder颜色
   */
  changeColor?: boolean;
  /*
   * 是否可编辑
   */
  editable?: boolean;
  iptStyle?: StyleProp<TextStyle>;
  focusFuc?: any;
  ref?: any;
  changeText?: any;
  minVal?: number; // 最小值
  maxVal?: number; // 最大值
}

const MyIpt: FC<IPutProps> = forwardRef(
  (
    {
      name,
      placeholder,
      changeColor = false,
      iptStyle,
      focusFuc,
      changeText,
      minVal = 0,
      maxVal = 255,
      editable = true,
    },
    ref
  ) => {
    const [fus, setFus] = useState<boolean>(false);
    const [value, setVal] = useState<string>('');
    const osg = useRef(null);
    useImperativeHandle(ref, () => ({
      // 定义modal ref 的属性
      value,
      setFocus: () => {
        // osg?.current.focus();
      },
    }));

    const onF = () => {
      setFus(true);
      focusFuc();
    };

    const onChangeText = (val: any) => {
      const inputVal = parseInt(val, 10);
      if (inputVal > maxVal || (val !== '' && inputVal < minVal)) {
        setVal('');
        return;
      }
      setVal(inputVal === 0 ? '0' : val);
      changeText(val);
    };

    return (
      <TextInput
        ref={osg}
        key={`${name}`}
        style={[styles.inputIp, iptStyle]}
        placeholderTextColor={changeColor ? 'rgba(103, 112, 123, 1)' : 'rgba(103, 112, 123, 0.5)'}
        underlineColorAndroid="transparent"
        placeholder={fus ? '' : placeholder}
        maxLength={3}
        multiline
        numberOfLines={1}
        keyboardType="numeric"
        onFocus={onF}
        clearTextOnFocus
        onChangeText={e => onChangeText(e)}
        selectionColor="rgba(152, 165, 198, 1)"
        value={value}
        editable={editable}
      />
    );
  }
);

MyIpt.propTypes = {
  changeColor: PropTypes.bool,
  editable: PropTypes.bool,
  focusFuc: PropTypes.func,
  changeText: PropTypes.func,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  minVal: PropTypes.number,
  maxVal: PropTypes.number,
  iptStyle: ViewPropTypes.style,
};

MyIpt.defaultProps = {
  focusFuc: () => {},
  changeText: () => {},
  changeColor: false,
  editable: true,
  name: '',
  placeholder: '',
  minVal: 255,
  maxVal: 255,
  iptStyle: null,
};

const styles = StyleSheet.create({
  inputIp: {
    alignItems: 'center',
    color: 'rgba(103, 112, 123, 1)',
    fontSize: cx(15),
    height: cy(18),
    justifyContent: 'center',
    lineHeight: cy(18),
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: cx(30),
  },
});

export default MyIpt;
