import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Utils, TYText } from 'tuya-panel-kit';
import Strings from './i18n';

const { convertX: cx } = Utils.RatioUtils;

export type MovingTarget = 'stop' | 'opening' | 'closing';

export interface IProps {
  value: number;
  min: number;
  max: number;
  textColor: string;
  openingText?: string;
  closingText?: string;
}

export interface IState {
  accVal: number;
  targetVal: number;
  isMoving: boolean;
  isGesture: boolean;
  movingTarget: MovingTarget;
}

export default class MoveValueDisplay extends Component<IProps, IState> {
  static defaultProps = {
    curtainType: 'trietex',
    styleType: 'zoosemy',
    min: 0,
    max: 100,
    value: 0,
    textColor: '#636EDE',
  };

  constructor(props: IProps) {
    super(props);
    this.state = {
      accVal: this.props.value,
      targetVal: this.props.value,
      isMoving: false,
      isGesture: false,
      movingTarget: 'stop',
    };
  }

  get status() {
    const { min, max } = this.props;
    const { accVal, targetVal, isGesture, isMoving, movingTarget } = this.state;
    let status = '';
    if (isMoving && movingTarget !== 'stop') {
      const tip = this.props[`${movingTarget}Text`];
      status = tip || Strings.getLang(`Curtain_${movingTarget}`);
    } else {
      const val = isGesture ? targetVal : accVal;
      const percent = (val - min) / (max - min);
      status = `${Math.round(percent * 100)}%`;
    }
    return status;
  }

  setAccVal = val => {
    this.setState({ accVal: val });
  };

  setGestureStatus = status => {
    this.setState({ isGesture: status });
  };

  setGestureTargetVal = val => {
    this.setState({ isGesture: true, targetVal: val });
  };

  setMovingStatus = status => {
    this.setState({ movingTarget: status, isMoving: !(status === 'stop') }, () => {
      status === 'stop' && this.setState({ isGesture: false });
    });
  };

  render() {
    const { textColor } = this.props;
    return (
      <View style={styles.container}>
        <TYText style={[styles.text, { color: textColor }]}>{this.status}</TYText>
      </View>
    );
  }
}

const styles = StyleSheet.create<any>({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,.8)',
    borderRadius: cx(12),
    justifyContent: 'center',
    marginBottom: cx(32),
    margin: 0,
    minWidth: cx(88),
    paddingHorizontal: cx(31),
    paddingVertical: cx(8),
  },

  text: {
    backgroundColor: 'transparent',
    color: '#636EDE',
    fontSize: cx(12),
  },
});
