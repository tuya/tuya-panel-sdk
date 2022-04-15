import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { ViewPropTypes, StyleSheet, View, TouchableOpacity, TextInput } from 'react-native';
import { Utils, IconFont } from 'tuya-panel-kit';

const dPlus =
  'M563.20064 196.288l448 597.312A64 64 0 0 1 960.00064 896H64.00064a64 64 0 0 1-51.2-102.4l448-597.312a64 64 0 0 1 102.4 0z';

const dMinus =
  'M563.20064 827.712l448-597.312A64 64 0 0 0 960.00064 128H64.00064a64 64 0 0 0-51.2 102.4l448 597.312a64 64 0 0 0 102.4 0z';

const { inMaxMin, add, subtract } = Utils.NumberUtils;
const { convertX: cx } = Utils.RatioUtils;

export default class Stepper extends PureComponent {
  static propTypes = {
    /**
     * 步进器内容样式
     */
    style: ViewPropTypes.style,
    /**
     * 输入框样式
     */
    inputStyle: ViewPropTypes.style,
    /**
     * 加减按钮样式
     */
    buttonStyle: ViewPropTypes.style,
    /**
     * 是否支持手动编辑
     */
    editable: PropTypes.bool,
    /**
     * 按钮类型
     */
    buttonType: PropTypes.oneOf(['ellipse', 'triangle']),
    /**
     * 最小值
     */
    min: PropTypes.number,
    /**
     * 最大值
     */
    max: PropTypes.number,
    /**
     * 具体值
     */
    value: PropTypes.number,
    /**
     * 步长
     */
    stepValue: PropTypes.number,
    /**
     * 按钮类型为 ellipse 时按钮激活状态下的颜色
     */
    ellipseIconColor: PropTypes.string,
    /**
     * 按钮类型为 triangle 时激活状态下的颜色
     */
    triangleIconColor: PropTypes.string,
    /**
     * 文本输入的高亮和光标颜色
     */
    selectionColor: PropTypes.string,
    /**
     * 按钮类型为 triangle 时的减法按钮路径
     */
    iconMinusPath: PropTypes.string,
    /**
     * 按钮类型为 triangle 时的加法按钮路径
     */
    iconPlusPath: PropTypes.string,
    /**
     * 短按值回调
     * @param {number} value - 具体值
     */
    onValueChange: PropTypes.func,
    /**
     * 是否禁用
     * @version 2.0.0-rc.7
     */
    disabled: PropTypes.bool,
    /**
     * 获取TextInput 实例ref
     * @version 2.0.0-rc.7
     */
    getTextInputRef: PropTypes.func,
  };

  static defaultProps = {
    style: {},
    buttonStyle: {},
    inputStyle: {},
    editable: true,
    min: 0,
    value: 20,
    max: 99,
    stepValue: 1,
    ellipseIconColor: '#333333',
    selectionColor: '#FF4800',
    buttonType: 'ellipse',
    iconMinusPath: dMinus,
    iconPlusPath: dPlus,
    triangleIconColor: '#FF4800',
    onValueChange: () => {},
    disabled: false,
    getTextInputRef: () => {},
  };

  constructor(props) {
    super(props);
    this.state = {
      value: inMaxMin(props.min, props.max, props.value),
    };
  }

  componentDidMount() {
    const { getTextInputRef } = this.props;
    getTextInputRef && getTextInputRef(this.TextInputRef);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps(nextProps) {
    const { value } = this.props;
    if (value !== nextProps.value) {
      this.setState({
        value: nextProps.value,
      });
    }
  }

  componentWillUnmount() {
    this.clearInterval();
  }

  clearInterval() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  _handleMath = isMinus => {
    const { min, max, onValueChange, stepValue } = this.props;
    const { value } = this.state;
    if (isMinus) {
      if (value > min) {
        const step = Math.min(stepValue, subtract(value, min));
        onValueChange && onValueChange(subtract(value, step));
        this.setState({
          value: subtract(value, step),
        });
      }
    } else if (value <= max) {
      const step = Math.min(stepValue, subtract(max, value));
      onValueChange && onValueChange(add(value, step));
      this.setState({
        value: add(value, step),
      });
    }
  };

  _handlePressOut = () => {
    this.clearInterval();
  };

  _handlePressIn = isMinus => () => {
    this._handleMath(isMinus);
    this.clearInterval();
    this.timer = setInterval(() => {
      this._handleMath(isMinus);
    }, 250);
  };

  _handleChangeText = newValue => {
    const { max, min } = this.props;
    const idx = newValue.indexOf('.');
    if (!idx) return;
    if (idx === -1) {
      if (
        Number(newValue) > max ||
        Number(newValue) < min ||
        (newValue.length === 2 && !newValue.indexOf('0') && newValue[1] !== '.')
      ) {
        return;
      }
      this.setState({
        value: newValue,
      });
    } else {
      if (
        Number(newValue.substr(0, idx)) >= max ||
        Number(newValue.substr(0, idx)) < min ||
        newValue.length > idx + 2
      ) {
        return;
      }
      this.setState({
        value: newValue,
      });
    }
  };

  _handleEndText = () => {
    const { min, onValueChange } = this.props;
    const { value } = this.state;
    const newValue = Number(value);
    if (typeof value === 'string' && !value.length) {
      onValueChange && onValueChange(min);
      this.setState({
        value: min,
      });
    } else {
      this.setState({
        value: newValue,
      });
      onValueChange && onValueChange(newValue);
    }
  };

  renderEllipse = () => {
    const {
      min,
      max,
      style,
      buttonStyle,
      ellipseIconColor,
      selectionColor,
      inputStyle,
      editable,
      disabled,
      ...textInputProps
    } = this.props;
    const { value } = this.state;
    return (
      <View style={[styles.bigButton, style]}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.touchableOpacity,
            buttonStyle,
            (disabled || value === min) && { opacity: 0.4 },
          ]}
          disabled={disabled || value === min}
          onPressOut={this._handlePressOut}
          onPressIn={this._handlePressIn(true)}
        >
          <IconFont
            size={12}
            underlineColorAndroid="transparent"
            fill={ellipseIconColor}
            fillOpacity={disabled || value === min ? 0.4 : 1}
            name="minus"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TextInput
          enablesReturnKeyAutomatically
          underlineColorAndroid="transparent"
          ref={ref => {
            this.TextInputRef = ref;
          }}
          maxLength={4}
          {...textInputProps}
          style={[styles.input, disabled && { color: 'rgba(51,51,51,.4)' }, inputStyle]}
          onEndEditing={this._handleEndText}
          value={value.toString()}
          onChangeText={this._handleChangeText}
          keyboardType="numeric"
          selectionColor={selectionColor}
          editable={!disabled && editable}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.touchableOpacity,
            buttonStyle,
            (disabled || value === max) && { opacity: 0.4 },
          ]}
          disabled={disabled || value === max}
          onPressOut={this._handlePressOut}
          onPressIn={this._handlePressIn(false)}
        >
          <IconFont
            size={12}
            underlineColorAndroid="transparent"
            fill={ellipseIconColor}
            fillOpacity={disabled || value === max ? 0.4 : 1}
            name="plus"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  renderTriangle = () => {
    const {
      min,
      max,
      style,
      buttonStyle,
      triangleIconColor,
      selectionColor,
      iconMinusPath,
      iconPlusPath,
      inputStyle,
      editable,
      disabled,
      ...textInputProps
    } = this.props;
    const { value } = this.state;
    return (
      <View style={[styles.rightView, style]}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.touchableThreeView,
            buttonStyle,
            (disabled || value === min) && { opacity: 0.4 },
          ]}
          disabled={disabled || value === min}
          onPressOut={this._handlePressOut}
          onPressIn={this._handlePressIn(true)}
        >
          <IconFont
            underlineColorAndroid="transparent"
            fill={triangleIconColor}
            fillOpacity={disabled || value === min ? 0.4 : 1}
            d={iconMinusPath}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TextInput
          enablesReturnKeyAutomatically
          ref={ref => {
            this.TextInputRef = ref;
          }}
          underlineColorAndroid="transparent"
          maxLength={4}
          {...textInputProps}
          editable={!disabled && editable}
          style={[disabled && { color: 'rgba(51,51,51,.4)' }, inputStyle]}
          onEndEditing={this._handleEndText}
          value={value.toString()}
          onChangeText={this._handleChangeText}
          keyboardType="numeric"
          selectionColor={selectionColor}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={[
            styles.touchableThreeView,
            buttonStyle,
            (disabled || value === max) && { opacity: 0.4 },
          ]}
          disabled={disabled || value === max}
          onPressOut={this._handlePressOut}
          onPressIn={this._handlePressIn(false)}
        >
          <IconFont
            size={12}
            underlineColorAndroid="transparent"
            fill={triangleIconColor}
            fillOpacity={disabled || value === max ? 0.4 : 1}
            d={iconPlusPath}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { buttonType } = this.props;
    return buttonType === 'ellipse' ? this.renderEllipse() : this.renderTriangle();
  }
}

const styles = StyleSheet.create({
  bigButton: {
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: cx(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: cx(2),
    width: cx(153),
  },
  icon: {
    // fontSize: 12,
    color: '#333333',
    width: cx(22),
    // eslint-disable-next-line react-native/sort-styles
    height: cx(22),
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    textAlign: 'center',
  },
  input: {
    alignItems: 'center',
    color: '#333333',
    fontSize: 16,
    height: cx(22),
    justifyContent: 'center',
    padding: 0,
    textAlign: 'center',
    width: cx(22),
  },
  rightView: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: cx(104),
  },
  touchableOpacity: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: 'rgba(51, 51, 51, 0.2)',
    borderRadius: cx(14),
    borderWidth: StyleSheet.hairlineWidth,
    height: cx(28),
    justifyContent: 'center',
    width: cx(52),
  },
  touchableThreeView: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: cx(1),
    height: cx(12),
    justifyContent: 'center',
    width: cx(18),
  },
});
