import React from 'react';
import { Text, View } from 'react-native';
import { MultiSlider, Utils, WhiteSpace } from '@tuya/tuya-panel-sensing-sdk';

const { cx } = Utils;

const MultiSliderCom = () => {
  return (
    <View style={{ paddingLeft: cx(16), paddingRight: cx(16) }}>
      <WhiteSpace size="lg" />
      <View>
        <Text>双滑</Text>
        <WhiteSpace size="xl" />
        <MultiSlider
          allowOverlap
          enableLabel
          enabledTwo
          sliderLength={cx(303)}
          labelTextColor="red"
          min={0}
          max={100}
          step={0.1}
          values={[10, 50]}
          onValuesChangeFinish={() => undefined}
        />
      </View>

      <WhiteSpace size="xl" />
      <View>
        <Text>单滑</Text>
        <WhiteSpace size="xl" />
        <MultiSlider
          enableLabel
          enabledOne
          sliderLength={cx(303)}
          labelTextColor="green"
          min={0}
          max={100}
          step={0.01}
          values={[11]}
          onValuesChangeFinish={() => undefined}
        />
      </View>

      <WhiteSpace size="lg" />
      <View>
        <Text>自定义颜色</Text>
        <WhiteSpace size="xl" />
        <MultiSlider
          enableLabel
          enabledOne
          selectedStyle={{ backgroundColor: 'red' }}
          sliderLength={cx(303)}
          labelTextColor="green"
          markerStyle={{ backgroundColor: 'green', borderColor: 'green', shadowColor: 'green' }}
          min={0}
          max={100}
          step={0.01}
          values={[11]}
          onValuesChangeFinish={() => undefined}
        />
      </View>
    </View>
  );
};
export default MultiSliderCom;
