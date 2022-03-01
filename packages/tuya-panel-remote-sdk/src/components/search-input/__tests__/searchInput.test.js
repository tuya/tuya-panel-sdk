import React from 'react';
import { shallow } from 'enzyme';
import SearchInput from '../index';

describe('SearchInput components', () => {
  it('basic render', () => {
    const wrapper = shallow(<SearchInput />);
    expect(wrapper).toMatchSnapshot();
  });
  it('custom render', () => {
    const wrapper = shallow(
      <SearchInput
        style={{ backgroundColor: 'yellow' }}
        inputStyle={{ backgroundColor: '#ccc' }}
        placeholderTextColor="red"
        allowClear
        showSearchIcon
        resetValue="Clear"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
