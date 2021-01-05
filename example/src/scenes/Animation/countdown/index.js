import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { CountDown } from '@tuya-smart/tuya-panel-animation-sdk';

export default class CountDownAnimatedScene extends PureComponent {
  constructor(props) {
    super(props);
    /* eslint-disable react/no-unused-state */
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
          // duration={400}
          // style={{
          //   backgroundColor: '#000',
          //   width: 120,
          //   height: 120,
          //   paddingTop: 40,
          //   paddingBottom: 40,
          // }}
          // activeBgColor="#000"
          // color="blue"
          // size={{ width: 30, height: 30 }}
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
