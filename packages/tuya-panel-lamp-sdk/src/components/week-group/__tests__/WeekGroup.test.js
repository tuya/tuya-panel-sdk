import React from 'react';
import { shallow } from 'enzyme';
import WeekGroup from '../WeekGroup';

describe('ColorDisk components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <WeekGroup
        background="#323131"
        activeColor="#1082FE"
        theme={{ fontColor: '#fff' }}
        defaultValue={[1, 0, 0, 1, 0, 0, 1]}
        value={[1, 1, 1, 1, 0, 1, 1]}
        onChange={() => {}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
