import * as React from 'react';

import res from '../../../../res';

import Strings from '../i18n';
import { StyledRepeatContent, StyledRepeatRow, StyledRepeatText, StyledRepeatImage } from './style';
import { IRepeatProps } from './interface';

class Repeat extends React.Component<IRepeatProps, any> {
  constructor(props: IRepeatProps) {
    super(props);
    this.state = {
      selected: props.selected || '0000000',
    };
  }

  onRowPress = (index: number) => {
    const selected = this.state.selected.split('');
    selected[index] = selected[index] === '1' ? '0' : '1';
    const newSelected = selected.join('');
    this.setState({ selected: newSelected });
    this.props.onSelect && this.props.onSelect(newSelected);
  };

  render() {
    const { selected } = this.state;
    const weekData = Array(7)
      .fill(1)
      .map((_, index) => Strings.getLang(`day${index}`));
    return (
      <StyledRepeatContent>
        {weekData.map((day, index) => (
          <StyledRepeatRow
            key={index}
            accessibilityLabel={`Timer_Repeat_Week${index}`}
            activeOpacity={0.5}
            onPress={() => this.onRowPress(index)}
          >
            <StyledRepeatText>{day}</StyledRepeatText>
            {selected[index] === '1' && (
              <StyledRepeatImage source={res.selected} />
            )}
          </StyledRepeatRow>
        ))}
      </StyledRepeatContent>
    );
  }
}

export default Repeat;
