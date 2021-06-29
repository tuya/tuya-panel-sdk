/* eslint-disable import/prefer-default-export */
import styled from 'styled-components/native';
import { Utils, TYText } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;

export const SectionTitle = styled(TYText)(() => ({
  backgroundColor: '#F0F0F0',
  paddingVertical: cx(10),
  paddingHorizontal: cx(10),
}));
