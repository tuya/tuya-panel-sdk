import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { JitterAlert } from '@tuya-smart/tuya-panel-animation-sdk';
import { Button, TYText } from 'tuya-panel-kit';

class JitterAlertAnimatedScene extends PureComponent {
  state = {
    active: true,
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button
          onPress={() => {
            this.setState(prevState => ({ active: !prevState.active }));
          }}
        >
          <TYText text={this.state.active ? '停止' : '开始'} />
        </Button>
        <JitterAlert
          active={this.state.active}
          onPress={() => {
            // 点击抖动图标回调
          }}
          size={148}
          // renderContent={<View style={{ width: 200, height: 200, backgroundColor: '#f0f' }} />}
        />
      </View>
    );
  }
}

export default JitterAlertAnimatedScene;
