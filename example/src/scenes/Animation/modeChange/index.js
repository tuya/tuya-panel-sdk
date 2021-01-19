import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ModeChange } from '@tuya-smart/tuya-panel-animation-sdk';

const imgUrlList = [
  'https://images.tuyacn.com/rms-static/3f5ccbb0-94bc-11ea-8e3b-e3ecba4013ec-1589334682603.png?tyName=speed1.png',
  'https://images.tuyacn.com/rms-static/3f750ea0-94bc-11ea-a593-57b2fa093611-1589334682762.png?tyName=speed2.png',
  'https://images.tuyacn.com/rms-static/3f773180-94bc-11ea-8e3b-e3ecba4013ec-1589334682776.png?tyName=speed3.png',
];
export default class ModeChangeAnimatedScene extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imgIndex: 0,
    };
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            this.setState({
              imgIndex: this.state.imgIndex === imgUrlList.length - 1 ? 0 : this.state.imgIndex + 1,
            });
          }}
        >
          <ModeChange.Scale
            imgUrl={imgUrlList[this.state.imgIndex]}
            imgStyle={{ tintColor: 'red', width: 30, height: 30 }}
          />
        </TouchableOpacity>
        <ModeChange.Move
          imgUrl={imgUrlList[this.state.imgIndex]}
          imgStyle={{ tintColor: 'red', width: 80, height: 80 }}
          onStartAnimted={() => {
            console.log('start');
          }}
          onEndAnimted={() => {
            console.log('end');
          }}
        />
      </View>
    );
  }
}
