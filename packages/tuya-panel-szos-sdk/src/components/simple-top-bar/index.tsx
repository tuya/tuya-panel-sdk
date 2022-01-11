/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-children-prop */
import PropTypes from 'prop-types';
import React, { FC } from 'react';
import { StyleSheet, StyleProp, ViewStyle, ViewPropTypes, TextStyle } from 'react-native';
import { TopBar, Utils, IconFont } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

type IProps = {
  /*
   * topbar中间名字
   */
  title?: string;
  /*
   * 左边按钮功能
   */
  leftActionFunc?: () => void;
  /*
   * 右边按钮功能
   */
  rightNode?: React.ReactNode;
  /*
   * 左边图标位置替换node
   */
  leftNode?: React.ReactNode;
  /*
   * 右边图标位置替换node
   */
  rightActionFunc?: () => void;
  /*
   * 左边图标样式
   */
  leftStyle?: StyleProp<ViewStyle>;
  /*
   * 右边图标样式
   */
  rightStyle?: StyleProp<ViewStyle>;
  /*
   * topbar外层样式
   */
  wrapStyle?: StyleProp<ViewStyle>;
  /*
   * topbar中间文字样式
   */
  titleStyle?: StyleProp<TextStyle>;
};

const MyTopBar: FC<IProps> = ({
  title,
  leftActionFunc,
  rightNode,
  leftNode,
  rightActionFunc,
  leftStyle,
  rightStyle,
  titleStyle,
  wrapStyle,
}) => {
  return (
    <TopBar.Container style={styles.topbar} contentStyle={wrapStyle}>
      <TopBar.Action
        style={leftStyle}
        onPress={leftActionFunc}
        children={leftNode || <IconFont name="backIos" />}
      />
      <TopBar.Content title={title} titleStyle={titleStyle} />
      <TopBar.Action
        style={rightStyle}
        onPress={rightActionFunc}
        children={rightNode || <IconFont name="pen" />}
      />
    </TopBar.Container>
  );
};

MyTopBar.propTypes = {
  wrapStyle: ViewPropTypes.style,
  leftActionFunc: PropTypes.func,
  rightActionFunc: PropTypes.func,
  rightNode: PropTypes.node,
  leftNode: PropTypes.node,
  title: PropTypes.string,
  leftStyle: ViewPropTypes.style,
  rightStyle: ViewPropTypes.style,
  titleStyle: ViewPropTypes.style,
};

MyTopBar.defaultProps = {
  leftActionFunc: () => {},
  rightActionFunc: () => {},
  rightNode: undefined,
  leftNode: undefined,
  title: '',
  leftStyle: { marginLeft: cx(25) },
  rightStyle: { marginRight: cx(25) },
  titleStyle: { fontSize: cx(17) },
  wrapStyle: { backgroundColor: '#fff' },
};
const styles = StyleSheet.create({
  topbar: {
    width: '100%',
    zIndex: 999,
  },
});

export default React.memo(MyTopBar);
