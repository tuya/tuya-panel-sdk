/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { View, ScrollView, TouchableWithoutFeedback, Image } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import Styles from './style';
import Res from './res';
import { TYIpcGridProps } from './interface';

const TYIpcGrid: React.FC<TYIpcGridProps> & {
  defaultProps: Partial<TYIpcGridProps>;
} = (props: TYIpcGridProps) => {
  const [hoverMenu, setHoverMenu] = useState('none');

  const onPressIn = (key: string, itemData: any) => {
    setHoverMenu(key);
    props.onPressIn(key, itemData);
  };

  const onPressOut = (key: string, itemData: any) => {
    setHoverMenu('none');
    props.onPressOut(key, itemData);
  };

  const {
    rowNumber,
    data,
    containerStyle,
    borderWidth,
    borderColor,
    hoverBgcColor,
    gridTextStyle,
    scrollProps,
    scrollEnabled,
    gridPaddingVertical,
    gridMenuItemStyle,
    gridTextBoxStyle,
    gridImgStyle,
    activeColor,
  } = props;

  const getRealTintColor = (disabled: boolean | undefined, active: boolean | undefined) => {
    if (disabled && active) {
      return 'red';
    }
    if (disabled && !active) {
      return '#bdbdbd';
    }
    if (!disabled && active) {
      return activeColor;
    }
    return undefined;
  };
  const girdData = data.filter(value => !value.hidden);
  return (
    <ScrollView
      contentContainerStyle={[Styles.containerStyle, containerStyle]}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      scrollEnabled={scrollEnabled}
      {...scrollProps}
    >
      {girdData.map((item, index) => {
        const total = girdData.length;
        const realBorderWidth = ++index % rowNumber === 0 ? 0 : borderWidth;
        let lastStartIndex = 0;
        if (total % rowNumber !== 0) {
          lastStartIndex = total - (total % rowNumber);
        } else {
          lastStartIndex = total - rowNumber;
        }
        const gridWidth = `${Math.floor(100 / rowNumber)}%`;
        return (
          <TouchableWithoutFeedback
            key={item.key}
            onPress={() => {
              props.onPress(item.key, item);
            }}
            onPressIn={() => onPressIn(item.key, item)}
            onPressOut={() => onPressOut(item.key, item)}
            disabled={item.disabled}
          >
            <View
              style={[
                Styles.gridMenuItem,
                {
                  paddingVertical: gridPaddingVertical,
                  width: gridWidth,
                  borderRightWidth: realBorderWidth,
                  borderBottomWidth: index > lastStartIndex ? 0 : borderWidth,
                  borderColor,
                  backgroundColor: hoverMenu === item.key ? hoverBgcColor : 'transparent',
                },
                gridMenuItemStyle,
              ]}
            >
              {item.imgSource && (
                <Image
                  source={item.imgSource}
                  style={[
                    Styles.gridImg,
                    { tintColor: getRealTintColor(item.disabled, item.active) },
                    gridImgStyle,
                  ]}
                />
              )}
              {item.imgTitle && (
                <View
                  style={[
                    Styles.gridTextBox,
                    gridTextBoxStyle,
                    { opacity: item.disabled ? 0.2 : 1 },
                  ]}
                >
                  <TYText style={[Styles.gridText, gridTextStyle]}>{item.imgTitle}</TYText>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </ScrollView>
  );
};

TYIpcGrid.defaultProps = {
  data: [
    { key: 'key1', imgSource: Res.dpLullaby, imgTitle: 'grid1', disabled: true, hidden: false },
    { key: 'key2', imgSource: Res.dpLullaby, imgTitle: 'grid2', disabled: true, hidden: false },
  ],
  containerStyle: {},
  rowNumber: 4,
  borderWidth: 0.5,
  onPress: () => {},
  onPressIn: () => {},
  onPressOut: () => {},
  hoverBgcColor: '#e5e5e5',
  activeColor: '#fc2f07',
  borderColor: '#e1e1e1',
  gridTextStyle: {},
  scrollProps: {},
  scrollEnabled: true,
  gridPaddingVertical: Math.ceil(15),
  gridTextBoxStyle: {},
  gridMenuItemStyle: {},
  gridImgStyle: {},
};

export default TYIpcGrid;
