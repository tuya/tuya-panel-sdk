import React from 'react';
import { shallow } from 'enzyme';
import { Utils, TYText } from 'tuya-panel-kit';
import TabsBar from '../index';
import Button from '../button';

const { convertX: cx } = Utils.RatioUtils;

describe('SingleTimePicker components', () => {
  it('basic render', () => {
    const props = {
      dataSource: [
        ...Array.from('4321').map(i => ({
          label: `${5 - +i}`,
          value: `TEST${5 - +i}`,
        })),
        {
          label: 0,
          value: 0,
          unSelectedIcon: <TYText size={cx(18)} text="0" />,
        },
      ],
    };
    const wrapper = shallow(<TabsBar {...props} />);

    const targetNode = wrapper.findWhere(node => {
      console.log("'node.name === 'Button'", node.name());
      return node.name() === 'Button' && !!node.prop('onItemPress') === true;
    });

    targetNode.at(0).props().onItemPress();
    targetNode.at(1).props().onItemPress();
    targetNode.at(2).props().onItemPress();
    targetNode.at(3).props().onItemPress();
    targetNode.at(4).props().onItemPress();

    expect(wrapper).toMatchSnapshot();
  });
  it('button render', () => {
    const wrapper = shallow(<Button label={0} style={{ flex: 1 }} isActive horizontal />);

    expect(wrapper).toMatchSnapshot();
  });
});
