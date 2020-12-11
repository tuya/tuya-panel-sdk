/* eslint-disable react/no-children-prop */
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import WaterRipple from './waterRipple';
import Config from '../config';

const { cx } = Config;

export interface OneWayMicProps {
  isFullScreen: boolean;
  micTalkImage: number;
  micTalkImageStyle: any;
}

export interface OneWayMicState {}

const _defaultProps = {
  isFullScreen: false,
};

class OneWayMic extends React.PureComponent<OneWayMicProps, OneWayMicState> {
  static defaultProps = _defaultProps;
  constructor(props: OneWayMicProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}
  componentWillUnmount() {}

  render() {
    const { micTalkImage, micTalkImageStyle } = this.props;
    return (
      <View style={styles.fullMicContainer}>
        <View style={styles.micWrap}>
          <WaterRipple
            duration={2000}
            innerRadius={20}
            outerRadius={35}
            children={<Image source={micTalkImage} style={[styles.fullInter, micTalkImageStyle]} />}
            renderRipple={(props: any) => {
              const { style } = props;
              return (
                <View
                  {...props}
                  style={[
                    style,
                    {
                      backgroundColor: 'transparent',
                      borderColor: '#fefefe',
                      borderWidth: 1,
                    },
                  ]}
                />
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullInter: {
    resizeMode: 'contain',
    width: cx(60),
  },
  fullMicContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    bottom: 0,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  micWrap: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: cx(142),
    justifyContent: 'center',
    width: cx(142),
  },
});

export default OneWayMic;
