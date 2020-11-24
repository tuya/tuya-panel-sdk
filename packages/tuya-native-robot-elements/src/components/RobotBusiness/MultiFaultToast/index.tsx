import React, { PureComponent } from 'react';
import { Notification, TYSdk, Utils } from '@tuya-rn/tuya-native-components';

import { createDpValue$ } from '../../../utils/RxUtils';
import I18N from '../../../i18n';

const { convertX: cx, convertY: cy, width, height } = Utils.RatioUtils;

interface IProps {
  faultCode: string;
  showDetail: boolean;
  detailRouter: string;
  detailTitle: string;
}

interface IState {
  visible: boolean;
  faultValue: number;
}

export default class Fault extends PureComponent<IProps, IState> {
  static defaultProps = {
    faultCode: 'fault',
    detailRouter: 'FaultDetail',
    showDetail: false,
    detailTitle: I18N.getLang('faultDetail'),
  };

  state = {
    visible: false,
    faultValue: 0,
  };

  timeout: number;
  subscriptionFault: any;

  componentDidMount() {
    const { faultCode } = this.props;
    this.timeout = setTimeout(() => {
      this.subscriptionFault = createDpValue$(faultCode).subscribe(
        (faultValue: number) => {
          if (faultValue) {
            this.handleShowNotification(faultValue);
            // this.setState({ faultValue, visible: true });
          } else {
            Notification.hide();
            // this.setState({ faultValue, visible: false });
          }
        },
        e => console.warn(e)
      );
    }, 0);
    

    // setTimeout(() => {
    //   TYSdk.event.emit('deviceDataChange', { [faultCode]: 3 });
    // }, 3000);
  }

  componentWillUnmount() {
    this.timeout && clearTimeout(this.timeout)
    this.subscriptionFault && this.subscriptionFault.unsubscribe();
  }

  getFaultDetail(faultCode: string, faultValue: number, onlyPrior: boolean) {
    const { label } = TYSdk.device.getDpSchema(faultCode);
    const labels = [];
    for (let i = 0; i < label.length; i++) {
      const value = label[i];
      const isExist = Utils.NumberUtils.getBitValue(faultValue, i);
      if (isExist) {
        const title = I18N.getDpLang(faultCode, `${value}`);
        labels.push(title);
        if (onlyPrior) break;
      }
    }
    return onlyPrior ? labels[0] : labels.join('\n');
  }

  handleClose = () => {
    this.setState({ visible: false });
  };

  handleShowNotification = (faultValue: number) => {
    const { faultCode, detailRouter, showDetail, detailTitle } = this.props;
    Notification.show({
      style: {
        // flex: 1,
        width,
      },
      message: this.getFaultDetail(faultCode, faultValue, false),
      onPress: () => {
        if (showDetail) {
          TYSdk.Navigator.push({
            id: detailRouter,
            title: detailTitle,
            faultCode,
          });
        }
      },
    });
  };

  render() {
    return null;
  }
}
