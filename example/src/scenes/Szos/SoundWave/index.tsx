import React, { PureComponent } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SoundWave as SoundWaveView } from '@tuya/tuya-panel-szos-sdk';
import { TYText } from 'tuya-panel-kit';

interface Props {}
interface State {
  data: number[];
  start: boolean;
  duration: number;
}
const Count = 66;
const initData = Array.from({ length: Count }, () => 0);
export default class SoundWave extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      start: false,
      duration: 1000,
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({
        data: initData.map(() => Math.random()),
        start: true,
      });
    }, this.state.duration);
  }

  render() {
    const { data, start, duration } = this.state;
    return (
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: 'center' }}>
        <TYText style={styles.text} text="不可控" />
        <SoundWaveView duration={duration / 2} />
        <TYText style={styles.text} text="可控" />

        <SoundWaveView start={start} data={data} barCount={Count} duration={duration / 1.8} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    alignSelf: 'flex-start',
    padding: 10,
  },
});
