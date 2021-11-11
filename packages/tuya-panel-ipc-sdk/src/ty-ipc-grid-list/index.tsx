import { View, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import styles from './styles';
import GridListProps from './interface';

const { width: winWidth } = Dimensions.get('window');

const GridList: React.FunctionComponent<GridListProps> = props => {
  const {
    renderItem,
    data: dataSource,
    marginVerticalWidth,
    rowNumber,
    marginHorizontalWidth,
    isCover,
    containerHorizontalWidth,
    containerVerticalWidth,
    keyExtractor,
  } = props;

  const _renderItem = () => {
    // 计算按钮宽度
    const buttonWidth = +(
      (winWidth - marginHorizontalWidth * (rowNumber - 1) * 2 - containerHorizontalWidth * 2) /
      rowNumber
    ).toFixed(6);

    // 最后一行按钮数量!==rowNumber，且isCover===true，计算最后一行按钮宽
    let lastRowButtonWidth = 0;
    let lastRowButtonNum = 0;
    let coverButtonNum = 0;
    const buttonTotalNum = dataSource.length;
    if (isCover) {
      lastRowButtonNum = buttonTotalNum % rowNumber;
      if (lastRowButtonNum > 0) {
        coverButtonNum = buttonTotalNum - lastRowButtonNum;
        lastRowButtonWidth = +(
          (winWidth -
            marginHorizontalWidth * (lastRowButtonNum - 1) * 2 -
            containerHorizontalWidth * 2) /
          lastRowButtonNum
        ).toFixed(6);
      }
    }

    // 最后一行第一个元素下标
    const rowNum = Math.ceil(buttonTotalNum / rowNumber);
    const lastRowFirstItemIndex = (rowNum - 1) * rowNumber;

    return dataSource.map((item: any, index: number) => {
      const containerStyle = {
        width:
          lastRowButtonNum > 0
            ? index < coverButtonNum
              ? buttonWidth
              : lastRowButtonWidth
            : buttonWidth,
        // 第一列，marginLeft为0
        marginLeft: index % rowNumber === 0 ? 0 : marginHorizontalWidth,
        // 最后一列，marginRight为0
        marginRight:
          (index + 1) % rowNumber === 0 || index === dataSource.length - 1
            ? 0
            : marginHorizontalWidth,
        // 第一行，marginTop为0
        marginTop: index < rowNumber ? 0 : marginVerticalWidth,
        // 最后一行，marginBottom为0
        marginBottom: index < lastRowFirstItemIndex ? marginVerticalWidth : 0,
      };

      const buttonProp =
        typeof item === 'object' && item.prop && typeof item.prop === 'object' ? item.prop : {};

      return (
        <TouchableOpacity
          {...buttonProp}
          style={[styles.button, containerStyle]}
          key={keyExtractor(item, index)}
          onPress={() => props.onPress(item, index)}
          activeOpacity={0.6}
        >
          {renderItem({ item, index, buttonWidth })}
        </TouchableOpacity>
      );
    });
  };

  return (
    <View
      style={[
        styles.container,
        {
          width: winWidth,
          paddingLeft: containerHorizontalWidth,
          paddingRight: containerHorizontalWidth,
          paddingTop: containerVerticalWidth,
          paddingBottom: containerVerticalWidth,
        },
      ]}
    >
      {_renderItem()}
    </View>
  );
};

GridList.defaultProps = {
  marginHorizontalWidth: 5,
  marginVerticalWidth: 5,
  containerHorizontalWidth: 10,
  containerVerticalWidth: 10,
  rowNumber: 3,
  isCover: false,
  keyExtractor: (item, index) => `${Date.now()}${index}`,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onPress: () => {},
};

export default GridList;
