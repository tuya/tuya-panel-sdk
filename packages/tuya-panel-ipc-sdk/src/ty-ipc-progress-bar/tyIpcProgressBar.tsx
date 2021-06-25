/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { View, Image } from 'react-native';
import { TYText, Slider } from 'tuya-panel-kit';
import Styles from './style';
import { TYIpcProgressBarProps } from './interface';
import publicConfig from '../publicConfig';
import { numberToPercent } from '../utils';

const { cx } = publicConfig;

const TYIpcProgressBar: React.FC<TYIpcProgressBarProps> & {
  defaultProps: Partial<TYIpcProgressBarProps>;
} =(props: TYIpcProgressBarProps) => {
  const {
    barData,
    sliderProperty,
    containerStyle,
    barContainStyle,
    iconTitleBoxStyle,
    iconTitleTextStyle,
    iconImageStyle,
    percentUnitBoxStyle,
    unitTextStyle,
    customUnitImageBoxStyle,
    customUnitImageStyle,
    noPrecentBoxStyle,
    noPrecentTextStyle,
    sliderStyle,
  } = props;

  const onValueChange = (value, dpCode) => {
    props.onValueChange && props.onValueChange(Math.round(value), dpCode);
  };
  const onSlidingComplete = (value, dpCode) => {
    props.onSlidingComplete && props.onSlidingComplete(Math.round(value), dpCode);
  };

  const getPercent = (value, min, max) => {
    return `${numberToPecent(value, min, max)}%`;
  };

  return (
    <View style={[Styles.progressBarPage, containerStyle ]}>
      <View style={[Styles.container, barContainStyle]}>
        {
          (barData.iconTitle || barData.iconImage) && !barData.noTitle &&
          (<View style={[Styles.iconTitle, iconTitleBoxStyle]}>
              {barData.iconTitle && (
              <TYText style={[{ fontSize: cx(12), color: barData.disabled ? '#aeaeae' : '#333' }, iconTitleTextStyle]}>
                  {barData.iconTitle}
                </TYText>
              )
              }
              {barData.iconImage && (
                 <Image
                 source={barData.iconImage}
                 style={[Styles.iconImage,  { tintColor: barData.disabled ? '#aeaeae' : undefined }, iconImageStyle ]}
               />
              )
              }
          </View>
         )
        }
        {
          !barData.iconTitle && !barData.iconImage && !barData.noTitle &&
          (<View style={[Styles.iconTitle, iconTitleBoxStyle]}>
                <TYText style={[{ fontSize: cx(12), color: barData.disabled ? '#aeaeae' : '#333'}, iconTitleTextStyle]}>
                  {barData.showPercentUnit ? `${barData.min}%` : `${barData.min}`}
                </TYText>
          </View>
         )
       }
        <Slider
          style={[Styles.slider, sliderStyle]}
          maximumValue={barData.max}
          minimumValue={barData.min}
          disabled={barData.disabled}
          maximumTrackTintColor={barData.disabled ? '#eee' : barData.maxColor}
          minimumTrackTintColor={barData.disabled ? '#eee' : barData.minColor}
          value={barData.value}
          onValueChange={value => onValueChange(value, barData.key)}
          onSlidingComplete={value => onSlidingComplete(value, barData.key)}
          {...sliderProperty}
        />
        {(barData.showPercentUnit || barData.customUnitText) && !barData.noUnit && (
          <View style={[Styles.percentBox,  percentUnitBoxStyle]}>
            <TYText
              numberOfLines={1}
              style={[Styles.percent, { color: barData.disabled ? '#aeaeae' : undefined }, unitTextStyle]}
            >
              {barData.customUnitText
                ? barData.customUnitText
                : numberToPecent(barData.value, barData.min, barData.max)}
            </TYText>
          </View>
        )}
         { barData.customUnitImage  && !barData.noUnit && (
          <View style={[Styles.rightImageBox, customUnitImageBoxStyle]}>
            <Image
              source={barData.customUnitImage}
              style={[
                Styles.iconImage,
                { tintColor: barData.disabled ? '#aeaeae' : undefined },
                customUnitImageStyle,
              ]}
            />
        </View>
        )}

        { !barData.customUnitImage && !barData.showPercentUnit && !barData.customUnitText && !barData.noUnit && (
          <View style={[Styles.noPercentBox, noPrecentBoxStyle]}>
            <TYText
              numberOfLines={1}
              style={
                [
                  Styles.percent,
                  { color: barData.disabled ? '#aeaeae' : '#333' },
                  noPrecentTextStyle,
                ]
              }
            >
              {barData.value}
             </TYText>
          </View>
        )}
      </View>
    </View>
  );
};

TYIpcProgressBar.defaultProps = {
  barData: {
    key: 'key1',
    max: 100,
    min: 0,
    value: 0,
    disabled: false,
    maxColor: '#eee',
    minColor: '#eee',
    showPercentUnit: false,
    iconTitle: undefined,
    iconImage: undefined,
    noTitle: false,
    noUnit: false,
    customUnitImage: undefined,
  },
  containerStyle: {},
  barContainStyle: {},
  iconTitleBoxStyle: {},
  iconTitleTextStyle: {},
  iconImageStyle: {},
  percentUnitBoxStyle: {},
  unitTextStyle: {},
  customUnitImageBoxStyle: {},
  customUnitImageStyle: {},
  noPrecentBoxStyle: {},
  noPrecentTextStyle: {},
  sliderStyle: {},
};

export default TYIpcProgressBar;
