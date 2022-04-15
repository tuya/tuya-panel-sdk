import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TYListItem, SwitchButton, Utils } from 'tuya-panel-kit';
import TYListItemSeriesProps from './interface';

const { width } = Utils.RatioUtils;
const TYListItemSeries: React.FC<TYListItemSeriesProps> = ({
  themeColor,
  Action = '',
  title,
  subTitle,
  childTitle,
  childSubTitle,
  switchValue,
  arrow,
  arrowColor,
  disabled,
  styles,
  theme,
  childStyles,
  childTheme,
  Icon,
  childIcon,
  imageFollowIconColor,
  iconColor,
  iconSize,
  iconType,
  childImageFollowIconColor,
  childIconColor,
  childIconSize,
  childIActionType,
  childIconType,
  style,
  childStyle,
  children,
  switchValueChange,
  childValueChange,
}) => {
  return (
    <View style={[_style.container, style]}>
      <TYListItem
        theme={{
          fontColor: '#333333',
          subFontColor: '#999',
          descFontColor: 'red',
          cellBg: 'white',
          ...theme,
        }}
        styles={styles}
        disabled={disabled}
        title={title}
        Icon={Icon}
        subTitle={subTitle}
        imageFollowIconColor={imageFollowIconColor}
        iconColor={iconColor}
        iconSize={iconSize}
        iconType={iconType}
        Action={
          <SwitchButton
            value={switchValue}
            onTintColor={themeColor}
            onValueChange={switchValueChange}
          />
        }
      />
      {(React.isValidElement(children) && children) ||
        (switchValue && (
          <View style={[_style.container, childStyle]}>
            <TYListItem
              theme={{
                fontColor: '#333333',
                subFontColor: '#999',
                // descFontColor: 'red',
                cellBg: '#00000005',
                margin: [12, 12, 12, 12],
                cellRadius: 8,
                ...childTheme,
              }}
              arrowColor={arrowColor}
              arrow={arrow}
              Icon={childIcon}
              styles={{ title: { fontSize: 12 }, subTitle: { fontSize: 12 }, ...childStyles }}
              title={childTitle}
              subTitle={childSubTitle}
              imageFollowIconColor={childImageFollowIconColor}
              iconColor={childIconColor}
              iconSize={childIconSize}
              actionType={childIActionType}
              iconType={childIconType}
              Action={Action}
              onPress={childValueChange}
            />
          </View>
        ))}
    </View>
  );
};

const _style = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width,
  },
});

export default TYListItemSeries;
