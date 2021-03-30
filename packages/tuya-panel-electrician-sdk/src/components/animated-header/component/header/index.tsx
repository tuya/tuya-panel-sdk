import React, { Component } from 'react';
import { View, Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { Utils, TYSdk, IconFont, TYText } from 'tuya-panel-kit';
import { HeaderProps } from '../index.type';

const { convertX: cx, isIphoneX, isIos, statusBarHeight, width: winWidth } = Utils.RatioUtils;
const TOPBAR_HEIGHT = isIos ? (isIphoneX ? 88 : 64) : 56;

export default class Header extends Component<HeaderProps> {
  renderHeader = () => {
    const { title, opacity, rightDisable, tintColor, iconPath, headerTextColor } = this.props;
    return (
      <View style={[styles.header, { height: TOPBAR_HEIGHT }]}>
        <View style={styles.headerView}>
          <Animated.View style={{ opacity }}>
            <TouchableOpacity style={styles.backBtn} onPress={() => TYSdk.Navigator.pop()}>
              <IconFont name="backIos" size={18} color={headerTextColor} />
            </TouchableOpacity>
          </Animated.View>
          <TYText style={styles.name} numberOfLines={1}>
            {title}
          </TYText>
          <Animated.View style={{ opacity }}>
            {!rightDisable && (
              <TouchableOpacity style={styles.set} onPress={() => this.props.setChange(0)}>
                <IconFont d={iconPath} color={tintColor} size={20} />
              </TouchableOpacity>
            )}
          </Animated.View>
        </View>
      </View>
    );
  };

  render() {
    return <View>{this.renderHeader()}</View>;
  }
}

const styles = StyleSheet.create({
  backBtn: {
    alignItems: 'flex-start',
    height: cx(40),
    justifyContent: 'center',
    width: cx(40),
  },
  header: {
    backgroundColor: 'rgba(34,35,67,.3)',
    width: winWidth,
  },
  headerView: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    height: TOPBAR_HEIGHT,
    justifyContent: 'space-between',
    paddingLeft: cx(11),
    paddingRight: cx(12),
    paddingTop: isIos ? statusBarHeight : 0,
    width: cx(375),
  },
  name: {
    backgroundColor: 'transparent',
    color: '#333',
    fontSize: 17,
    fontWeight: 'bold',
    maxWidth: cx(280),
  },
  set: {
    alignItems: 'flex-end',
    height: cx(40),
    justifyContent: 'center',
    width: cx(40),
  },
});
