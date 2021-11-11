import React from 'react';
import { shallow } from 'enzyme';
import AppMusicCard from '../index';

describe('AppMusicCard components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <AppMusicCard
        theme={{
          isDarkTheme: true,
          themeColor: '#1082fe',
          background: '#222222',
          fontColor: '#fff',
        }}
        isColourExist
        isTempExist
      />
    );

    expect(wrapper).toMatchSnapshot();

    wrapper.setProps({
      isColourExist: true,
      isTempExist: true,
      dataSource: [],
    });
  });
});
