import React from 'react';
import { shallow } from 'enzyme';
import { View } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import LetterSearch from '../index';
import Res from './res';

const data = [
  {
    title: 'A',
    data: [
      { key: 'A-1', name: 'Apple', subName: 'apple' },
      { key: 'A-2', name: 'Actor', subName: 'actor' },
      { key: 'A-3', name: 'Arouse', subName: 'arouse' },
      { key: 'A-4', name: 'athlete', subName: 'athlete' },
    ],
  },
  {
    title: 'B',
    data: [
      { key: 'B-1', name: 'Baby', subName: 'baby' },
      { key: 'B-2', name: 'Back', subName: 'back' },
      { key: 'B-3', name: 'backer', subName: 'backer' },
      { key: 'B-4', name: 'Bad', subName: 'bad' },
    ],
  },
  {
    title: 'C',
    data: [
      { key: 'C-1', name: 'Candy', subName: 'candy' },
      { key: 'C-2', name: 'canvas', subName: 'canvas' },
      { key: 'C-3', name: 'Can', subName: 'can' },
      { key: 'C-4', name: 'cap', subName: 'cap' },
    ],
  },
  {
    title: 'D',
    data: [
      { key: 'D-1', name: 'Day', subName: 'day' },
      { key: 'D-2', name: 'dam', subName: 'dam' },
      { key: 'D-3', name: 'danger' },
      { key: 'D-4', name: 'Dark' },
    ],
  },
  {
    title: 'Z',
    data: [
      { key: 'Z-1', name: 'Zoom', subName: 'apple' },
      { key: 'Z-2', name: 'Zit' },
      { key: 'Z-3', name: 'zombie' },
      { key: 'Z-4', name: 'zone' },
    ],
  },
  {
    title: '#',
    data: [
      { key: '#-1', name: '12zss' },
      { key: '#-2', name: '火腿肠' },
      { key: '#-3', name: '？///' },
      { key: '#-4', name: '。77' },
    ],
  },
];

describe('LetterSearch components', () => {
  it('basic render', () => {
    const wrapper = shallow(<LetterSearch sections={data} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('custom render', () => {
    const wrapper = shallow(
      <LetterSearch
        header={
          <View style={{ height: 50, justifyContent: 'center', paddingHorizontal: 20 }}>
            <TYText>1.header的高度需要和offset的数值一致</TYText>
            <TYText>2.initialNumToRender的数值尽量设置大于总数据量长度</TYText>
          </View>
        }
        sections={data}
        offset={50}
        letterTopImage={Res.starIcon}
        sectionItemOpacity={0.8}
        itemHeight={30}
        letterMainStyle={{ top: 100 }}
        placeholderText="请输入品牌名称"
        reset="取消"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
