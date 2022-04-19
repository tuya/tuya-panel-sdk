import React from 'react';
import { View, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import Res from '../../../res/colorRecognitionIcon';
import { ColorRecognitionProps, ColorsDataType } from './interface';

const ColorRecognition: React.FC<ColorRecognitionProps> = props => {
  const {
    mainStyle,
    headerStyle,
    source,
    imageStyle,
    colorsData,
    text,
    textStyle,
    changeTypeDatas,
    activeKey,
    colorStyle,
    colorItemStyle,
    flatListProps,
    handlePress,
  } = props;

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity activeOpacity={0.5} onPress={() => handlePress(item.key)}>
        <View style={[styles.main, activeKey === item.key && styles.activeStyle]}>
          <TYText style={[styles.textStyle, activeKey === item.key && { color: '#0D84FF' }]}>
            {item.title}
          </TYText>
        </View>
      </TouchableOpacity>
    );
  };

  const renderColorItems = () => {
    return colorsData.map((item: ColorsDataType, index) => {
      return (
        <View
          style={[
            colorItemStyle,
            {
              backgroundColor: colorsData[index].color,
              left: colorsData[index].pos.left,
              bottom: colorsData[index].pos.bottom,
            },
          ]}
        />
      );
    });
  };

  return (
    <View style={mainStyle}>
      <View style={headerStyle}>
        <Image source={source} style={imageStyle} resizeMode="stretch" />
        <View style={colorStyle}>{renderColorItems()}</View>
      </View>

      <TYText style={textStyle}>{text}</TYText>

      <FlatList
        {...flatListProps}
        columnWrapperStyle={{
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          marginBottom: 12,
        }}
        scrollEnabled={false}
        data={changeTypeDatas}
        keyExtractor={(item, index) => `${index}`}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        extraData={activeKey}
      />
    </View>
  );
};
ColorRecognition.defaultProps = {
  mainStyle: {
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 16,
  },
  headerStyle: {
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'center',
    paddingHorizontal: 16,
    marginTop: 12,
    width: '100%',
    height: 180,
  },
  imageStyle: { width: '100%', height: 180 },
  colorsData: [
    { color: '#4779A1', pos: { left: 0, bottom: 0 } },
    { color: '#146293', pos: { left: 24, bottom: 0 } },
    { color: '#5F799F', pos: { left: 48, bottom: 0 } },
    { color: '#EBA495', pos: { left: 72, bottom: 0 } },
    { color: '#FDC89E', pos: { left: 96, bottom: 0 } },
  ],
  colorItemStyle: {
    position: 'absolute',
    height: 32,
    width: 32,
    borderRadius: 16,
    overflow: 'hidden',
  },
  colorStyle: {
    width: 128,
    height: 32,
    bottom: 12,
    left: 24,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  changeTypeDatas: [
    {
      key: 0,
      index: 0,
      value: 'Fall',
      title: 'Fall',
    },
    {
      key: 1,
      index: 1,
      value: 'Rainbow',
      title: 'Rainbow',
    },
    {
      key: 2,
      index: 2,
      value: 'Greedy snake',
      title: 'Greedy snake',
    },
    {
      key: 3,
      index: 3,
      value: 'Chase',
      title: 'Chase',
    },
    {
      key: 4,
      index: 4,
      value: 'Flying Apsaras',
      title: 'Flying Apsaras',
    },
    {
      key: 5,
      index: 5,
      value: 'Colored flag',
      title: 'Colored flag',
    },
    {
      key: 6,
      index: 6,
      value: 'Collision',
      title: 'Collision',
    },
    {
      key: 7,
      index: 7,
      value: 'Rebound',
      title: 'Rebound',
    },
    {
      key: 8,
      index: 8,
      value: 'Shine',
      title: 'Shine',
    },
    {
      key: 9,
      index: 9,
      value: 'Jump',
      title: 'Jump',
    },
    {
      key: 10,
      index: 10,
      value: 'Breathing',
      title: 'Breathing',
    },
    {
      key: 11,
      index: 11,
      value: 'Twinkle',
      title: 'Twinkle',
    },
  ],
  textStyle: { marginVertical: 16, marginLeft: 16 },
  text: '变化方式',
  activeKey: 0,
  activeItemStyle: { backgroundColor: 'transparent', borderColor: '#0D84FF', borderWidth: 2 },
  source: Res.colorRecognition,
};
const styles = StyleSheet.create({
  activeStyle: {
    backgroundColor: 'rgba(13,132,255,0.1)',
    borderColor: '#0D84FF',
  },
  main: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderColor: 'transparent',
    borderRadius: 16,
    borderWidth: 2,
    height: 46,
    justifyContent: 'center',
    overflow: 'hidden',
    width: 88,
  },
  textStyle: {
    borderRadius: 16,
    fontSize: 12,
    marginHorizontal: 8,
    textAlign: 'center',
  },
});
export default ColorRecognition;
