import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import Styles from './style';
import { TYIpcLayoutAutoProps } from './interface';

const TYIpcLayoutAuto: React.FC<TYIpcLayoutAutoProps> & {
  defaultProps: Partial<TYIpcLayoutAutoProps>;
} = props => {
  const [scrollHeight, setScrollHeight] = useState(0);
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const { containerStyle, mainContentStyle, containerHeight, scrollProps, children } = props;

  useEffect(() => {
    const isScrollEnabled = containerHeight < scrollHeight;
    setScrollEnabled(isScrollEnabled);
  }, [containerHeight, scrollHeight]);

  const _onLayout = (e: any) => {
    const { height } = e.nativeEvent.layout;
    setScrollHeight(height);
  };

  return (
    <ScrollView
      scrollEnabled={scrollEnabled}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      contentContainerStyle={[
        scrollEnabled ? Styles.layoutAutoScrollPage : Styles.layoutAutoNormalPage,
        containerStyle,
      ]}
      {...scrollProps}
    >
      <View onLayout={e => _onLayout(e)} style={[Styles.mainContentStyle, mainContentStyle]}>
        {children}
      </View>
    </ScrollView>
  );
};

TYIpcLayoutAuto.defaultProps = {
  containerHeight: 100,
  containerStyle: { backgroundColor: '#eeeeee' },
  mainContentStyle: {},
  scrollProps: {},
  children: null,
};

export default TYIpcLayoutAuto;
