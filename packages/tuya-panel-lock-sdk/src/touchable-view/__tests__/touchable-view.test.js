import React from 'react';
import { shallow } from 'enzyme';
import TouchableView from '../index';

describe('touchable view', () => {
  it('basic render', () => {
    const wrapper = shallow(<TouchableView />);
    wrapper.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });

    wrapper.simulate('responderGrant', {
      nativeEvent: { touches: [], pageX: 10, pageY: 20 },
      touchHistory: { touchBank: [] },
    });

    wrapper.simulate(
      'responderMove',
      {
        nativeEvent: { touches: [] },
        touchHistory: { touchBank: [] },
      },
      { dx: 100 }
    );

    wrapper.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });

    wrapper.simulate('responderEnd', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
