/* eslint-disable no-return-assign */
import React, { PureComponent } from 'react';
import CurtainBase from './curtain-base';
import { IProps } from './index.type';

const CURTAIN_VALUE_CODE_CONTROL = 'percent_control';
const CURTAIN_VALUE_CODE_STATE = 'percent_state';
const CURTAIN_CONTROL_CODE = 'control';
export default class Curtain extends PureComponent<IProps> {
  static defaultProps = {
    codes: {},
    min: 0,
    max: 100,
  };

  constructor(props) {
    super(props);

    this.curtainRef = null;
  }

  componentWillReceiveProps(nextProps: IProps) {
    if (this.props.control !== nextProps.control) {
      this.onControlChange(nextProps.control);
    }

    if (this.props.value !== nextProps.value) {
      this.curtainRef && this.curtainRef.onValueChangeFromProps(nextProps.value);
    }
  }

  onControlChange = control => {
    this.curtainRef && this.curtainRef.onControlTypeChange(control);
  };

  get valueCode() {
    const { codes } = this.props;
    const valueControlCode = codes[CURTAIN_VALUE_CODE_CONTROL];
    const valueStateCode = codes[CURTAIN_VALUE_CODE_STATE];
    return valueControlCode || valueStateCode;
  }

  get controlCode() {
    const { codes } = this.props;
    return codes[CURTAIN_CONTROL_CODE];
  }

  get defaultValue() {
    const { control, value: v, min, max } = this.props;
    let value = 0;
    if (this.valueCode) {
      value = v;
    } else if (this.controlCode) {
      value = control === 'open' ? min : control === 'stop' ? max : 0;
    }
    return value;
  }

  curtainRef: any;

  render() {
    return (
      <CurtainBase {...this.props} value={this.defaultValue} ref={ref => (this.curtainRef = ref)} />
    );
  }
}
