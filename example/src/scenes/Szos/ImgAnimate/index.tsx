/*
 * @Author: your name
 * @Date: 2021-11-04 10:40:17
 * @LastEditTime: 2021-11-05 14:10:51
 * @LastEditors: 豆芽(douya.ye@tuya.com)
 * @Description: In User Settings Edit
 * @FilePath: /tuya-panel-sdk/example/src/scenes/Szos/ImgAnimate/index.tsx
 */
import React from 'react';
import { ScrollView, SafeAreaView, View, Text } from 'react-native';
import { ImageAnimate } from '@tuya/tuya-panel-szos-sdk/src/components';
import { huimd } from './res';

const Rotate = () => {
  return (
    <ScrollView>
      <SafeAreaView>
        <View style={{ padding: 20 }}>
          <Text>默认图片</Text>
          <ImageAnimate>
            <Text>加载中</Text>
          </ImageAnimate>
          <View style={{ marginTop: 20 }}>
            <Text>自定义图片</Text>
            <ImageAnimate source={huimd} style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text>加载中</Text>
            </ImageAnimate>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Rotate;
