/* eslint-disable jest/expect-expect */
import React from 'react';
import { shallow } from 'enzyme';
import DatePickerRange from '../index';
import DatePicker from '../datePicker';

describe('detePickerView components', () => {
  it('basic render', () => {
    shallow(
      <DatePickerRange
        mode="date"
        startDate={new Date()}
        endDate={new Date()}
        onDateChange={jest.fn()}
      />
    );
    // expect(wrapper).toMatchSnapshot();
  });
  it('default value render', () => {
    const setup = (props = {}) => {
      return shallow(
        <DatePickerRange mode="datetime" startDate={''} endDate={''} onDateChange={jest.fn()} />
      );
    };
    // expect(wrapper).toMatchSnapshot();
    let wrapper = setup();
    wrapper.instance().openModal(1);
    wrapper.instance().confirmModal();
    wrapper.instance().openModal(0);
    wrapper.instance().confirmModal();
    wrapper.instance().formatDate(new Date());
    wrapper.instance().setDate(new Date());
    wrapper.instance().componentWillReceiveProps({ startDate: new Date(), endDate: new Date() });
    wrapper.instance().openModal(1);
    wrapper.instance().confirmModal();
    wrapper.instance().setDate(new Date('2019-10-11'));
    wrapper.instance().openModal(0);
    wrapper.instance().confirmModal();
  });
  it('TouchableOpacity event', () => {
    const setup = (props = {}) => {
      return shallow(
        <DatePickerRange mode="hour" startDate={''} endDate={''} onDateChange={jest.fn()} />
      );
    };
    let wrapper = setup();
    wrapper.instance().setDate(new Date());
    wrapper.instance().openModal(0);
    wrapper.instance().confirmModal();
    wrapper.instance().formatDate(new Date());
    wrapper.instance().setDate(new Date());
    wrapper.instance().componentWillReceiveProps({ startDate: new Date(), endDate: new Date() });
    wrapper.instance().openModal(1);
    wrapper.instance().setDate(new Date('2022-10-11'));
    wrapper.instance().confirmModal();
  });
  it('datePicker picker event', () => {
    const setup = (props = {}) => {
      return shallow(
        <DatePicker
          mode="datetime"
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
  });
  it('date picker event', () => {
    const setup = (props = {}) => {
      return shallow(
        <DatePicker
          mode="date"
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
  });
  it('date picker event', () => {
    const setup = (props = {}) => {
      return shallow(
        <DatePicker
          mode="hour"
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
    wrapper.instance().setHours(new Date(), 1);
  });
});
