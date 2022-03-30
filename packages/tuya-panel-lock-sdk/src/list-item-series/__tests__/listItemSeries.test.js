/**
 * @jest-environment jsdom
 */
import React from 'react';
import { shallow } from 'enzyme';
import TYListItemSeries from '../index';

jest.mock('tuya-panel-kit', () => {
  const realComponents = jest.requireActual('tuya-panel-kit');
  return {
    ...realComponents,
    SwitchButton: ({ children }) => <>{children}</>,
  };
});

describe('TYListItemSeries component', () => {
  it('base render', () => {
    const setup = (props = {}) => {
      return shallow(
        <TYListItemSeries
          title="测试"
          subTitle="测试门锁联动组件"
          childTitle="子组件"
          childSubTitle="子组件测试联动"
          switchValue
          switchValueChange={jest.fn()}
          childValueChange={jest.fn()}
          Action="test"
        />
      );
    };
    const component = setup();
    expect(component).toMatchSnapshot();
  });
});
