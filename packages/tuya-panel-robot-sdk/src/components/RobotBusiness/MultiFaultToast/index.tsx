import React, { PureComponent } from 'react';
import { Notification, TYSdk, Utils, I18N } from 'tuya-panel-kit';
import { createDpValue$ } from '../../../utils/RxUtils';

const defaultiI18n = new I18N();

interface IProps {
  faultCode: string;
  showDetail: boolean;
  detailRouter: string;
  detailTitle: string;
}

export default class Fault extends PureComponent<IProps> {
  static defaultProps = {
    faultCode: 'fault',
    detailRouter: 'FaultDetail',
    showDetail: false,
    detailTitle: defaultiI18n.getLang('faultDetail'),
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
          } else {
            Notification.hide();
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
    this.timeout && clearTimeout(this.timeout);
    this.subscriptionFault && this.subscriptionFault.unsubscribe();
  }

  getFaultDetail(faultCode: string, faultValue: number, onlyPrior: boolean) {
    const { label } = TYSdk.device.getDpSchema(faultCode);
    const labels = [];
    for (let i = 0; i < label.length; i++) {
      const value = label[i];
      const isExist = Utils.NumberUtils.getBitValue(faultValue, i);
      if (isExist) {
        const title = defaultiI18n.getDpLang(faultCode, `${value}`);
        labels.push(title);
        if (onlyPrior) break;
      }
    }
    return onlyPrior ? labels[0] : labels.join('\n');
  }

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
