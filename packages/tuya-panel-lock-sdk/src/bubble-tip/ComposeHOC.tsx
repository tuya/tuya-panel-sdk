import React, { useMemo } from 'react';
import { View, Image } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import Style from './Style';
import { IComposeHOC, EBubbleTipeConfigType } from './interface';
import { ICON_TYPE } from './constant';

/**
 * @desc 判断props里的children 或者 configList，进行提前处理传给子元素，子元素内不包含configList
 * @param param props 需要拆出来进行处理的数据流
 * @param Element 要渲染的子组件
 * @returns 将处理的数据注入到子组件
 */
const ComposeHOC: React.FC<IComposeHOC> = (
  { children, configList, showIcon = true, ...props },
  Element
) => {
  const renderList = useMemo(() => {
    if (configList) {
      return configList.map(
        ({
          type = EBubbleTipeConfigType.safe,
          key,
          text,
          icon,
          wrapStyle,
          textStyle,
          iconStyle,
        }) => {
          return (
            <View key={key} style={[Style.message_wrap, Style[type], wrapStyle]}>
              {showIcon && (
                <Image source={icon || ICON_TYPE[type]} style={[Style.icon, iconStyle]} />
              )}
              <TYText text={text} style={[Style.text, textStyle]} numberOfLines={1} />
            </View>
          );
        }
      );
    }
    return children;
  }, [children, configList]);
  return <Element {...props}>{renderList}</Element>;
};

export default ComposeHOC;
