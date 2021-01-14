import React from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes } from 'react-native';

export default class IconFont extends React.PureComponent {
  static propTypes = {
    /**
     * 内容样式
     */
    style: ViewPropTypes.style,
    /**
     * 字体尺寸大小，valueSize 或 unitSize 的缩写版
     * 其中 valueSize 将会和与 size  相同，unitSize  将会为 size  值的一半。
     */
    size: PropTypes.number,
    /**
     * 值的大小
     */
    valueSize: PropTypes.number,
    /**
     * 可以用来定制每个值的颜色
     */
    valueColors: PropTypes.array,
    /**
     * 值的颜色
     */
    valueColor: PropTypes.string,
    /**
     * 单位，字符串为内置的 svg name
     */
    unit: PropTypes.string,
    /**
     * 单位的大小
     */
    unitSize: PropTypes.number,
    /**
     * 单位的颜色
     */
    unitColor: PropTypes.string,
    /**
     * 单位的左边距
     */
    unitPaddingLeft: PropTypes.number,
    /**
     * 单位的上边距
     */
    unitPaddingTop: PropTypes.number,
    /**
     * 单位的类型
     */
    unitType: PropTypes.oneOf(['icon', 'text']),
    /**
     * 值
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /**
     * 自定义文字的宽度
     */
    letterWidth: PropTypes.number,
    /**
     * 自定义符号的宽度（如.,:等）
     */
    symbolWidth: PropTypes.number,
    /**
     * 哪些字符串被认作为symbol，并被应用与symbolWidth
     */
    symbols: PropTypes.array,
    /**
     * 额外的svg路径映射表，用于拓展内部的svg path或覆盖内部的svg path
     */
    svgMap: PropTypes.object,
  };

  render() {
    return null;
  }
}
