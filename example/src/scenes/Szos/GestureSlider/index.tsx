import React, { PureComponent } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { GestureSlider as GestureSliderView } from '@tuya/tuya-panel-szos-sdk';
import { TYText } from 'tuya-panel-kit';

interface Props {}
interface State {
  step1: number;
  step2: number;
}
export default class GestureSlider extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      step1: 15,
      step2: 15,
    };
  }

  onScaleChange1 = ({ step }: any) => {
    this.setState({ step1: step });
  };

  onScaleChange2 = ({ step }: any) => {
    this.setState({ step2: step });
  };

  render() {
    const { step1, step2 } = this.state;
    return (
      <ScrollView contentContainerStyle={{ paddingBottom: 30, alignItems: 'center' }}>
        <TYText style={styles.titleText} text="手势刻度" />
        <TYText style={styles.text} text="不可控" />
        <TYText style={styles.dataText} text={`${step1}`} />

        <GestureSliderView
          onChange={this.onScaleChange1}
          minValue={0}
          maxValue={105}
          defaultValue={step1}
        />
        <TYText style={styles.text} text="可控" />
        <TYText style={styles.dataText} text={`${step2}`} />

        <GestureSliderView
          onChange={this.onScaleChange2}
          minValue={0}
          maxValue={105}
          value={step2}
        />

        <TYText style={styles.text} text="自定义游标" />
        <TYText style={styles.dataText} text={`${step2}`} />

        <GestureSliderView
          onChange={this.onScaleChange2}
          minValue={0}
          maxValue={105}
          value={step2}
          customThumb={<View style={{ width: 2, height: 10, backgroundColor: 'red' }} />}
        />
        <TYText style={styles.text} text="自定义样式" />
        <TYText style={styles.dataText} text={`${step2}`} />

        <GestureSliderView
          onChange={this.onScaleChange2}
          minValue={0}
          maxValue={105}
          value={step2}
          scaleColor="red"
          scaleSpace={16}
          innerTrackStyle={{ padding: 10 }}
          scaleHeight={40}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  dataText: {
    color: 'rgba(111,112,240,0.9)',
    fontSize: 30,
    lineHeight: 36,
    marginRight: 4,
  },
  text: {
    alignSelf: 'flex-start',
    marginTop: 50,
    padding: 10,
  },
  titleText: {
    alignSelf: 'center',
    fontSize: 28,
    padding: 10,
  },
});
