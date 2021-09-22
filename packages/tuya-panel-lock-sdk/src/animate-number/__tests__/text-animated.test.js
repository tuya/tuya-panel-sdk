import React from 'react';
import { shallow } from 'enzyme';
import { TextInputForAnimated } from '../text-animated';

describe('TextInputForAnimated components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <TextInputForAnimated
        style={{ color: '#F00' }}
        index={1}
        displayValues={[8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5]}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
