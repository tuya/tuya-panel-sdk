import React from 'react';
import { shallow } from 'enzyme';
import _ from 'lodash';
import { formatTime } from '../../../../utils';
import LabelPicker from '../LabelPicker';

describe('ColorDisk components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <LabelPicker
        label="M"
        list={_.times(60, v => formatTime(v))}
        defaultValue="1"
        value="60"
        onChange={() => {}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
