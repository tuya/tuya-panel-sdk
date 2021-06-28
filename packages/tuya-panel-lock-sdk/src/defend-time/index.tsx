import React, { PureComponent } from 'react';
import { Text, View, StyleSheet, Image, Dimensions } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { DefendTimeProps, DefendTimeState } from './interface';
import TYNative from './api';
import Strings from './i18n';

const Res = {
  safeImage: require('../res/safe.png'),
};
const { convertX } = Utils.RatioUtils;
const { width } = Dimensions.get('window');
export default class SafeTip extends PureComponent<DefendTimeProps, DefendTimeState> {
  static defaultProps = {
    textColor: '#666666',
    tipColor: '#59A4F8',
    logoImage: Res.safeImage,
  };

  constructor(props: any) {
    super(props);
    this.state = {
      time: 0,
    };
  }

  componentDidMount() {
    TYNative.getDeviceInitDate()
      .then((d: any) => {
        this.setState({
          time: d,
        });
      })
      .catch((err: any) => {});
  }

  render() {
    const { tipColor, textColor, textStyle, tipTextStyle, logoImage } = this.props;

    const textColorStyle = {
      color: textColor,
    };
    const tipColorStyle = {
      color: tipColor,
      marginHorizontal: 5,
    };
    return (
      <View style={styles.safe}>
        <Image source={logoImage} style={styles.safeImage} />
        <Text style={[styles.safeText, textColorStyle, textStyle]}>
          {Strings.getLang('safeTip')}
        </Text>
        <Text style={[styles.safeText, tipColorStyle, tipTextStyle]}>{this.state.time}</Text>
        <Text style={[styles.safeText, textColorStyle, textStyle]}>{Strings.getLang('day')}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  safe: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    width,
  },
  safeImage: {
    marginHorizontal: convertX(10),
    tintColor: '#59A4F8',
  },
  safeText: {
    color: '#fff',
    fontSize: convertX(12),
  },
});
