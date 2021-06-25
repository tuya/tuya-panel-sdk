import styled from 'styled-components/native';
import { Text, View, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';

const backgroundColor = '#fff';
const borderColor = '#f8f8f1';
export const StyledConfirmButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  flex: 1;
  padding: 12px 0;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  border-right-width: ${StyleSheet.hairlineWidth};
  border-right-color: ${borderColor};
  background-color: ${backgroundColor};
`;
export const StyledCancelButton = styled(TouchableOpacity).attrs({
  activeOpacity: 0.8,
})`
  flex: 1;
  padding: 12px 0;
  align-self: stretch;
  align-items: center;
  justify-content: center;
  border-right-width: ${StyleSheet.hairlineWidth};
  border-right-color: ${borderColor};
  background-color: ${backgroundColor};
`;
