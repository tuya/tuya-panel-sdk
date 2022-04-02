import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Hijack, Share } from '@tuya/tuya-panel-lock-sdk';

export default class HijackManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hijackValue: false,
    };
  }

  componentDidMount() {}

  render() {
    const { hijackValue } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <View style={styles.item}>
          <View style={styles.title}>
            <Text>default</Text>
          </View>
          <Hijack
            hasDivider
            themeColor="#239C8E"
            hijackTitle="特殊指纹"
            hijackSubTitle="开启后，可在遇到劫持危险时设置提醒告知亲友"
            unlockAttr={hijackValue}
            onValueChange={value => {
              this.setState({
                hijackValue: value,
              });
            }}
            appMessageTitle="app通知"
            phoneMessageTitle="短信通知"
            messageTypeTitle="设置提醒方式"
            codePlaceholder=""
            phonePlaceholder=""
            sendCodeTitle="验证码"
            changeHijack={() => {}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    fontSize: 16,
    justifyContent: 'center',
    marginBottom: 10,
    marginTop: 20,
    width: '100%',
  },
  title: {
    alignItems: 'center',
    backgroundColor: '#f3f3f3',
    height: 50,
    justifyContent: 'center',
    width: '100%',
  },
});
