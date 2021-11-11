import React from 'react';
import { shallow } from 'enzyme';
import CountdownPicker from '../CountdownPicker';

describe('ColorDisk components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <CountdownPicker
        innerRef={() => {}}
        hourLabel="H"
        minuteLabel="M"
        secondLabel="S"
        defaultValue={1}
        value={60}
        onChange={() => {}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
