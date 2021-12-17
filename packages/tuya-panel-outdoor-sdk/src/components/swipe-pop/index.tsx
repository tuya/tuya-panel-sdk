import React, { ReactNode } from 'react';
import { View, StyleSheet, Dimensions, LayoutChangeEvent } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import SwipePop from './swipe';

const { convertX: cx, statusBarHeight, isIos } = Utils.RatioUtils;
const height = Dimensions.get('screen').height - (isIos ? 0 : statusBarHeight);

interface SwipeWrapperState {
  topPosition: [number, number];
}

interface SwipeWrapperProps {
  topBar: ReactNode;
  header: ReactNode;
  bottom: ReactNode;
  arrowColor?: string;
}

export default class SwipeWrapper extends React.Component<SwipeWrapperProps, SwipeWrapperState> {
  constructor(props: SwipeWrapperProps) {
    super(props);
    this.state = {
      topPosition: [0, 0],
    };
  }

  onHeaderLayout = (e: LayoutChangeEvent) => {
    // eslint-disable-next-line no-shadow
    const { y, height } = e.nativeEvent.layout;
    this.setState({
      topPosition: [y, y + height],
    });
  };

  render() {
    const { arrowColor, topBar, header, bottom } = this.props;
    return (
      <View style={styles.root}>
        {topBar}
        <View style={styles.header} onLayout={this.onHeaderLayout}>
          {header}
        </View>
        <SwipePop
          activeKey="none"
          sections={[{ key: 'full', height: height - this.state.topPosition[0] }]}
          showHeight={height - this.state.topPosition[1]}
          contentType="full"
          showMask={false}
          arrowColor={arrowColor}
          arrowTintColor="rgba(0,0,0,0)"
        >
          <View style={styles.bottomWrapper}>
            <View style={styles.bottom}>{bottom}</View>
          </View>
        </SwipePop>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'column',
    height,
    width: '100%',
  },
  bottomWrapper: {
    flex: 1,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 5,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: cx(10),
  },
  root: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
});
