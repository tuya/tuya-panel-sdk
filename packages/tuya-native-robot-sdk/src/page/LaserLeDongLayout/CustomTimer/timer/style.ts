import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import styled, { css } from 'styled-components/native';
import { Utils, TYText, Divider } from '@tuya-rn/tuya-native-components';
import res from '../../../../res';
import { timer } from '../theme';

const DEFAULT_EMPTY_ICON = res.emptyTimer;

const { get } = Utils.CoreUtils;
const { isIphoneX, convertX: cx, convertY: cy } = Utils.RatioUtils;

export const Row = styled.View`
  flex-direction: row;
  align-items: ${(props: any) => props.alignItems || 'center'};
  justify-content: ${(props: any) => props.justifyContent || 'center'};
`;

export const Center = styled.View`
  align-items: center;
  justify-content: center;
`;

export const StyledContainer = styled.View`
  flex: 1;
  background-color: ${timer.boardBg};
`;

export const StyledTitle = styled(Text)`
  background-color: transparent;
  font-size: ${(props: { size?: number }) => props.size || `${cx(18)}`}px;
  color: ${timer.fontColor};
`;

export const StyledSubTitle = styled(Text)`
  font-size: ${(props: { size?: number }) => props.size || `${cx(12)}`}px;
  color: ${timer.subFontColor};
`;

export const StyledListWrapper = styled.View`
  flex: 1;
  justify-content: center;
  opacity: ${(props: { isDisabled: boolean }) => (props.isDisabled ? 0.5 : 1)};
`;

const tintColorStyle = css`
  tint-color: ${timer.subFontColor};
`;

export const StyledImage = styled.Image.attrs({
  source: props => get(props, 'theme.timer.emptyIcon', DEFAULT_EMPTY_ICON),
})`
  ${(props: { tintEmptyImage?: boolean }) => props.tintEmptyImage && tintColorStyle};
`;

export const StyledButton = styled(TouchableOpacity).attrs({ activeOpacity: 0.6 })`
  width: ${(props: { isEmpty: boolean }) => (props.isEmpty ? cx(124) : cx(351))}px;
  height: ${(props: { isEmpty: boolean }) => (props.isEmpty ? 36 : 48)}px;
  margin-top: ${(props: { isEmpty: boolean }) => (props.isEmpty ? 24 : 0)}px;
  margin-bottom: ${isIphoneX ? 42 : cy(12)}px;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: center;
  border-radius: 24px;
  border-width: ${StyleSheet.hairlineWidth};
  background-color: ${timer.btnBg};
  border-color: ${timer.btnBorder};
`;

export const StyledButtonText = styled(Text).attrs({ numberOfLines: 1 })`
  font-size: ${(props: { isEmpty: boolean }) => (props.isEmpty ? cx(14) : cx(16))}px;
  color: ${timer.btnFontColor};
`;

export const StyledCell = styled.View`
  padding: ${cx(10)}px ${cx(16)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  min-height: ${cx(48)}px;
  background-color: ${timer.cellBg};
`;

export const StyledDivider = styled.View`
  background-color: ${timer.cellLine};
  margin-left: ${cx(16)}px;
  width: ${StyleSheet.hairlineWidth};
  align-self: stretch;
`;
