import React, { FC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

export interface WhiteSpaceProps {
  style?: StyleProp<ViewStyle>;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number;
}

const SPACE_INFO = {
  v_spacing_xs: 2,
  v_spacing_sm: 4,
  v_spacing_md: 12,
  v_spacing_lg: 16,
  v_spacing_xl: 20,
};

const WhiteSpace: FC<WhiteSpaceProps> = props => {
  const { size, style } = props;
  return (
    <View
      style={[
        { height: typeof size === 'number' ? size : SPACE_INFO[`v_spacing_${size!}`] },
        style,
      ]}
    />
  );
};

WhiteSpace.defaultProps = {
  size: 'sm',
};

export default WhiteSpace;
