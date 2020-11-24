/* eslint-disable react/no-array-index-key */
// @ts-nocheck
import * as React from 'react';
import { Utils } from '@tuya-rn/tuya-native-components';

import res from '../../../../res';
import Strings from '../i18n';
import { Row } from '../timer/style';
import { StyledRepeatCircleBorder, StyledRepeatCircle, StyledRepeatCircleText } from './style';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;

interface IRepeatCircleProps {
  selected: string;
  onSelect: (selected?: string) => any;
}

class RepeatCircle extends React.Component<IRepeatCircleProps, any> {
  get weekData() {
    return Array(7)
      .fill(1)
      .map((_, index) => Strings.getLang(`day${index}`));
  }

  onRepeatPress = (index: number) => {
    const selected = this.props.selected.split('');
    selected[index] = selected[index] === '1' ? '0' : '1';
    const newSelected = selected.join('');
    this.props.onSelect(newSelected);
  };

  render() {
    const rowStyle = {
      marginTop: cy(34),
      marginBottom: cy(12),
      marginHorizontal: cx(24),
    };
    return (
      <Row style={rowStyle} justifyContent="space-between">
        {this.weekData.map((day, index) => {
          const selected = this.props.selected[index] === '1';
          return (
            <StyledRepeatCircleBorder
              key={index}
              accessibilityLabel={`Timer_RepeatCircle_${index}`}
              source={res.circle}
              selected={selected}
            >
              <StyledRepeatCircle
                selected={selected}
                activeOpacity={0.5}
                onPress={() => this.onRepeatPress(index)}
              >
                <StyledRepeatCircleText selected={selected}>{day}</StyledRepeatCircleText>
              </StyledRepeatCircle>
            </StyledRepeatCircleBorder>
          );
        })}
      </Row>
    );
  }
}

export default RepeatCircle;
