/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, TextInput } from 'react-native';
import { Curtain } from '@tuya/tuya-panel-electrician-sdk';

const AlarmListScene = () => (
  <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'grey' }}>
    <CurtainBase />
  </View>
);

class CurtainBase extends PureComponent {
  constructor(props) {
    super(props);

    this.curtainRef = null;

    this.state = {
      curtainType: 'roller',
      styleType: 'zoosemy',
      control: 'stop',
      value: 0,
    };
  }

  handleControlPress = control => {
    this.setState({ control });
  };

  render() {
    return (
      <View>
        <Curtain
          styleType={this.state.styleType}
          curtainType={this.state.curtainType}
          control={this.state.control}
          value={this.state.value}
          // 真实项目中请勿写死
          staticPrefix="https://images.tuyacn.com"
        />
        <View style={{ flexDirection: 'row' }}>
          {['open', 'stop', 'close'].map(st => (
            <TouchableOpacity
              key={st}
              style={{ margin: 8 }}
              onPress={() => this.handleControlPress(st)}
            >
              <Text>{st}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flexDirection: 'row' }}>
          {['roller', 'oneSide', 'trietex'].map(st => (
            <TouchableOpacity
              key={st}
              style={{ margin: 8 }}
              onPress={() => this.setState({ curtainType: st })}
            >
              <Text>{st}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={{ flexDirection: 'row' }}>
          {['flat', 'zoosemy'].map(st => (
            <TouchableOpacity
              key={st}
              style={{ margin: 8 }}
              onPress={() => this.setState({ styleType: st })}
            >
              <Text>{st}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View>
          <TextInput
            style={{ backgroundColor: '#fff' }}
            onEndEditing={v => this.setState({ value: Number(v.nativeEvent.text) })}
          />
        </View>
      </View>
    );
  }
}

export default AlarmListScene;
