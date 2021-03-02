import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { Drawer } from '@tuya/tuya-panel-animation-sdk';

const { winWidth, winHeight } = Utils.RatioUtils;
const imgUrlList = [
  'https://images.tuyacn.com/rms-static/3f5ccbb0-94bc-11ea-8e3b-e3ecba4013ec-1589334682603.png?tyName=speed1.png',
];
export default class DrawerAnimatedScene extends PureComponent {
  state = {
    visible: false,
    placement: 'left',
  };

  render() {
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}
      >
        {['left', 'right', 'top', 'bottom'].map(item => (
          <TouchableOpacity
            key={item}
            onPress={() => {
              this.setState({ visible: true, placement: item });
            }}
          >
            <View
              style={{
                width: 60,
                height: 60,
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 16,
              }}
            >
              <Text>点击打开{item}抽屉</Text>
            </View>
          </TouchableOpacity>
        ))}
        <Drawer
          width={['left', 'right'].includes(this.state.placement) ? winWidth / 3 : winWidth}
          height={['left', 'right'].includes(this.state.placement) ? winHeight : winHeight / 3}
          placement={this.state.placement}
          visible={this.state.visible}
          onClose={() => {
            this.setState({ visible: false });
          }}
          onStateChange={state => {
            console.log(state);
          }}
          renderContent={
            <View
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'red',
              }}
            >
              {imgUrlList.map(item => (
                <View
                  style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                  key={item}
                >
                  <Image source={{ uri: item }} style={{ width: 100, height: 100 }} />
                </View>
              ))}
            </View>
          }
        />
      </View>
    );
  }
}
