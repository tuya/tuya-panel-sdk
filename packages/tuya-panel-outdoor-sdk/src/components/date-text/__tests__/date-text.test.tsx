import React from 'react';
import { TYText } from 'tuya-panel-kit';
import { shallow, mount } from 'enzyme';
import DateText from '../index';

describe('DateText components', () => {
  it('basic render 1', () => {
    const wrapper1 = shallow(<DateText time={4333} tail={false} format="max" />);
    expect(wrapper1).toMatchSnapshot();

    const wrapper2 = shallow(
      <DateText date={new Date('2021-09-09')} from="2021-09-07" space={false} />
    );
    expect(wrapper2).toMatchSnapshot();

    const wrapper3 = shallow(<DateText date={1632873600000} from="20a2c10c907" />);
    expect(wrapper3.find(TYText).exists()).toBe(true);
  });

  it('basic render 2', () => {
    const wrapper1 = shallow(<DateText time={0} tail={false} parseNow={false} />);
    const wrapper2 = shallow(<DateText time={0} tail={false} />);
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();

    const wrapper3 = shallow(
      <DateText
        time={13456}
        lang="zh"
        format="hms"
        i18nData={{
          zh: {
            TYOutdoor_after: '后',
          },
        }}
      />
    );
    expect(wrapper3).toMatchSnapshot();

    const wrapper4 = shallow(<DateText time={1234343545} tail={false} format="hasValue" />);
  });
});
