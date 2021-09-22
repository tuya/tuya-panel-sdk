import React from 'react';
import { shallow } from 'enzyme';
import TYIpcLoading from '../index';

describe('TYIpcLoading components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <TYIpcLoading
        showComplete={false}
        show
        itemNum={3}
        loadSpeed={300}
        completeColor="green"
        sequenceColor="green"
        dotSize={8}
        containerStyle={{ position: 'absolute', top: 50 }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
