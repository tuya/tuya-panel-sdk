import React from 'react';
import { shallow } from 'enzyme';
import TYIpcMusicControl from '../index';

describe('TYIpcMusicControl components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <TYIpcMusicControl
        themeColor="#000"
        ipcMusicControl="0"
        ipcMusicMode="0"
        containerStyle={{ position: 'absolute', top: 50 }}
        pressList={() => {}}
        pressControl={() => {}}
        pressMode={() => {}}
        pressPrev={() => {}}
        pressNext={() => {}}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('render', () => {
    const wrapper = shallow(
      <TYIpcMusicControl themeColor="#000" ipcMusicControl="0" ipcMusicMode="0" />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
