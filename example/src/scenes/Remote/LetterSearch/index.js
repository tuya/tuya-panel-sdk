import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { TYText, Utils } from 'tuya-panel-kit';
import { LetterSearch } from '@tuya/tuya-panel-remote-sdk';

import data from './data';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;
const HEADERHEIGHT = cy(50);

class Index extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <LetterSearch
          header={
            <View style={[styles.header, { height: HEADERHEIGHT }]}>
              <TYText>1.header的高度需要和offset的数值一致</TYText>
              <TYText>2.initialNumToRender的数值尽量设置大于总数据量长度</TYText>
            </View>
          }
          offset={HEADERHEIGHT}
          sections={data}
          animated
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    paddingHorizontal: cx(20),
  },
});

export default Index;
