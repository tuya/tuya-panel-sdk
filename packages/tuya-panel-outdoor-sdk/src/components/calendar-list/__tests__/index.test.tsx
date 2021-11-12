/* eslint-disable jest/expect-expect */
/* eslint-disable no-console */
import React from 'react';
import { shallow } from 'enzyme';
import CalendarList from '../index';

describe('CalendarList components', () => {
  it('basic render', () => {
    <CalendarList
      futureTextStyle={{
        color: '#ccc',
      }}
      current="2021/08/30"
      onChange={e => {
        console.log(e);
      }}
      prev={5}
      next={5}
      lang="zh"
    />;
  });

  it('default value render', () => {
    const setup = (props = {}) => {
      return shallow(
        <CalendarList
          futureTextStyle={{
            color: '#ccc',
          }}
          current="2021/08/30"
          onChange={e => {
            console.log(e);
          }}
          prev={115}
          next={5}
          i18nData={{
            en: {
              TYOutdoor_title: 'Select Date',
            },
          }}
        />
      );
    };
    // expect(wrapper).toMatchSnapshot();
    const wrapper = setup();
    wrapper.instance();
    wrapper.instance().componentDidMount();
    wrapper.instance().scrollTo('2021/09/09');
    wrapper.instance().scrollTo('2121/09/09');
  });
});
