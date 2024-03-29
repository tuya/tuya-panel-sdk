import styled from 'styled-components/native';
import { Utils, TYText } from 'tuya-panel-kit';
import { View } from 'react-native';

const { convertX: cx } = Utils.RatioUtils;

export const SectionTitle = styled(TYText)(() => ({
  backgroundColor: '#F0F0F0',
  paddingVertical: cx(10),
  paddingHorizontal: cx(10),
  marginVertical: cx(10),
}));

export const SectionMain = styled(View)(() => ({
  flexDirection: 'row',
  justifyContent: 'space-around',
}));
