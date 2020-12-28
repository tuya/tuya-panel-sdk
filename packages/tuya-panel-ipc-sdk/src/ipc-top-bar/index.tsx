/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/no-children-prop */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React from 'react';
import { Platform, Image, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native';
import { TopBar, TYText, Utils } from 'tuya-panel-kit';

const { width: winWidth } = Dimensions.get('screen');

const { convertX: cx } = Utils.RatioUtils;

const backIcon = Platform.OS === 'ios' ? 'backIos' : 'backAndroid';

interface TYIpcTopBarProps {
  /**
   * 背景色
   */
  background: string;
  /**
   * 左边返回箭头颜色
   */
  leftBackColor: string;
  /**
   * 中间标题颜色样式
   */
  contentTitleStyle: any;
  /**
   * 中间标题
   */
  contentTitle: string;
  /**
   * 中间图片Icon
   */
  contentImg: number;
  /**
   * 左边点击事件
   */
  leftPress: () => void;
  /**
   * 是否有右侧图标
   */
  hasRight: boolean;
  /**
   * 右边点击方法
   */
  rightPress: () => void;
  /**
   * 右边自定义图标
   */
  customImgIcon: number;
  /**
   * 右边自定义图标样式
   */
  customImgIconStyle: any;
  /**
   * 右边自定义文字
   */
  customRightText: string;
  /**
   * 右边自定义文字样式
   */
  customRightTextStyle: any;
  /**
   * 左边自定义文字
   */
  customLeftText: string;
  /**
   * 左边自定义文字样式
   */
  customLeftTextStyle: any;
}

class TYIpcTopBar extends React.Component<TYIpcTopBarProps> {
  static defaultProps: any;
  constructor(props: TYIpcTopBarProps) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      background,
      leftBackColor,
      contentTitleStyle,
      contentTitle,
      leftPress,
      hasRight,
      rightPress,
      contentImg,
      customLeftText,
      customLeftTextStyle,
      customRightText,
      customRightTextStyle,
      customImgIcon,
      customImgIconStyle,
    } = this.props;
    return (
      <View style={styles.headerPage}>
        <TopBar.Container background={background} style={{ width: winWidth }}>
          {customLeftText ? (
            <TouchableOpacity style={styles.customLeft} onPress={leftPress} activeOpacity={0.7}>
              <TYText style={[styles.customLeftText, customLeftTextStyle]}>{customLeftText}</TYText>
            </TouchableOpacity>
          ) : (
            <TopBar.Action name={backIcon} onPress={leftPress} color={leftBackColor} />
          )}

          {/* width给了个固定的，在横屏和竖屏切换时，中间标题不偏移 */}
          {contentImg ? (
            <TopBar.Content
              style={{ width: winWidth - 150 }}
              title=""
              titleStyle={[styles.cotentText, contentTitleStyle]}
              children={
                <Image
                  source={contentImg}
                  accessibilityLabel="tuya_ipc_dev_edit"
                  style={styles.rightImg}
                />
              }
            />
          ) : (
            <TopBar.Content
              style={{ width: winWidth - 150 }}
              title={contentTitle}
              titleStyle={[styles.cotentText, contentTitleStyle]}
            />
          )}
          {hasRight && !customImgIcon && !customRightText && (
            // eslint-disable-next-line react/no-children-prop
            <TopBar.Action
              // eslint-disable-next-line react/no-children-prop
              name="pen"
              // children={<Image source={Res.deviceEdit} accessibilityLabel="tuya_ipc_dev_edit" />}
              onPress={rightPress}
            />
          )}
          {hasRight && customImgIcon && (
            <TouchableOpacity style={styles.customRight} onPress={rightPress} activeOpacity={0.7}>
              <Image source={customImgIcon} style={customImgIconStyle} />
            </TouchableOpacity>
          )}

          {hasRight && customRightText && (
            <TouchableOpacity style={styles.customRight} onPress={rightPress} activeOpacity={0.7}>
              <TYText style={[styles.customRightText, customRightTextStyle]}>
                {customRightText}
              </TYText>
            </TouchableOpacity>
          )}
        </TopBar.Container>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  cotentText: {
    color: '#000',
    fontWeight: '600',
  },
  customLeft: {
    alignItems: 'center',
    left: 10,
    position: 'absolute',
  },
  customLeftText: {
    fontSize: cx(16),
    fontWeight: '600',
  },
  customRight: {
    position: 'absolute',
    right: 10,
  },
  customRightText: {
    color: 'red',
    fontSize: cx(16),
    fontWeight: '600',
  },
  headerPage: {},
  rightImg: {
    resizeMode: 'contain',
  },
});

TYIpcTopBar.defaultProps = {
  background: '#ffffff',
  leftBackColor: '#000',
  contentTitleStyle: null,
  hasRight: true,
  contentChildren: null,
  rightChildren: null,
  contentImg: null,
  centerIcon: -1,
};

export default TYIpcTopBar;
