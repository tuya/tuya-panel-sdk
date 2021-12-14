/* eslint-disable react/display-name */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-children-prop */
import PropTypes from 'prop-types';
import React, { FC, useRef, useState, forwardRef, useImperativeHandle } from 'react';
import {
  StyleSheet,
  TextInput,
  StyleProp,
  TextStyle,
  ViewPropTypes,
  View,
  ViewStyle,
} from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;

interface IPutProps {
  /*
   * 必须有一个唯一的name
   */
  name: string;
  /*
   * 输入框样式
   */
  viewStyle?: StyleProp<ViewStyle>;
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
  /*
   * 输入框样式
   */
  iptStyle?: StyleProp<TextStyle>;
  /*
   * 输入框聚焦时触发
   */
  focusFuc?: any;
  /*
   * 输入框ref
   */
  ref?: any;
  /*
   * 输入框文本change事件
   */
  changeText?: any;
  /*
   * 限制输入框最小输入的值
   */
  minVal?: number;
  /*
   * 限制输入框最大输入的值
   */
  maxVal?: number;
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
      viewStyle,
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
        osg?.current.focus();
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
      <View style={[viewStyle, styles.wrap]}>
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
      </View>
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
  viewStyle: ViewPropTypes.style,
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
  viewStyle: { borderWidth: 1, borderColor: 'gray' },
};

const styles = StyleSheet.create({
  inputIp: {
    alignItems: 'center',
    color: 'rgba(103, 112, 123, 1)',
    fontSize: cx(15),
    height: cx(15),
    justifyContent: 'center',
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
  },
  wrap: {
    alignItems: 'center',
    height: cy(30),
    justifyContent: 'center',
    lineHeight: cy(30),
    width: cx(50),
  },
});

export default MyIpt;
