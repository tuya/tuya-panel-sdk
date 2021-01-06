import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { CountDown } from '@tuya-smart/tuya-panel-animation-sdk';

export default class CountDownAnimatedScene extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      countdownLeft: 0,
      countDownShow: false,
    };
  }

  render() {
    const { countdownLeft, countDownShow } = this.state;
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <CountDown
          countDownShow={countDownShow}
          countdownLeft={countdownLeft}
          startCountdown={() => {
            this.setState({ countDownShow: true, countdownLeft: 300 });
          }}
          endCountdown={() => {
            this.setState({ countDownShow: false, countdownLeft: 0 });
          }}
        />
      </View>
    );
  }
}
