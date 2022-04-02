import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Share } from '@tuya/tuya-panel-lock-sdk';

const logo = require('../../../res/Logo.png');

export default class ShareManager extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <View style={styles.item}>
          <View style={styles.title}>
            <Text>default</Text>
          </View>
          <Share shareMessage="浮丘测试" text="分享" />
        </View>
        <View style={styles.item}>
          <View style={styles.title}>
            <Text>themeColor</Text>
          </View>
          <Share
            shareMessage="浮丘测试"
            themeColor="#cd6d8c"
            text="分享"
            onClick={params => {
              console.log('params', params);
            }}
          />
        </View>
        <View style={styles.item}>
          <View style={styles.title}>
            <Text>content</Text>
          </View>
          <Share
            shareMessage="浮丘测试"
            themeColor="#cd6d8c"
            customShareList={[
              {
                key: 'WeChat',
                title: 'test',
                img: logo,
                shareData: {
                  title: '',
                  contentType: 'miniProgram',
                  message: 'miniProgram',
                  miniProgramInfo: {
                    webpageUrl: 'https://www.tuya.com',
                    userName: 'gh_42ad2888c42d',
                    miniProgramType: 0,
                  },
                },
              },
            ]}
            text="分享"
            onClick={params => {
              console.log('params', params);
            }}
          >
            <View>
              <Text>"fsf"</Text>
            </View>
          </Share>
        </View>
        <View style={styles.item}>
          <View style={styles.title}>
            <Text>disable</Text>
          </View>
          <Share shareMessage="浮丘测试" themeColor="#cd6d11" text="分享" />
        </View>
        <View style={styles.item}>
          <View style={styles.title}>
            <Text>style</Text>
          </View>
          <Share
            shareMessage="浮丘测试"
            style={{
              width: 100,
              height: 30,
              backgroundColor: '#cdcd',
              borderColor: '#333',
              borderRadius: 20,
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            textStyle={{
              color: '#888',
              fontSize: 20,
            }}
            modalStyle={{
              borderRadius: 5,
            }}
            themeColor="#cd6d"
            text="分享"
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
