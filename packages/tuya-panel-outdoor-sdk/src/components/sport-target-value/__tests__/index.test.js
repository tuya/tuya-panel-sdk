import React from 'react';
import { shallow } from 'enzyme';
import SportTargetContent from '../index';

describe('sport-no-target components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <SportTargetContent
        step={100}
        targetIcon={' '}
        targetIconColor="blue"
        stepColor="blue"
        stepValue="步"
        stepOpacity={0.5}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
