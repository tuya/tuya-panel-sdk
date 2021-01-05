import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { Utils } from 'tuya-panel-kit';

export const { convertX: cx, convertY: cy, isIphoneX } = Utils.RatioUtils;
/**
 * Popup.picker
 */
export const StyledPickerContainer = styled(View)`
  overflow: hidden;
  width: 100%;
  background-color: transparent;
  padding-top: ${cx(20)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
`;

export const StyledPickerItemView = styled(TouchableOpacity)`
  justify-content: flex-start;
  align-items: center;
`;
