/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import RhythmsCircle from '../index';
import Icon from '../../../res/rhythmIcons';

const defaultData = [
  {
    color: '#CE8040',
    noActiveColor: '#fff',
    activeColor: '#F7EB2A',
    icon: Icon.icon1,
    index: 0,
    time: 390,
    valid: true,
  },
  {
    color: '#CE8040',
    noActiveColor: '#fff',
    activeColor: '#F7EB2A',
    icon: Icon.icon3,
    index: 2,
    time: 1020,
    valid: true,
  },
];

describe('RhythmsCircle components', () => {
  it('basic render', () => {
    const wrapper = mount(
      <RhythmsCircle
        data={defaultData}
        stepOverEnabled={false}
        disabled={false}
        size={100}
        ringWidth={200}
      />
    );
    const data = [
      {
        color: '#CE8040',
        noActiveColor: '#fff',
        activeColor: '#F7EB2A',
        icon: Icon.icon1,
        index: 0,
        time: 120,
        valid: true,
      },
    ];
    wrapper.instance.data = data;
    wrapper.unmount();
  });

  it('render touch', () => {
    const wrapper = shallow(<RhythmsCircle data={defaultData} disabled={false} />);

    const pander = wrapper.findWhere(
      node => node.name() === 'View' && !!node.prop('onMoveShouldSetResponder') === true
    );
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 326, locationY: 25 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderTerminationRequest');
    pander.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderMove', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });

    pander.simulate('responderTerminate');
    expect(wrapper).toMatchSnapshot();
  });
});
