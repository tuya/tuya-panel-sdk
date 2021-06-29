/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';
import { Utils, TYText } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

const renderOut: any = (props: any) => ({
  height: `${props.height}px`,
  width: `${props.width}px`,
  borderRadius: `${props.radius}px`,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: props.outBgColor,
});
export const StyledOut = styled.View<any>(renderOut);

const renderIn: any = (props: any) => ({
  height: `${props.height - props.padding * 2}px`,
  width: `${props.width - props.padding * 2}px`,
  borderRadius: `${props.radius - props.padding}px`,
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  flexDirection: props.type === 'vertical' ? 'column' : 'row',
  padding: 0,
});
export const StyledIn = styled.View<any>(renderIn);

const renderTip: any = () => ({
  position: 'absolute',
  textAlign: 'center',
  fontSize: cx(14),
  backgroundColor: 'transparent',
});
export const StyledTip = styled(TYText)<any>(renderTip);
