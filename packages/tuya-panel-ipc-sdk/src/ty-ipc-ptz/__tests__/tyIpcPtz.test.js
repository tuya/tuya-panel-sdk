import React from 'react';
import { shallow } from 'enzyme';
import TYIpcPtz from '../index';

describe('TYIpcPtz components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <TYIpcPtz
        themeType="light"
        pieWidth={100}
        pieHeight={100}
        pieNumber={4}
        disabled={false}
        rotateDegree={'45deg'}
        containerStyle={{ position: 'absolute', top: 50 }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('color render', () => {
    const wrapper = shallow(<TYIpcPtz panelItemActiveColor={'red'} />);
    expect(wrapper).toMatchSnapshot();
  });
});
