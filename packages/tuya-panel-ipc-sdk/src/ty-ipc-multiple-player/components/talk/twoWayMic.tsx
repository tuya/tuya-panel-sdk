import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import Config from '../../config';

const { cx, cy } = Config;

interface TwoWayMicProps {
  tipText: string;
  isFullScreen: boolean;
  playerWidth: number;
  twoMicStyle?: {
    topFullPage: any;
    topNormalPage: any;
    tipBox: any;
    textTip: any;
  };
}

class TwoWayMic extends React.Component<TwoWayMicProps> {
  static defaultProps = {
    isFullScreen: false,
  };

  constructor(props: TwoWayMicProps) {
    super(props);
    this.state = {};
  }

  render() {
    const { tipText, isFullScreen, playerWidth, twoMicStyle } = this.props;
    // const { topFullPage, topNormalPage, tipBox, textTip } = twoMicStyle;
    const { topFullPage, topNormalPage } = twoMicStyle;
    return (
      <View
        style={[
          isFullScreen ? [styles.topFullPage, topFullPage] : [styles.topNormalPage, topNormalPage],
          { width: playerWidth },
          styles.topNormalPage,
        ]}
      >
        <View style={styles.tipBox}>
          <TYText numberOfLines={1} style={styles.textTip}>
            {tipText}
          </TYText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textTip: {
    color: '#fff',
    fontSize: cx(14),
  },
  tipBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: Math.ceil(cx(14)),
    justifyContent: 'center',
    paddingHorizontal: cx(10),
    paddingVertical: cx(4),
  },
  topFullPage: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: cy(30),
    justifyContent: 'center',
    position: 'absolute',
    top: cy(40),
  },
  topNormalPage: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    // backgroundColor: 'red',
    height: cy(30),
    justifyContent: 'center',
    position: 'absolute',
    top: cy(10),
  },
});

export default TwoWayMic;
