import * as React from 'react';
import { TouchableOpacity, View, ViewStyle, StyleProp, TextStyle } from 'react-native';
import { Icon, Utils, SwitchButton } from '@tuya-rn/tuya-native-components';
import { timer } from '../theme';
import { StyledTitle, StyledSubTitle, StyledCell, StyledDivider } from './style';

const { convertX: cx } = Utils.RatioUtils;

interface ITimerCellProps {
  theme?: any;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  valueStyle?: StyleProp<TextStyle>;
  timeStr: string;
  tagStr?: string;
  repeatStr?: string;
  switchValue?: boolean;
  bordered?: boolean;
  onLongPress?: (_?: any) => void;
  onPress: (_?: any) => void;
  switchChange: (value: boolean) => void;
  dpStr?: string;
  rightItem: 'switch' | 'arrow';
}

const TimerCell = (props: ITimerCellProps) => {
  const {
    accessibilityLabel,
    style,
    timeStr,
    tagStr,
    repeatStr,
    switchValue,
    onLongPress,
    onPress,
    dpStr,
    switchChange,
    rightItem,
    bordered,
  } = props;
  const titleStyle = [{ paddingBottom: 6 }, !switchValue && { opacity: 0.5 }];
  const subTitleStyle = [{ paddingBottom: 3 }, !switchValue && { opacity: 0.5 }];
  return (
    <StyledCell style={[{ paddingTop: cx(14) }, style]}>
      <TouchableOpacity
        style={{ flex: 1, justifyContent: 'center' }}
        accessibilityLabel={accessibilityLabel}
        activeOpacity={0.8}
        onLongPress={onLongPress}
        onPress={onPress}
      >
        <StyledTitle style={titleStyle}>{timeStr}</StyledTitle>
        {!!tagStr && (
          <StyledSubTitle style={subTitleStyle} numberOfLines={1}>
            {tagStr}
          </StyledSubTitle>
        )}
        {!!repeatStr && (
          <StyledSubTitle style={subTitleStyle} numberOfLines={1}>
            {repeatStr}
          </StyledSubTitle>
        )}
        {!!dpStr && <StyledSubTitle style={subTitleStyle}>{dpStr}</StyledSubTitle>}
      </TouchableOpacity>
      <View style={{ marginLeft: cx(16) }}>
        {rightItem === 'switch' ? (
          <SwitchButton
            accessibilityLabel={`${accessibilityLabel}_Switch`}
            value={switchValue}
            onValueChange={value => switchChange(value)}
            thumbTintColor={timer.thumbTintColor}
            onThumbTintColor={timer.onThumbTintColor}
            onTintColor={timer.onTintColor}
            tintColor={timer.tintColor}
          />
        ) : (
          <Icon name="icon-dp_right" color={timer.subFontColor} size={18} />
        )}
      </View>
      {!!bordered && (
        <StyledDivider style={{ position: 'absolute', bottom: 0, left: 0, right: 0 }} />
      )}
    </StyledCell>
  );
};

export default TimerCell;
