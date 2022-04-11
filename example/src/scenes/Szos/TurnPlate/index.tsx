import { TurnPlate } from '@tuya/tuya-panel-szos-sdk';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { TYText } from 'tuya-panel-kit';

export default class TurnPlateScene extends PureComponent {
  constructor(props: any) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  // 更新主动降噪值
  handleTurnPlateChange(value: number) {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 75,
          marginBottom: 94,
          flex: 1,
          padding: 20,
        }}
      >
        <TYText text={`当前value:${value}`} />
        <TurnPlate
          max={80}
          min={0}
          onTurnPlateChange={v => this.handleTurnPlateChange(v)}
          plateValue={Number(value)}
        />
      </View>
    );
  }
}
