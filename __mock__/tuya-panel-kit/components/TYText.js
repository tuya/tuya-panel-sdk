import React from 'react';
import PropTypes from 'prop-types';
import { ColorPropType, Text } from 'react-native';

export default class TYText extends React.PureComponent {
  static propTypes = {
    /**
     * 字体类型
     */
    type: PropTypes.oneOf(['heading', 'title', 'paragraph']),
    /**
     * 字体尺寸
     */
    size: PropTypes.oneOfType([PropTypes.oneOf(['large', 'normal', 'small']), PropTypes.number]),
    /**
     * 字体对齐方式
     */
    align: PropTypes.oneOf(['left', 'center', 'right']),
    /**
     * 字体粗细
     */
    weight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    /**
     * 字体颜色
     */
    color: ColorPropType,
    ...Text.propTypes,
  };

  render() {
    return null;
  }
}
