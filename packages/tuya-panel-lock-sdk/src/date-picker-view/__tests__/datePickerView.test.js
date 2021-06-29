import React from 'react';
import { shallow } from 'enzyme';
import DatePickerView from '../index';
import DatePicker from '../datePicker';

describe('detePickerView components', () => {
  it('basic render', () => {
    const wrapper = shallow(
      <DatePickerView
        mode="date"
        startDate={new Date()}
        endDate={new Date()}
        onDateChange={jest.fn()}
      />
    );
    // expect(wrapper).toMatchSnapshot();
  });
  it('default value render', () => {
    const wrapper = shallow(
      <DatePickerView mode="datetime" startDate={''} endDate={''} onDateChange={jest.fn()} />
    );
    // expect(wrapper).toMatchSnapshot();
  });
  it('TouchableOpacity event', () => {
    const setup = (props = {}) => {
      return shallow(
        <DatePickerView mode="hour" startDate={''} endDate={''} onDateChange={jest.fn()} />
      );
    };
    let wrapper = setup();
    wrapper.instance().openModal(0);
    wrapper.instance().confirmModal();
    wrapper.instance().closeModal();
    wrapper.instance().formatDate();
    wrapper.instance().getDefaultValue();
    wrapper.instance().setDate(new Date());
    wrapper.instance().compareTwoDate(new Date(), new Date());
    wrapper.instance().componentWillReceiveProps({ startDate: new Date(), endDate: new Date() });
    wrapper.instance().openModal(1);
    wrapper.instance().confirmModal();
  });
  it('datePicker picker event', () => {
    const setup = (props = {}) => {
      return shallow(
        <DatePicker
          mode={'datetime'}
          date={new Date()}
          onDateChange={jest.fn()}
          minDate={new Date()}
          maxDate={new Date()}
        />
      );
    };
    let wrapper = setup();
    wrapper.instance().componentDidMount();
    wrapper.instance().componentWillReceiveProps({ date: new Date() });
    wrapper.instance().onValueChange(1, 1, 1);
    wrapper.instance().getNewDate(1, 1, 1);
    wrapper.instance().getDate();
    wrapper.instance().getTimeColsData(new Date());
    wrapper.instance().changeIndexAndCols(new Date(2022 - 11 - 11));
    wrapper.instance().getDateColsData();
    wrapper.instance().getIndexAndCols();
    wrapper.instance().compareDate(new Date(2020 - 11 - 11), new Date());
    wrapper.instance().setHours(new Date(), 1);
  });
  it('date picker event', () => {
    const setup = (props = {}) => {
      return shallow(
        <DatePicker
          mode={'date'}
          date={new Date()}
          onDateChange={jest.fn()}
          minDate={new Date(2020 - 11 - 11)}
          maxDate={new Date(2022 - 12 - 12)}
        />
      );
    };
    let wrapper = setup();
    wrapper.instance().componentDidMount();
    wrapper.instance().componentWillReceiveProps({ date: new Date() });
    wrapper.instance().onValueChange(1, 1, 1);
    wrapper.instance().getNewDate(1, 1, 1);
    wrapper.instance().getDate();
    wrapper.instance().getTimeColsData(new Date());
    wrapper.instance().changeIndexAndCols(new Date(2022 - 11 - 11));
    wrapper.instance().getDateColsData();
    wrapper.instance().getIndexAndCols();
    wrapper.instance().compareDate(new Date(2020 - 11 - 11), new Date());
    wrapper.instance().setHours(new Date(), 1);
  });
  it('date picker event', () => {
    const setup = (props = {}) => {
      return shallow(
        <DatePicker
          mode={'hour'}
          date={new Date()}
          onDateChange={jest.fn()}
          minDate={new Date()}
          maxDate={new Date()}
        />
      );
    };
    let wrapper = setup();
    wrapper.instance().componentDidMount();
    wrapper.instance().componentWillReceiveProps({ date: new Date() });
    wrapper.instance().onValueChange(1, 1, 1);
    wrapper.instance().getNewDate(1, 1, 1);
    wrapper.instance().getDate();
    wrapper.instance().getTimeColsData(new Date());
    wrapper.instance().changeIndexAndCols(new Date(2022 - 11 - 11));
    wrapper.instance().getDateColsData();
    wrapper.instance().getIndexAndCols();
    wrapper.instance().compareDate(new Date(2020 - 11 - 11), new Date());
    wrapper.instance().setHours(new Date(), 1);
  });
});
