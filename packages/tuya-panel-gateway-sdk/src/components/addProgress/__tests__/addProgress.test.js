import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'tuya-panel-kit';
import AddProgress from '../index';

const { convertX: cx } = Utils.RatioUtils;
const devIds = ['6ce7e65c92381a099dgufe', '6cd7817b7c5e06674a6hrg', '6c71a8158dcac1802e6oaj'];

describe('AddProgress components', () => {
  it('basic render', () => {
    const wrapper = shallow(<AddProgress devIds={devIds} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('change title text and style', () => {
    const wrapper = shallow(
      <AddProgress devIds={devIds} title="Adding deivce" titleStyle={{ color: 'yellow' }} />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('change prompt text and style', () => {
    const wrapper = shallow(
      <AddProgress
        devIds={devIds}
        prompt="During the process of adding, the device will no longer be used, please be patient."
        promptStyle={{ color: 'lightblue' }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('change progress text and style', () => {
    const wrapper = shallow(
      <AddProgress
        devIds={devIds}
        foreColor={{
          '0%': 'yellow',
          '100%': 'green',
        }}
        progressStyle={{ with: cx(100), height: cx(100) }}
        progressText="4 / 8"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('change is custom progress change', () => {
    const wrapper = shallow(
      <AddProgress isCustomProgressChange={true} customTotal={10} customProgress={4} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
