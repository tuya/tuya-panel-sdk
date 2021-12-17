import React from 'react';
import { shallow } from 'enzyme';
import MusicDrawer from '../index';
import res from '../../../../res/index';

const videoListData = ['multi', 'single'];
const DrawerData1 = videoListData.map((item, index) => ({
  id: item,
  title: `模式${index}`,
  rightIconSource: {
    normalIcon: res.startIconLight,
  },
}));
const DrawerData2 = videoListData.map((item, index) => ({
  id: item,
  title: `title${index}`,
  subTitle: `subTitle${index}`,
  rightIconSource: {
    startIcon: res.startIconLight,
    stopIcon: res.stopIconLight,
  },
  leftIconSource: res.mode1,
}));
describe('MusicBar components', () => {
  it('basic render no active', () => {
    const wrapper = shallow(
      <MusicDrawer value={DrawerData1} activeIndex={-1} activeHeight={306} height={102} />
    );

    expect(wrapper).toMatchSnapshot();
  });
  it('basic render with active item', () => {
    const wrapper = shallow(
      <MusicDrawer
        styles={{
          contentStyle: { backgroundColor: 'pink' },
          titleStyle: { fontSize: 16 },
          subTitleStyle: { fontSize: 12 },
          containerStyle: { width: 420 },
          leftIconBoxStyle: { backgroundColor: 'red' },
          rightIconBoxStyle: { backgroundColor: 'green' },
        }}
        value={DrawerData2}
        activeIndex={0}
        activeHeight={200}
        height={80}
      />
    );

    expect(wrapper).toMatchSnapshot();
  });
});
