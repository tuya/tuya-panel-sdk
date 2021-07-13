import React, { useState, useEffect } from 'react';
import { StyleSheet, TextProps } from 'react-native';
import _isArray from 'lodash/isArray';
import { Utils, TYText, TYSdk } from 'tuya-panel-kit';
import Strings from './i18n';

const { convertX: cx } = Utils.RatioUtils;
const defaultText = Strings.getLang('unknownLocation');
interface LocationTextProps {
  /**
   * 字体样式
   */
  localTextStyle: TextProps;
  /**
   * 经纬度
   */
  lonlat: {
    longitude: number;
    latitude: number;
  };
  /**
   * Text接受参数
   */
  textProps: TextProps;
}
const LocationText = ({
  localTextStyle = null,
  lonlat = {
    longitude: null,
    latitude: null,
  },
  textProps = {
    numberOfLines: 2,
  },
}: LocationTextProps) => {
  const [name, setName] = useState(defaultText);
  useEffect(() => {
    TYSdk.native.evilTransform(
      [
        {
          longitude: lonlat.longitude,
          latitude: lonlat.latitude,
        },
      ],
      (info: any) => {
        let names = info[0]?.address || defaultText;
        if (_isArray(names)) {
          names = names.join('') || defaultText;
        }
        setName(names);
      }
    );
  }, []);
  return (
    <TYText style={[styles.lastLocate, localTextStyle]} {...textProps}>
      {name}
    </TYText>
  );
};

export default LocationText;

const styles = StyleSheet.create({
  lastLocate: {
    backgroundColor: 'transparent',
    color: '#000',
    fontSize: cx(14),
    fontWeight: 'bold',
    maxWidth: cx(243),
  },
});
