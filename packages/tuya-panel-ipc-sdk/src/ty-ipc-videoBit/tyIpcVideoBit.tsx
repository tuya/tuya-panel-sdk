import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import Styles from './style';
import TYIpcPlayerManager from '../ty-ipc-native';
import { TYIpcVideoBitProps } from './interface';

const TYIpcVideoBit: React.FC<TYIpcVideoBitProps> & {
  defaultProps: Partial<TYIpcVideoBitProps>;
} = (props: TYIpcVideoBitProps) => {
  const [bitRateValue, setBitRateValue] = useState('');
  const { containerStyle, bitTxtBoxStyle, valueStyle, unitStyle, bitValue, unit } = props;
  let timer = null;
  useEffect(() => {
    convertBitRate();
    return () => {
      clearInterval(timer);
    };
  }, []);
  const convertBitRate = () => {
    getBitValue();
    timer = setInterval(() => {
      getBitValue();
    }, 3000);
  };

  const getBitValue = () => {
    TYIpcPlayerManager.getVideoBitRateKBPS()
      .then(data => {
        if (data) {
          const realBit = (+data).toFixed(0);
          setBitRateValue(realBit);
        } else {
          setBitRateValue('0');
        }
      })
      .catch(err => {
        clearInterval(timer);
      });
  };

  return (
    <View style={[Styles.videoBitContainer, containerStyle]}>
      {bitRateValue !== undefined || bitValue !== undefined ? (
        <View style={[Styles.bitTxtBox, bitTxtBoxStyle]}>
          <TYText style={[Styles.fontContainer, valueStyle]}>
            {bitValue !== undefined ? bitValue : bitRateValue}
            {` `}
            <TYText style={[Styles.fontContainer, unitStyle]}>{unit}</TYText>
          </TYText>
        </View>
      ) : null}
    </View>
  );
};

TYIpcVideoBit.defaultProps = {
  containerStyle: {},
  bitTxtBoxStyle: {},
  valueStyle: {},
  unitStyle: {},
  unit: 'kb/s',
  bitValue: undefined,
};

export default TYIpcVideoBit;
