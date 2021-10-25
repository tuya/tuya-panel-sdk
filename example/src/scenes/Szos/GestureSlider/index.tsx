import React, { PureComponent } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { GestureSlider as GestureSliderView } from '@tuya/tuya-panel-szos-sdk';
import { TYText } from 'tuya-panel-kit';
interface Props {}
interface State {
  step: number;
}
export default class GestureSlider extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      step: 15,
    };
  }
  onScaleChange = ({ step }: any) => {
    this.setState({ step });
  };
  render() {
    const { step } = this.state;
    return (
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
        <TYText style={styles.text} text={'手势刻度'}></TYText>
        <TYText style={[styles.dataText]} text={`${step}`} />

        <GestureSliderView
          onChange={this.onScaleChange}
          minValue={1}
          maxValue={105}
          defaultValue={step}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    alignSelf: 'flex-start',
    padding: 10,
  },
  dataText: {
    color: 'rgba(111,112,240,0.9)',
    fontSize: 30,
    marginRight: 4,
    lineHeight: 36,
  },
});
