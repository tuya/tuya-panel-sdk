import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { BottomBarProps, DataType } from './interface';
import Res from '../../../res/bottomBarIcons';

const BottomBar: React.FC<BottomBarProps> = props => {
  const {
    contentStyle,
    data,
    touchStyle,
    imageStyle,
    activeMode,
    activeColor,
    color,
    handlePress,
  } = props;

  const renderItem = () => {
    return data
      .filter(item => item.isSupport)
      .map((item: DataType) => {
        if (item.renderContent) {
          return <>{item.renderContent}</>;
        }
        return (
          <TouchableOpacity key={item.key} style={touchStyle} onPress={() => handlePress(item)}>
            <Image
              source={item.source}
              style={[imageStyle, { tintColor: activeMode === item.key ? activeColor : color }]}
            />
          </TouchableOpacity>
        );
      });
  };

  return <View style={contentStyle}>{renderItem()}</View>;
};

BottomBar.defaultProps = {
  contentStyle: {
    flex: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 12,
  },
  touchStyle: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: 26,
    height: 26,
  },
  activeColor: '#FFF',
  color: 'rgba(255,255,255,0.3)',
  data: [
    { key: 'light', source: Res.light, isSupport: true },
    { key: 'scene', source: Res.scene, isSupport: true },
    { key: 'music', source: Res.music, isSupport: true },
    { key: 'plan', source: Res.plan, isSupport: true },
  ],
};
export default BottomBar;
