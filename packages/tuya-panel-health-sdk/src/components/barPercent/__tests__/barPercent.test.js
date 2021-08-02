import React from 'react';
import { shallow } from 'enzyme';
import BarPercent from '../index';
import { BarList, Item } from '../BarList';

describe('SleepBarPercent', () => {
  it('render SleepBarPercent Component', () => {
    const sleepDuration = [
      {
        type: 'Wake',
        value: 60,
      },
      {
        type: 'Light',
        value: 200,
      },
      {
        type: 'Deep',
        value: 400,
      },
      {
        type: 'REM',
        value: 100,
      },
    ];
    const wrapper = shallow(<BarPercent data={sleepDuration} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render BarPercent Component', () => {
    const data = [
      {
        type: 'Wake',
        percent: 1,
        color: '#656666',
      },
      {
        type: 'Light',
        percent: 2,
        color: '#222222',
      },
    ];
    const wrapper = shallow(
      <BarList
        dataSource={data}
        renderItem={(item, index) => {
          return <Item key={index} flexPercent={item.percent} backgroundColor={item.color} />;
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
