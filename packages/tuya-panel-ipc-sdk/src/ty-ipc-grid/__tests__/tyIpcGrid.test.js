import React from 'react';
import { shallow } from 'enzyme';
import TYIpcGrid from '../index';

const gridData = [
  {
    key: 'menu1',
    imgSource: 12,
    imgTitle: 'menu1',
    disabled: true,
    hidden: false,
    active: false,
  },
  {
    key: 'menu2',
    imgSource: 12,
    imgTitle: 'menu2',
    disabled: false,
    hidden: false,
    active: false,
  },
  {
    key: 'menu3',
    imgSource: 12,
    imgTitle: 'menu3',
    disabled: false,
    hidden: false,
    active: true,
  },
  {
    key: 'menu4',
    imgSource: 12,
    imgTitle: 'menu4',
    disabled: true,
    hidden: true,
    active: true,
  },
  {
    key: 'menu5',
    imgSource: 12,
    imgTitle: 'menu5',
    disabled: false,
    hidden: false,
    active: false,
  },
  {
    key: 'menu6',
    imgSource: 12,
    imgTitle: 'menu6',
    disabled: false,
    hidden: false,
    active: false,
  },
];

const gridDataRow = [
  {
    key: 'menu1',
    imgSource: 12,
    imgTitle: 'menu1',
    disabled: true,
    hidden: false,
    active: false,
  },
  {
    key: 'menu2',
    imgSource: 12,
    imgTitle: 'menu2',
    disabled: false,
    hidden: false,
    active: false,
  },
  {
    key: 'menu3',
    imgSource: 12,
    imgTitle: 'menu3',
    disabled: false,
    hidden: false,
    active: true,
  },
  {
    key: 'menu4',
    imgSource: 12,
    imgTitle: 'menu4',
    disabled: true,
    hidden: false,
    active: true,
  },
];

const gridHover = [
  {
    key: 'none',
    imgSource: 12,
    imgTitle: 'menu1',
    disabled: true,
    hidden: false,
    active: false,
  },
];
describe('IpcGrid components', () => {
  it('data is empty', () => {
    const wrapper = shallow(<TYIpcGrid />);
    expect(wrapper).toMatchSnapshot();
  });

  it('data is not empty', () => {
    const wrapper = shallow(<TYIpcGrid data={gridData} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('data length % rowNumber === 0', () => {
    const wrapper = shallow(<TYIpcGrid data={gridDataRow} rowNumber={4} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('onPress event', () => {
    const wrapper = shallow(<TYIpcGrid data={gridData} />);
    const targetNode = wrapper.findWhere(
      node => node.name() === 'TouchableWithoutFeedback' && !!node.prop('onPress') === true
    );
    targetNode.at(0).simulate('press');
    expect(wrapper).toMatchSnapshot();
  });
  it('onPressIn event', () => {
    const onPressInFunc = jest.fn();
    const wrapper = shallow(<TYIpcGrid data={gridData} onPressIn={onPressInFunc} />);
    // const targetNode = wrapper.findWhere(
    //   node => node.name() === 'TouchableWithoutFeedback' && !!node.prop('onPressOut') === true
    // );
    // console.dir(targetNode, 'targetNode');
    // targetNode.at(0).simulate('pressIn');
    // wrapper.find('TYIpcGrid').prop('onPressIn');
    expect(wrapper).toMatchSnapshot();
  });
  it('onPressOut event', () => {
    const wrapper = shallow(<TYIpcGrid data={gridData} />);
    // const targetNode = wrapper.findWhere(
    //   node => node.name() === 'TouchableWithoutFeedback' && !!node.prop('onPressOut') === true
    // );
    // targetNode.at(0).simulate('pressOut');
    expect(wrapper).toMatchSnapshot();
  });

  it('hover equal key', () => {
    const wrapper = shallow(<TYIpcGrid data={gridHover} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('change hover key', () => {
    const wrapper = shallow(<TYIpcGrid data={gridHover} />);
    // wrapper.setState({ hoverKey: 'menu1' });
    expect(wrapper).toMatchSnapshot();
  });
});
