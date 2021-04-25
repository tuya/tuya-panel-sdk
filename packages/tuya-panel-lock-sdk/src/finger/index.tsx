import React, { Component } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Utils } from 'tuya-panel-kit';
import { FingerProps, FingerState } from './interface';
import Icons from './icons';
import Res from './res';

const { convertX } = Utils.RatioUtils;

const pathList = [
  Icons.finger11,
  Icons.finger12,
  Icons.finger21,
  Icons.finger22,
  Icons.finger31,
  Icons.finger32,
  Icons.finger41,
  Icons.finger42,
  Icons.finger43, // 内圈截止 9个
  Icons.finger51,
  Icons.finger52,
  Icons.finger61,
  Icons.finger62,
  Icons.finger63,
  Icons.finger71,
  Icons.finger72,
  Icons.finger73,
  Icons.finger74,
  Icons.finger81,
  Icons.finger82,
  Icons.finger83,
  Icons.finger84, // 12个
];
const scaleValue = 4;
export default class Finger extends Component<FingerProps, FingerState> {
  static defaultProps = {
    isNeedPageTip: true,
    tipPageNumber: 0,
    successColor: '#0076FF',
    errorColor: '#F56361',
    commonTip: '',
    tipPageTip: '',
  };

  color: string;
  list: any;
  fingerList: any;
  constructor(props: any) {
    super(props);
    this.list = [pathList.concat().splice(0, 9)];
    this.fingerList = [];
    this.state = {
      isNeedPageTip: this.props.isNeedPageTip,
    };
  }

  componentDidMount() {
    this.fingerList = pathList.concat();
    this.list = this.getList(this.props);
  }

  componentWillReceiveProps(nextProps: any) {
    if (nextProps.totalNumber !== this.props.totalNumber) {
      this.fingerList = pathList.concat();
      this.list = this.getList(nextProps);
    }
    if (nextProps.totalNumber !== this.props.totalNumber) {
      if (nextProps.totalNumber > scaleValue) {
        this.setState({
          isNeedPageTip: nextProps.isNeedPageTip,
        });
      } else {
        this.setState({
          isNeedPageTip: false,
        });
      }
    }
  }

  shouldComponentUpdate(nextProps: any) {
    if (nextProps.currentNumber > nextProps.totalNumber) {
      return false;
    }
    return true;
  }

  getList = (props: any) => {
    const list = [];
    const half =
      props.totalNumber < scaleValue ? props.totalNumber : Math.floor(props.totalNumber / 2); // 小于标记值的 默认指纹数过少 只需要小圈指纹即可
    const innerNumber = Math.floor(9 / half);
    const outNumber = Math.floor(12 / half);

    for (let i = 0; i < half; i++) {
      if (i === half - 1) {
        const item = this.fingerList.splice(0, 9 - i * innerNumber);
        list.push(item);
      } else {
        const item = this.fingerList.splice(0, innerNumber);
        list.push(item);
      }
    }
    if (props.totalNumber > scaleValue) {
      const time = props.totalNumber % 2 === 0 ? half : half + 1; // 当指纹次数为基数的时候由于floor 会缺少1次 故补上
      for (let i = 0; i < time; i++) {
        if (i === half - 1) {
          const item = this.fingerList.splice(0, 12 - i * outNumber);
          list.push(item);
        } else {
          const item = this.fingerList.splice(0, outNumber);
          list.push(item);
        }
      }
    }
    return list;
  };

  renderPath() {
    const { currentNumber, isSuccess, successColor, errorColor } = this.props;

    return this.list.map((item, index) => {
      let color = false;
      if (index < currentNumber) {
        color = true;
      }
      if (
        this.props.totalNumber !== 0 &&
        currentNumber < Math.floor(this.props.totalNumber / 2) &&
        index > Math.floor(this.props.totalNumber / 2) - 1
      ) {
        this.color = 'transparent';
      } else {
        this.color = '#E5E5E5';
      }
      return item.map(element => {
        return (
          <Path
            key={element}
            stroke={color ? (isSuccess ? successColor : errorColor) : this.color}
            fill={color ? (isSuccess ? successColor : errorColor) : this.color}
            d={element}
          />
        );
      });
    });
  }

  render() {
    const { currentNumber, totalNumber, commonTip, tipPageTip } = this.props;
    const { isNeedPageTip } = this.state;
    return (
      <View style={{ flex: 1, backgroundColor: '#F8F8F8' }}>
        {(!isNeedPageTip ||
          currentNumber !== Math.floor(this.props.totalNumber / 2) ||
          !totalNumber) && (
          <View style={styles.centerView}>
            <View style={styles.finger}>
              <Svg
                width={180}
                height={180}
                style={{
                  backgroundColor: 'transparent',
                }}
              >
                {this.renderPath()}
              </Svg>
            </View>

            <View style={styles.processValue}>
              <Text style={[styles.currentText, { color: '#0076FF' }]}>{currentNumber}</Text>
              <Text style={styles.aimText}>{`/${totalNumber}`}</Text>
            </View>
            <Text style={styles.tip}>{commonTip}</Text>
          </View>
        )}
        {isNeedPageTip &&
          currentNumber === Math.floor(this.props.totalNumber / 2) &&
          totalNumber !== 0 && (
            <View style={styles.centerView}>
              <Image style={styles.fingerImage} source={Res.tipImage} />
              <Text
                style={[
                  styles.tip,
                  {
                    fontSize: 17,
                  },
                ]}
              >
                {tipPageTip}
              </Text>
              <View style={styles.processValue}>
                <Text style={[styles.currentText, { color: '#0076FF' }]}>{currentNumber}</Text>
                <Text style={styles.aimText}>{`/${totalNumber}`}</Text>
              </View>
            </View>
          )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  aimText: {
    color: '#999999',
    fontSize: 16,
  },
  centerView: {
    flex: 1,
    alignItems: 'center',
  },
  currentText: {
    fontSize: 18,
  },
  finger: {
    alignItems: 'center',
    height: 180,
    justifyContent: 'center',
    marginTop: convertX(130),
    width: 180,
  },
  fingerImage: {
    marginTop: 80,
  },
  processValue: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: convertX(8),
    marginTop: convertX(36),
  },
  tip: {
    color: '#333333',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: convertX(30),
    textAlign: 'center',
    width: convertX(270),
  },
});
