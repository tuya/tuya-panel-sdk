import React from 'react';
import { shallow } from 'enzyme';
import TurnPlate from '..';

describe('TurnPlate components', () => {
  it('basic render', () => {
    const wrapper = shallow(<TurnPlate handleChangeTurnPlate={() => {}} value={0} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('dot render', () => {
    const wrapper = shallow(
      <TurnPlate
        activeColor="#0ff"
        inactiveColor="#ffa"
        handleChangeTurnPlate={() => {}}
        value={50}
      />
    );
    const wrapperHandle = wrapper.children().at(1);

    expect(wrapper).toMatchSnapshot();
  });
});
