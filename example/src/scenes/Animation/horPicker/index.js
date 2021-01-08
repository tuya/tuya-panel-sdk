import React, { PureComponent } from 'react';
import { View } from 'react-native';
import _ from 'lodash';
import { HorPicker } from '@tuya-smart/tuya-panel-animation-sdk';
import { TYText } from 'tuya-panel-kit';

export default class HorPickerAnimatedScene extends PureComponent {
  state = {
    activeIndex: 2,
  };

  render() {
    return (
      <View>
        <HorPicker
          renderContent={_.times(20, i => (
            <View style={{ width: 100, height: 100, backgroundColor: 'red' }}>
              <TYText>{i}</TYText>
            </View>
          ))}
          label=""
          style={{ marginTop: 50 }}
          showTickMark={false}
          number={3}
          activeIndex={this.state.activeIndex}
          onValueChange={activeIndex => {
            this.setState({
              activeIndex,
            });
          }}
        />
        <HorPicker
          style={{ marginTop: 50 }}
          renderContent={_.times(20, i => (
            <View style={{ width: 170, height: 100, backgroundColor: 'red' }}>
              <TYText>{i}</TYText>
            </View>
          ))}
          label=""
          showTickMark={false}
          number={2}
          activeIndex={this.state.activeIndex}
          onValueChange={activeIndex => {
            this.setState({
              activeIndex,
            });
          }}
        />
        <HorPicker
          pickItemStyle={{ height: 100 }}
          style={{ marginTop: 50 }}
          showTickMark={true}
          activeIndex={this.state.activeIndex}
          onValueChange={activeIndex => {
            this.setState({
              activeIndex,
            });
          }}
        />
      </View>
    );
  }
}
