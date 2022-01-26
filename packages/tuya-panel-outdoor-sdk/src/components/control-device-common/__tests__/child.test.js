/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'tuya-panel-kit';
import Child from '../child';

const { convertX: cx } = Utils.RatioUtils;

describe('child components', () => {
  it('child render', () => {
    const wrapper = shallow(
      <Child
        icon=""
        color="red"
        size={cx(24)}
        iconStyle={{
          width: cx(50),
          height: cx(50),
          borderRadius: cx(50),
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
