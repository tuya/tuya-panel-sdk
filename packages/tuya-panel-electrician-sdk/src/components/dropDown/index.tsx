import React from 'react';
import { Animated, Easing, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Utils, TYText, IconFont } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;
const set =
  'M754.773333 170.666667a64 64 0 0 1 42.581334 111.744L614.4 445.781333l0.042667 406.186667a64 64 0 0 1-57.856 63.701333l-6.144 0.298667a64 64 0 0 1-39.68-13.738667l-119.466667-94.336a64 64 0 0 1-24.32-50.218666l-0.042667-314.410667-152.021333-165.248a64 64 0 0 1-0.853333-85.76l4.608-4.693333A64 64 0 0 1 261.930667 170.666667z m-55.978666 85.333333H310.570667l130.432 141.781333a42.666667 42.666667 0 0 1 10.922666 23.594667L452.266667 426.666667l-0.042667 320.64 76.8 60.629333L529.066667 426.666667a42.666667 42.666667 0 0 1 10.624-28.16l3.626666-3.669334L698.794667 256zM853.333333 736a32 32 0 0 1 4.352 63.701333L853.333333 800h-128a32 32 0 0 1-4.352-63.701333L725.333333 736h128z m0-128a32 32 0 0 1 4.352 63.701333L853.333333 672h-128a32 32 0 0 1-4.352-63.701333L725.333333 608h128z m0-128a32 32 0 0 1 4.352 63.701333L853.333333 544h-128a32 32 0 0 1-4.352-63.701333L725.333333 480h128z';

interface DropDownProps {
  /**
   * content 展开内容
   */
  content?: any;
  /**
   * themeColor 主题配色
   */
  themeColor?: string;
  /**
   * themeColor 图标配色
   */
  tintColor?: string;
  /**
   * title: 头部标题
   */
  title?: string;
  /**
   * 头部标题icon
   */
  iconPath?: string;
  /**
   * style 最外层样式
   */
  style?: any;
  /**
   *  topStyle 头部样式
   */
  topStyle?: any;
  /**
   * arrow 是否需要箭头
   */
  arrow?: boolean;
  /**
   * maxHeight 最大可展开高度
   */
  maxHeight?: number;
  /**
   * titleStyle 标题样式
   */
  titleStyle?: any;
  /**
   * duration 动画延时
   */
  duration?: number;
  /**
   * animateWapperStyle 内容部分样式
   */
  animateWapperStyle?: any;
  icon?: any;
}

interface DropDownState {
  rotateValue: any;
  changeValue: number;
}

export default class DropDown extends React.Component<DropDownProps, DropDownState> {
  static defaultProps = {
    title: 'dropdown',
    style: null,
    topStyle: null,
    arrow: true,
    maxHeight: 0,
    iconPath: set,
    titleStyle: null,
    duration: 200,
    animateWapperStyle: null,
    themeColor: '#338CE5',
    tintColor: '#FFFFFF',
  };

  constructor(props: DropDownProps) {
    super(props);
    this.state = {
      rotateValue: new Animated.Value(0),
      changeValue: 0,
    };
  }

  _handleToToggle = changeValue => {
    const { duration } = this.props;
    const rotateValue = changeValue === 0 ? 180 : 0;
    Animated.timing(this.state.rotateValue, {
      toValue: rotateValue, // 最终值 为1，这里表示最大旋转 360度
      duration,
      easing: Easing.linear,
    }).start(() => {
      this.state.rotateValue.setValue(rotateValue);
    });
    this.setState({
      changeValue: changeValue === 0 ? 180 : 0,
    });
  };

  render() {
    const { maxHeight } = this.props;
    const height = this.state.rotateValue.interpolate({
      inputRange: [0, 180], // 输入值
      outputRange: [0, maxHeight], // 输出值
    });
    const {
      content,
      animateWapperStyle,
      themeColor,
      titleStyle,
      iconPath,
      title,
      style,
      topStyle,
      arrow,
      icon,
      tintColor,
    } = this.props;
    const { changeValue } = this.state;
    return (
      <View style={[styles.content, style]}>
        <TouchableOpacity
          style={[styles.title, topStyle]}
          onPress={() => this._handleToToggle(changeValue)}
        >
          <View style={styles.leftcontent}>
            {!!icon && (
              <View style={[styles.imgContent, { backgroundColor: themeColor }]}>
                <Image source={icon} style={{ tintColor }} />
              </View>
            )}
            <TYText style={[styles.titleText, titleStyle]}>{title}</TYText>
          </View>
          {arrow && <IconFont d={iconPath} color={themeColor} size={20} />}
        </TouchableOpacity>
        <Animated.View
          style={[
            styles.animate,
            {
              height,
            },
            animateWapperStyle,
          ]}
        >
          {content()}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  animate: {
    backgroundColor: 'red',
    overflow: 'hidden',
    width: cx(343),
  },
  content: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: cx(16),
    justifyContent: 'center',
    overflow: 'hidden',
    width: cx(343),
  },
  imgContent: {
    alignItems: 'center',
    backgroundColor: '#00B294',
    borderRadius: cx(18),
    height: cx(36),
    justifyContent: 'center',
    marginRight: cx(16),
    width: cx(36),
  },
  leftcontent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  title: {
    alignItems: 'center',
    flexDirection: 'row',
    height: cx(72),
    justifyContent: 'space-between',
    paddingHorizontal: cx(16),
    width: cx(343),
  },
  titleText: {
    backgroundColor: 'transparent',
    color: '#333333',
    fontSize: cx(16),
    fontWeight: 'bold',
  },
});
