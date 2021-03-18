import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import Setting from '../container';

describe('Nameditor components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <Setting
        themeColor="#812345"
        cloudFunData={[]}
        showSwitchLog={false}
        logId="log"
        settingDps={[]}
        textStyle={{ fontSize: 12 }}
        isStatusMultichannel={false}
        statusId="status"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
