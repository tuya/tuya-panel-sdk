import * as React from 'react';
import { TopBar, Utils } from '@tuya-rn/tuya-native-components';
import { timer } from '../theme';

// const { withTheme } = Utils.ThemeUtils;

const ThemedTopBar = (props: any) => {
  const { theme, ...rest } = props;
  // const propsWithTheme = { ...props, theme };
  return (
    <TopBar
      background={timer.titleBg}
      color={timer.titleFontColor}
      {...rest}
    />
  );
};

export default ThemedTopBar;
