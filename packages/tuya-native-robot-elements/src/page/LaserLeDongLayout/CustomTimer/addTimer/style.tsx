import color from 'color';
import _get from 'lodash/get';
import * as React from 'react';
import { StyleSheet, Text } from 'react-native';
import styled from 'styled-components/native';
import {
  IconFont,
  TYText,
  TYFlatList,
  Utils,
  // TimerPicker as TimerPointPicker,
} from '@tuya-rn/tuya-native-components';
import {
  StyledContainer,
  StyledCell,
  StyledTitle,
  StyledSubTitle as StyledSubTitleBase,
  StyledDivider,
} from '../timer/style';
import { timer } from '../theme';
import { TimerPicker as TimerPointPicker } from '../components';
// import TimerRangePicker from '../../timer-picker';
import { ITheme } from './interface';

const { convertX: cx, width } = Utils.RatioUtils;
// const { ThemeConsumer } = Utils.ThemeUtils;

export { StyledContainer, StyledCell, StyledTitle, StyledDivider };

export const StyledSubTitle = styled(StyledSubTitleBase)`
  text-align: right;
  font-size: ${cx(15)}px;
`;

export const StyledIcon = (props: any) => {
  const { style, ...rest } = props;

  return (
    <IconFont
      style={[{ marginLeft: cx(8) }, style]}
      color={timer.subFontColor}
      useART={true}
      {...rest}
    />
  );
};

export const StyledRepeatContent = styled.View`
  background-color: #fff;
`;

export const StyledRepeatRow = styled.TouchableOpacity`
  height: ${cx(48)}px;
  border-bottom-width: ${StyleSheet.hairlineWidth};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-color: #ddd;
`;

export const StyledRepeatImage = styled.Image`
  position: absolute;
  right: ${cx(16)}px;
  tint-color: ${timer.repeatColor};
`;

export const StyledRepeatText = styled(Text)`
  font-size: ${cx(14)}px;
  color: ${(props: { color?: string }) => props.color || '#303030'};
`;

export const StyledRepeatCircleBorder = styled.ImageBackground.attrs({
  imageStyle: (props: { selected?: boolean; [key: string]: any }) => {
    const c = color(timer.subFontColor);
    c.values.alpha *= 0.5;
    const borderColor = c.rgbString();
    return { tintColor: props.selected ? 'transparent' : borderColor };
  },
})`
  width: ${cx(40)}px;
  height: ${cx(40)}px;
  align-items: center;
  justify-content: center;
`;

export const StyledRepeatCircle = styled.TouchableOpacity`
  width: ${cx(40)}px;
  height: ${cx(40)}px;
  align-items: center;
  justify-content: center;
  border-radius: ${cx(20)}px;
  background-color: ${(props: { selected?: boolean }) =>
    props.selected ? timer.repeatColor(props) : 'transparent'};
`;

export const StyledRepeatCircleText = styled(Text).attrs({
  numberOfLines: 1,
})<{ selected?: boolean }>`
  font-size: ${cx(12)}px;
  background-color: transparent;
  color: ${props => (props.selected ? '#fff' : timer.subFontColor(props))};
`;

export const StyledTimeZone = styled.View`
  background-color: ${timer.cellBg};
`;

export const StyledTimeZoneHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  background-color: ${timer.cellBg};
`;

export const StyledTimeZoneItem = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const StyledTimeZoneText = styled(Text)`
  font-size: 14px;
  color: ${(props: { secondary?: boolean }) =>
    props.secondary ? timer.subFontColor : timer.fontColor};
`;

export const StyledTimeZoneTitle = styled(Text)`
  font-weight: 500;
  font-size: 32px;
  color: ${timer.fontColor};
`;

export const StyledTimeZoneSymbol = styled.View`
  position: absolute;
  left: ${(width - cx(24)) / 2};
  width: ${cx(24)}px;
  height: 2;
  background-color: ${timer.subFontColor};
`;

export const StyledTimerPointPicker = (props: any) => {
  return <TimerPointPicker pickerFontColor={timer.fontColor} {...props} />;
};

export const StyledTimerRangePicker = (props: any) => {
  return null;
};

export const StyledNoticeItem = (props: any) => {
  <TYFlatList.SwitchItem
    styles={{
      container: { backgroundColor: timer.cellBg },
      title: { fontSize: cx(17), color: timer.fontColor },
    }}
    thumbTintColor={timer.thumbTintColor}
    onThumbTintColor={timer.onThumbTintColor}
    onTintColor={timer.onTintColor}
    tintColor={timer.tintColor}
    {...props}
  />;
};
