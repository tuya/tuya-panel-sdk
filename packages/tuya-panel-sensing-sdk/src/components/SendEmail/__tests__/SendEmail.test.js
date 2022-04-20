/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow, mount } from 'enzyme';
import SendEmail from '../index';

global.document = document;
global.window = window;

const beforeExport = () => {
  console.log('导出前');
};

const exportCallback = email => {
  console.log('email', email);
};

describe('DpCacheText', () => {
  it('basic demo', () => {
    const wrapper = shallow(<SendEmail />);
    expect(wrapper).toMatchSnapshot();
  });

  it('press', () => {
    const wrapper = shallow(<SendEmail beforeExport={jest.fn()} />);

    const targetNode = wrapper.findWhere(node => node.name() === 'TouchableOpacity');
    targetNode.at(0).simulate('press');
    expect(wrapper).toMatchSnapshot();
  });

  it('callback', () => {
    const wrapper = shallow(<SendEmail exportCallback={jest.fn()} />);

    const targetNode = wrapper.findWhere(node => node.name() === 'TouchableOpacity');
    console.log('targetNode', targetNode);
    targetNode.at(0).simulate('press');
    expect(wrapper).toMatchSnapshot();
  });

  it('basic demo1', () => {
    const wrapper = shallow(
      <SendEmail
        errInfo={{
          emptyText: 'kkk',
          illegalText: 'ppp',
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
