import React from 'react';
import { shallow } from 'enzyme';
import TurnPlate from '..';

describe('TurnPlate components', () => {
  it('basic render', () => {
    const wrapper = shallow(<TurnPlate onTurnPlateChange={() => {}} plateValue={0} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('dot render', () => {
    const component = shallow(
      <TurnPlate
        activeColor="#0ff"
        inactiveColor="#ffa"
        onTurnPlateChange={() => {}}
        max={50}
        min={0}
        plateValue={30}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it('disabled render', () => {
    const component = shallow(
      <TurnPlate
        activeColor="#0ff"
        inactiveColor="#ffa"
        onTurnPlateChange={() => {}}
        plateValue={50}
        disabled
      />
    );
    expect(component).toMatchSnapshot();
  });
});
