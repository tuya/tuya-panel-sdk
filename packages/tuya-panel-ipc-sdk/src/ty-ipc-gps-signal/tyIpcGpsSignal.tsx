import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import { TYText, TYSdk, Utils } from 'tuya-panel-kit';
import Res from './res';
import Styles from './style';
import { TYIpcGpsSignalProps } from './interface';

const gpsIcon = ['gpsSignalNone', 'gpsSignalWeak', 'gpsSignalMiddle', 'gpsSignalStrong'];
const lteIcon = ['lteSignalNone', 'lteSignalWeak', 'lteSignalMiddle', 'lteSignalStrong'];

const TYIpcGpsSignal: React.FunctionComponent<TYIpcGpsSignalProps> & {
  defaultProps: Partial<TYIpcGpsSignalProps>;
} = (props: TYIpcGpsSignalProps) => {
  const [gpsLevel, setGpsLevel] = useState(0);
  const [lteLevel, setLteLevel] = useState(0);

  const { containerStyle, imageStyle } = props;
  let { gpsSignal, lteSignal } = props;

  useEffect(() => {
    const { min: gpsMin = 0, max: gpsMax = 100 } = TYSdk.device.getDpSchema(
      'gps_signal_strength'
    ) || {
      min: 0,
      max: 100,
    };
    const { min: lteMin = 0, max: lteMax = 100 } = TYSdk.device.getDpSchema('signal_strength') || {
      min: 0,
      max: 100,
    };

    gpsSignal = Math.max(Math.min(gpsMax, gpsSignal), gpsMin);
    lteSignal = Math.max(Math.min(lteMax, lteSignal), lteMin);

    if (TYSdk.device.getDpSchema('gps_signal_strength')) {
      gpsSignal = TYSdk.device.getState('gps_signal_strength');
    }
    if (TYSdk.device.getDpSchema('signal_strength')) {
      lteSignal = TYSdk.device.getState('signal_strength');
    }
    setGpsLevel(Math.round(Utils.NumberUtils.calcPosition(gpsSignal, gpsMin, gpsMax, 0, 3)));
    setLteLevel(Math.round(Utils.NumberUtils.calcPosition(lteSignal, lteMin, lteMax, 0, 3)));
  }, []);

  const showGps = !_.isUndefined(gpsSignal);
  const showSymbol = !(_.isUndefined(gpsSignal) || _.isUndefined(lteSignal));
  const showLte = !_.isUndefined(lteSignal);

  return (
    <View style={[Styles.signalContain, containerStyle]}>
      {showGps ? (
        <View>
          <Image source={Res[gpsIcon[gpsLevel]]} style={[Styles.iconImg, imageStyle]} />
        </View>
      ) : null}
      {showSymbol && <TYText style={Styles.symbol} text="/" />}
      {showLte ? (
        <View>
          <Image source={Res[lteIcon[lteLevel]]} style={[Styles.iconImg, imageStyle]} />
        </View>
      ) : null}
    </View>
  );
};

TYIpcGpsSignal.defaultProps = {
  containerStyle: {},
  imageStyle: {},
  gpsSignal: undefined,
  lteSignal: undefined,
};

export default TYIpcGpsSignal;
