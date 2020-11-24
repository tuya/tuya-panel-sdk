import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  ViewPropTypes,
  ColorPropType,
} from 'react-native';
import {
  TYText as TYTextBase,
  RefText as RefTextBase,
  IconFont,
} from '@tuya-rn/tuya-native-components';

const TYText = TYTextBase || RefTextBase;

const toString = Object.prototype.toString;
const isNumber = v => toString.call(v) === '[object Number]';
const isString = v => toString.call(v) === '[object String]';

export class Button extends PureComponent {
  static propTypes = {
    children: PropTypes.node,
    activeOpacity: PropTypes.number,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPressIn: PropTypes.func,
    onPressOut: PropTypes.func,
    style: ViewPropTypes.style,
    cStyle: ViewPropTypes.style,
    textStyle: Text.propTypes.style,
    disabledStyle: ViewPropTypes.style,
    imageStyle: Image.propTypes.style,
    imageBoxStyle: ViewPropTypes.style,
    image: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.shape({ uri: PropTypes.string }),
    ]),
    text: PropTypes.string,
    textDirection: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
    icon: PropTypes.string,
    iconStyle: ViewPropTypes.style,
    iconColor: ColorPropType,
    iconSize: PropTypes.number,
    numberOfLines: PropTypes.bool,
    isView: PropTypes.bool,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    children: null,
    textDirection: 'bottom',
    activeOpacity: 0.6,
    style: null,
    cStyle: null,
    text: null,
    textStyle: null,
    imageStyle: null,
    imageBoxStyle: null,
    image: null,
    icon: null,
    iconStyle: null,
    iconSize: 18,
    iconColor: '#fff',
    onPress: null,
    onLongPress: null,
    onPressIn: null,
    onPressOut: null,
    numberOfLines: true,
    isView: false,
    disabled: false,
  };

  onPress = () => {
    if (this.props.disabled) return;
    if (this.props.onPress) {
      this.props.onPress();
    }
  };

  onLongPress = () => {
    if (this.props.disabled) return;
    if (this.props.onLongPress) {
      this.props.onLongPress();
    }
  };

  onPressOut = () => {
    if (this.props.disabled) return;
    if (this.props.onPressOut) {
      this.props.onPressOut();
    }
  };

  onPressIn = () => {
    if (this.props.disabled) return;
    if (this.props.onPressIn) {
      this.props.onPressIn();
    }
  };

  filterLayoutAttrs = style => {
    const wrappedStyle = {};
    let flattenStyle;
    const needSaveLayoutAttrs = [
      'opacity',
      'width',
      'height',
      // 'flex',
      'justifyContent',
      'alignItems',
    ];
    if (style) {
      flattenStyle = { ...StyleSheet.flatten(style) };
      needSaveLayoutAttrs.forEach(curAttr => {
        flattenStyle[curAttr] && (wrappedStyle[curAttr] = flattenStyle[curAttr]);
      });
      if (flattenStyle.opacity) {
        delete flattenStyle.opacity;
      }
    }

    return {
      wrapperStyle: flattenStyle,
      wrappedStyle,
    };
  };

  packageImage = image => {
    if (isNumber(image)) return image;
    if (isString(image)) return { uri: image };
    return image;
  };

  renderImage = () => {
    const { image, imageBoxStyle, imageStyle } = this.props;
    const imageNode = (
      <Image
        style={[styles.imgStyle, imageStyle]}
        source={this.packageImage(image)}
        resizeMode="center"
      />
    );
    if (imageBoxStyle) {
      return <View style={imageBoxStyle}>{imageNode}</View>;
    }
    return imageNode;
  };

  render() {
    const {
      style,
      text,
      textStyle,
      textDirection,
      image,
      disabled,
      icon,
      iconStyle,
      iconSize,
      iconColor,
      children,
      isView,
    } = this.props;
    const direction =
      text && (textDirection === 'left' || textDirection === 'right') ? 'row' : 'column';

    const { wrapperStyle, wrappedStyle } = this.filterLayoutAttrs(style);
    const WrapperElement = isView ? View : TouchableOpacity;
    return (
      <WrapperElement
        disabled={this.props.disabled}
        activeOpacity={this.props.activeOpacity}
        onLongPress={this.onLongPress}
        onPress={this.onPress}
        onPressIn={this.onPressIn}
        style={wrapperStyle}
        onPressOut={this.onPressOut}
      >
        <View
          style={[
            wrappedStyle,
            styles.container,
            { flexDirection: direction },
            disabled && [styles.disabled, this.props.disabledStyle],
          ]}
        >
          {text && (textDirection === 'left' || textDirection === 'top') && (
            <TYText
              numberOfLines={this.props.numberOfLines ? 1 : null}
              style={[styles.txtStyle, textStyle]}
            >
              {text}
            </TYText>
          )}
          {!!image && this.renderImage()}
          {!!icon && (
            <View style={[styles.iconWrapStyle, iconStyle]}>
              <IconFont d={icon} size={iconSize} color={iconColor} />
            </View>
          )}
          {!!children && children}
          {!!text && (textDirection === 'right' || textDirection === 'bottom') && (
            <TYText
              numberOfLines={this.props.numberOfLines ? 1 : null}
              style={[styles.txtStyle, textStyle]}
            >
              {text}
            </TYText>
          )}
        </View>
      </WrapperElement>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  disabled: {
    opacity: 0.5,
  },

  imgStyle: {
    backfaceVisibility: 'visible',
  },

  txtStyle: {
    textAlign: 'center',
    backgroundColor: 'transparent',
  },

  iconWrapStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
