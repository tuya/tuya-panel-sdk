import React from 'react';
import { shallow } from 'enzyme';
import LinkSelect from '../index';

describe('getPassword components', () => {
  it('click render', () => {
    const wrapper = shallow(
      <LinkSelect
        keyValue="2"
        type="click"
        title="clickTitle这个是个超级哦啊就哦啊煎熬煎熬煎熬煎熬的长的为宝宝宝宝宝宝"
        tip="clickTip"
        choiceValue=""
        onClick={jest.fn}
      ></LinkSelect>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('switchInfo render', () => {
    const wrapper = shallow(
      <LinkSelect
        keyValue="3"
        type="switchInfo"
        title="switchInfoTitle"
        tip="switchInfoTip"
        switchValue={true}
        info={jest.fn}
        onSwitch={jest.fn}
      ></LinkSelect>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('switch render', () => {
    const wrapper = shallow(
      <LinkSelect
        keyValue="4"
        type="switch"
        title="switch"
        switchValue={true}
        onSwitch={jest.fn}
      ></LinkSelect>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('switchInfo render', () => {
    const wrapper = shallow(
      <LinkSelect
        keyValue="6"
        type="switchInfo"
        title="switchInfoTitle"
        tip="switchInfoTip"
        switchValue={true}
        info={jest.fn}
        onSwitch={jest.fn}
      ></LinkSelect>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('customLinkList render', () => {
    const wrapper = shallow(
      <LinkSelect
        keyValue="5"
        type="switch"
        title="我是祖先"
        tip="当我为true时我的后代显示"
        switchValue={true}
        onSwitch={jest.fn}
        customLinkList={[
          {
            keyValue: '5_1',
            type: 'switch',
            title: '我是大儿子5_1',
            tip: '当我为true时我的孩子出现',
            switchValue: true,
            onSwitch: jest.fn,
            relation: ['switchValue', '===', 'true'],
          },
        ]}
      ></LinkSelect>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('customLinkList render', () => {
    const wrapper = shallow(
      <LinkSelect
        keyValue="5"
        type="switch"
        title="我是祖先"
        tip="当我为true时我的后代显示"
        switchValue={true}
        onSwitch={jest.fn}
        customLinkList={[
          {
            keyValue: '5_1',
            type: 'switch',
            title: '我是大儿子5_1',
            tip: '当我为true时我的孩子出现',
            switchValue: true,
            onSwitch: jest.fn,
            relation: ['switchValue', '===', 'true'],
          },
          {
            keyValue: '5_2',
            type: 'click',
            title: '我是二儿子5_2',
            tip: '当我的值为2时我的孩子出现',
            choiceValue: '222',
            choiceValueKey: '2',
            onClick: jest.fn,
            relation: ['switchValue', '===', 'true'],
            customLinkList: [
              {
                keyValue: '5_2_1',
                type: 'switch',
                title: '我是5_2的儿子5_2_1',
                tip: '我还小，也没有孩子',
                switchValue: false,
                onSwitch: jest.fn,
                relation: ['choiceValueKey', '===', '2'],
              },
            ],
          },
        ]}
      ></LinkSelect>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
