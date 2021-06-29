/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

export const StyledMain = styled.View<any>`
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const StyledOut = styled.View<any>`
  border-radius: ${(props: any) => props.radius}px;
  height: ${(props: any) => props.radius * 2}px;
  width: ${(props: any) => props.radius * 2}px;
  background-color: ${(props: any) => props.outBgColor};
  justify-content: center;
  align-items: center;
  margin: ${cx(5)}px;
`;
const renderIn: any = (props: any) => ({
  borderRadius: `${props.radius - props.padding}px`,
  height: `${(props.radius - props.padding) * 2}px`,
  width: `${(props.radius - props.padding) * 2}px`,
  overflow: 'hidden',
  // transform: 'rotate(45deg)',
  justifyContent: 'center',
  alignItems: 'center',
});
export const StyledIn = styled.View<any>(renderIn);

export const StyledSectorTouchableHighlight = styled.TouchableHighlight<any>`
  position: absolute;
  top: ${(props: any) => props.item.top}px;
  left: ${(props: any) => props.item.left}px;
  height: ${(props: any) => props.radius}px;
  width: ${(props: any) => props.radius}px;
  background-color: ${(props: any) =>
    props.status ? props.item.bgColor : props.item.disabledBgColor};
`;

export const StyledCenterTouchableHighlight = styled.TouchableHighlight<any>`
  position: absolute;
  justify-content: center;
  align-items: center;
  height: ${(props: any) => props.centerRadius * 2}px;
  width: ${(props: any) => props.centerRadius * 2}px;
  border-radius: ${(props: any) => props.centerRadius}px;
  background-color: ${(props: any) =>
    props.centerStatus ? props.centerBgColor : props.centerDisabledBgColor};
`;

export const StyledCenterView = styled.View<any>`
  position: absolute;
  justify-content: center;
  align-items: center;
  height: ${(props: any) => props.centerRadius * 2}px;
  width: ${(props: any) => props.centerRadius * 2}px;
  border-radius: ${(props: any) => props.centerRadius}px;
  background-color: #ffffff;
`;

export const StyledPoint = styled.View<any>`
  position: absolute;
  top: ${(props: any) => props.item.top}px;
  left: ${(props: any) => props.item.left}px;
  height: ${(props: any) => props.pointRadius * 2}px;
  width: ${(props: any) => props.pointRadius * 2}px;
  border-radius: ${(props: any) => props.pointRadius}px;
  background-color: ${(props: any) => props.pointColor};
  opacity: ${(props: any) => (props.status ? 1 : 0.5)};
`;

export const StyledInPosition = styled.View<any>`
  top: ${(props: any) => props.radius - props.padding}px;
  left: ${(props: any) => props.radius - props.padding}px;
  position: absolute;
`;

export const StyledOutPosition = styled.View<any>`
  top: ${(props: any) => props.radius}px;
  left: ${(props: any) => props.radius}px;
  position: absolute;
`;
