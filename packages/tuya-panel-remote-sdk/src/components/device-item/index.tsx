import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  StyleProp,
  ImageStyle,
  ViewStyle,
} from 'react-native';
import { Utils, Swipeout, TYText } from 'tuya-panel-kit';
import { BoxShadow } from 'react-native-shadow';
import { isString, pickBy } from 'lodash';

import Res from './res';
import { MainProps } from './interface';

const { width: screenWidth } = Dimensions.get('window');
const { convertX: cx } = Utils.RatioUtils;

const fontColor = 'rgb(51, 51, 51)';
const subTitleColor = 'rgba(51, 51, 51, 0.6)';
const themeColor = '#FFF';

const DeviceItem: React.FC<MainProps> = ({
  swipeContent,
  title,
  icon,
  subTitle,
  titleStyle = null,
  subTitleStyle = null,
  disabled = false,
  width = screenWidth * 0.92,
  height = cx(110),
  extra = null,
  showRightArrow = true,
  showShadow = true,
  style = null,
  swipeContentButtonWidth = cx(80),
  iconStyle = { width: cx(40), height: cx(40) },
  rightIconStyle = {},
  rightIcon = Res.iconRightArrow,
  enableSwipe = Platform.OS === 'ios',
  content = null,
  onPress,
  onLongPress,
  onScroll,
}) => {
  const renderIcon = (img: string | number | React.ReactNode, imgStyle?: StyleProp<ImageStyle>) => {
    if (!img) return null;
    if (React.isValidElement(img)) return img;
    const imgSource = isString(img) ? { uri: img } : img;
    return <Image source={imgSource} style={imgStyle} />;
  };

  const renderLeftIcon = () => <View style={styles.leftIcon}>{renderIcon(icon, iconStyle)}</View>;

  const renderRightIcon = () =>
    !!showRightArrow && (
      <View style={styles.rightIcon}>{renderIcon(rightIcon, rightIconStyle)}</View>
    );

  const renderTitle = () => (
    <View style={styles.titleMain}>
      <View>
        <TYText
          style={[styles.title, titleStyle]}
          text={title}
          ellipsizeMode="tail"
          numberOfLines={1}
        />
        <TYText
          style={[styles.subTitle, subTitleStyle]}
          text={subTitle}
          ellipsizeMode="tail"
          numberOfLines={1}
        />
      </View>
    </View>
  );

  const innerStyle = () => {
    return pickBy(style as any, (__, key: string) => !key.startsWith('border'));
  };

  const renderItem = (innerSty?: StyleProp<ViewStyle>) => {
    if (React.isValidElement(content)) return content;
    return (
      <TouchableOpacity
        activeOpacity={disabled ? 1 : 0.8}
        style={[{ height, width }, styles.radius, innerSty]}
        onPress={!disabled && onPress}
        onLongPress={!disabled && onLongPress}
      >
        <View style={styles.content}>
          {renderLeftIcon()}
          {renderTitle()}
          {React.isValidElement(extra) && extra}
          {renderRightIcon()}
        </View>
      </TouchableOpacity>
    );
  };

  /**
   * @description 判断是否开启侧滑
   */
  const renderSwipe = () => {
    if (enableSwipe) {
      return (
        <Swipeout
          autoClose
          right={swipeContent}
          style={[styles.inner, { height, width }, style]}
          buttonWidth={swipeContentButtonWidth}
          scroll={onScroll}
          disabled={disabled}
        >
          {renderItem()}
        </Swipeout>
      );
    }
    return renderItem(style);
  };

  /**
   * @description 判断是否开启阴影
   */
  const renderShadow = () => {
    if (!showShadow) return renderSwipe();
    if (Platform.OS === 'ios') {
      return <View style={styles.shadow}>{renderSwipe()}</View>;
    }
    return (
      <BoxShadow
        setting={{
          width,
          height,
          color: '#5F5F5F',
          border: cx(14),
          opacity: 0.1,
          radius: cx(5),
          x: 0,
          y: 0,
        }}
      >
        {renderSwipe()}
      </BoxShadow>
    );
  };

  return <View style={[styles.outer, { height, width }, innerStyle()]}>{renderShadow()}</View>;
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
  },
  inner: {
    backgroundColor: themeColor,
    borderRadius: cx(10),
  },
  leftIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    width: cx(80),
  },
  outer: {
    alignSelf: 'center',
    borderRadius: cx(10),
    flexDirection: 'row',
  },
  radius: {
    borderRadius: cx(10),
  },
  rightIcon: {
    justifyContent: 'center',
    marginLeft: cx(5),
    width: cx(30),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  subTitle: {
    color: subTitleColor,
    fontSize: cx(12),
  },
  title: {
    color: fontColor,
    fontSize: cx(18),
    marginBottom: cx(8),
  },
  titleMain: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default DeviceItem;
