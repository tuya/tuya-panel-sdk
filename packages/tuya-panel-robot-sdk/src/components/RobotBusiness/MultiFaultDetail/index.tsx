import React, { PureComponent } from 'react';
import { TYSdk, Utils, TYText, IconFont, I18N } from 'tuya-panel-kit';

import { View, StyleSheet } from 'react-native';
import { createDpValue$ } from '../../../utils/RxUtils';

const { convertY: cy } = Utils.RatioUtils;
const defaultiI18n = new I18N();

interface IProps {
  faultCode: string;
  onlyPrior: boolean;
  formatFaultDetailKey: (fault: string) => string;
}

interface IState {
  faultValue: number;
}

export default class MultiFaultDetail extends PureComponent<IProps, IState> {
  static defaultProps = {
    faultCode: 'fault',
    onlyPrior: false,
    formatFaultDetailKey: (fault: string) => {
      return `${fault}_detail`;
    },
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      faultValue: 0,
    };
  }

  subscriptionFault: any;

  componentDidMount() {
    const { faultCode } = this.props;
    this.subscriptionFault = createDpValue$(faultCode).subscribe(
      (faultValue: number) => {
        this.setState({ faultValue });
      },
      e => console.warn('MultiFaultDetail', e)
    );
  }

  componentWillUnmount() {
    this.subscriptionFault.unsubscribe();
  }

  getFaultDetail(faultCode: string, faultValue: number, onlyPrior: boolean) {
    const { label } = TYSdk.device.getDpSchema(faultCode);
    const labels = [];
    for (let i = 0; i < label.length; i++) {
      const value = label[i];
      const isExist = Utils.NumberUtils.getBitValue(faultValue, i);
      if (isExist) {
        const title = defaultiI18n.getDpLang(faultCode, `${value}`);
        const subTitle = defaultiI18n.getDpLang(faultCode, this.props.formatFaultDetailKey(value));
        labels.push({ title, subTitle });
        if (onlyPrior) break;
      }
    }
    return onlyPrior ? [labels[0]] : labels;
  }

  renderCard(item) {
    const { title, subTitle } = item;
    if (!title || !subTitle) return null;
    return (
      <View style={styles.card} key={title}>
        <IconFont style={styles.icon} name="error" color="red" size={32} />
        <View style={styles.context}>
          <TYText style={styles.title} text={title} />
          <TYText style={styles.subTitle} text={subTitle} />
        </View>
      </View>
    );
  }

  render() {
    const { faultCode, onlyPrior } = this.props;

    const faultContext = this.getFaultDetail(faultCode, this.state.faultValue, onlyPrior);

    return <View style={styles.container}>{faultContext.map(item => this.renderCard(item))}</View>;
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderColor: '#DFDFDF',
    borderRadius: cy(10),
    borderWidth: 1,
    flex: 0,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    marginHorizontal: cy(10),
    marginTop: cy(10),
    padding: cy(10),
  },
  container: {
    backgroundColor: '#F0F0F0',
    flex: 1,
    // alignItems: 'center',
  },
  context: {
    // flexBasis: width,
    // flex: 1,
    flexShrink: 1,
  },
  icon: {
    flexBasis: cy(32),
    // flex: 0,
    flexShrink: 0,
  },
  subTitle: {
    color: 'rgba(0,0,0,0.4)',
    fontSize: cy(12),
  },
  title: {
    color: '#000',
    fontSize: cy(12),
  },
});
