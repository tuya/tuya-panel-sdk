/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';

export const StyledMain = styled.View<any>`
  justify-content: center;
  align-items: center;
`;

const renderOut: any = (props: any) => ({
  height: `${props.height}px`,
  width: `${props.width}px`,
  borderRadius: `${props.radius}px`,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: `${props.outBgColor}`,
});
export const StyledOut = styled.View<any>(renderOut);

const renderIn: any = (props: any) => ({
  height: `${props.height - props.padding * 2}px`,
  width: `${props.width - props.padding * 2}px`,
  borderRadius: `${props.radius - props.padding}px`,
  backgroundColor: props.status ? props.bgColor : props.disabledBgColor,
  alignItems: 'center',
  justifyContent: 'center',
});
export const StyledIn = styled.TouchableHighlight<any>(renderIn);

const renderContent: any = () => ({
  height: '100%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'row',
});
export const StyledContent = styled.View<any>(renderContent);
