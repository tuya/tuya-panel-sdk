import React, { useRef, useEffect, FC } from 'react';
import { View, Text, StyleSheet, Animated, StyleProp, ViewStyle, TextStyle } from 'react-native';
import { StepperProps, SwitchButton, SwitchButtonProps } from 'tuya-panel-kit';
import { cx } from '../../utils';
import { MultiSlider, Stepper } from '../../components';
import { MultiSliderProps } from '../../components/MultiSlider';

interface IAlarmCloudProps {
  title: string;
  minTitle?: string;
  maxTitle?: string;
  showStepComp?: boolean;
  stepMixProps?: StepperProps;
  stepMaxProps?: StepperProps;
  titleStyle?: StyleProp<TextStyle>;
  switchButtonProps?: SwitchButtonProps;
  multiSliderProps?: MultiSliderProps;
  topStyle?: StyleProp<ViewStyle>;
  bottomStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}

const AlarmCloud: FC<IAlarmCloudProps> = props => {
  const {
    title = '湿度告警',
    switchButtonProps,
    multiSliderProps,
    style,
    topStyle,
    bottomStyle,
    titleStyle,
    showStepComp,
    stepMaxProps,
    stepMixProps,
    minTitle = '最小值',
    maxTitle = '最大值',
  } = props;

  const fadeAnim1 = useRef(new Animated.Value(1)).current;

  const fadeOpacity1 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (switchButtonProps?.value) {
      Animated.timing(fadeAnim1, {
        toValue: 1000,
        duration: 1000,
        useNativeDriver: false,
      }).start();
      Animated.timing(fadeOpacity1, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    } else {
      fadeAnim1.setValue(1);
      fadeOpacity1.setValue(0);
    }
  }, [switchButtonProps?.value]);

  return (
    <View style={[styles.container, style]}>
      <View style={[topStyle, styles.top]}>
        <Text style={titleStyle} numberOfLines={1}>
          {title}
        </Text>
        <SwitchButton {...switchButtonProps!} />
      </View>
      <Animated.View
        style={[
          styles.bottom,
          {
            maxHeight: fadeAnim1,
            opacity: fadeOpacity1,
          },
          bottomStyle,
        ]}
      >
        {switchButtonProps?.value ? (
          <>
            <MultiSlider
              min={0}
              max={100}
              step={1}
              enableLabel
              enabledTwo
              snapped={false}
              labelTextColor="#000000"
              markerOffsetY={2}
              sliderLength={cx(303)}
              values={[0, 100]}
              {...multiSliderProps}
            />
            {showStepComp ? (
              <>
                <View style={styles.stepComp}>
                  <View>
                    <Text style={styles.minTitle}>{minTitle}</Text>
                    <Stepper
                      min={0}
                      max={100}
                      ellipseIconColor="#7F7F7F"
                      placeholderTextColor="#FFFFFF"
                      value={20}
                      stepValue={1}
                      editable={false}
                      {...stepMixProps}
                    />
                  </View>
                  <View>
                    <Text style={styles.maxTitle}>{maxTitle}</Text>
                    <Stepper
                      min={0}
                      max={100}
                      ellipseIconColor="#7F7F7F"
                      placeholderTextColor="#FFFFFF"
                      value={20}
                      stepValue={1}
                      editable={false}
                      {...stepMaxProps}
                    />
                  </View>
                </View>
              </>
            ) : null}
          </>
        ) : null}
      </Animated.View>
    </View>
  );
};

AlarmCloud.defaultProps = {
  switchButtonProps: {
    value: false,
    onValueChange: () => undefined,
  },
  multiSliderProps: {
    min: 0,
    max: 100,
    step: 1,
    enabledTwo: true,
    enableLabel: true,
    snapped: false,
    labelTextColor: '#000000',
    markerOffsetY: 2,
    sliderLength: cx(303),
    values: [0, 100],
  },
};

const styles = StyleSheet.create({
  bottom: {
    flexDirection: 'column',
    marginTop: 18,
  },
  container: {
    backgroundColor: '#ffffff',
  },
  maxTitle: {
    color: '#ffffff',
    marginBottom: 5,
  },
  minTitle: {
    color: '#ffffff',
    marginBottom: 5,
  },
  stepComp: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  top: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default AlarmCloud;
