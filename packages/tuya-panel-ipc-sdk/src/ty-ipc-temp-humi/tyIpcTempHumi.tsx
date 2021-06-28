/* eslint-disable no-param-reassign */
import React, { useState } from 'react';
import { View, Image } from 'react-native';
import _ from 'lodash';
import { TYText, TYSdk } from 'tuya-panel-kit';
import Styles from './style';
import Res from './res';
import { TYIpcTempHumiProps, TempHuiSchema } from './interface';
import { showMathPowValue } from '../utils';
import publicConfig from '../publicConfig';

const { cx } = publicConfig;


const TYIpcTempHumi: React.FC<TYIpcTempHumiProps> & {
  defaultProps: Partial<TYIpcTempHumiProps>;
} = (props: TYIpcTempHumiProps) => {

  const {standardDpMode, sensor_temperature, sensor_humidity, temp_report_f, humiIconImgStyle, tempIconTextStyle, humiIconTextStyle, containerStyle, iconBoxStyle, tempIcon, humiIcon, tempIconImgStyle, symbolTextStyle  } = props;

  const showTemp = !_.isUndefined(sensor_temperature) || !_.isUndefined(temp_report_f);
  const showSymbol = !_.isUndefined(sensor_temperature) && !_.isUndefined(sensor_humidity);
  const showHumidity = !_.isUndefined(sensor_humidity);

  const humiContainWidth = (showTemp && showHumidity) ? Math.ceil(cx(180)) : Math.ceil(cx(100)) ;

  const getTempValue = (nextProps) => {
    const { sensor_temperature, temp_report_f, temp_unit_select } = nextProps;
    let sendStr = '';
    let schema: TempHuiSchema = {};
    if (standardDpMode) {
      schema = TYSdk.device.getDpSchema();
    }

      // 如果只有摄氏度
      if (
        !_.isUndefined(sensor_temperature) && _.isUndefined(temp_report_f) && _.isUndefined(temp_unit_select)
      ) {
        // 如果为标准dp模式
        if (standardDpMode && schema.sensor_temperature) {
          const { scale } = schema.sensor_temperature;
          if (!_.isUndefined(scale)) {
            const tempValue = showMathPowValue(sensor_temperature, scale);
            sendStr = `${tempValue}℃`;
          } 
        } else {
          sendStr = `${sensor_temperature}℃`;
        }
      } else if (
        // 如果只有华氏度
        _.isUndefined(sensor_temperature) && !_.isUndefined(temp_report_f) && _.isUndefined(temp_unit_select)
      ) {
        if (standardDpMode && schema.temp_report_f ) {
          const { scale } = schema.temp_report_f;
          if (!_.isUndefined(scale)) {
            const tempfValue = showMathPowValue(temp_report_f, scale);
            sendStr = `${tempfValue}℉`;
          } 
        } else {
          sendStr = `${temp_report_f}℉`;
        }
      } else if (
        // 如果有单位选择时
        !_.isUndefined(temp_unit_select)
      ) {
        if (temp_unit_select === '0') {
          // 为0时表示单位为摄氏度
          if (standardDpMode && schema.sensor_temperature ) {
            const { scale } = schema.sensor_temperature;
            if (!_.isUndefined(scale)) {
              const tempValue = showMathPowValue(sensor_temperature, scale);
              sendStr = `${tempValue}℃`;
            } 
          } else {
            sendStr = `${sensor_temperature}℃`;
          }
        } else {
          // 为1时表示单位为华氏度
          if (standardDpMode &&  schema.temp_report_f ) {
            const { scale } = schema.temp_report_f;
            if (!_.isUndefined(scale)) {
              const tempfValue = showMathPowValue(temp_report_f, scale);
              sendStr = `${tempfValue}℉`;
            } 
          } else {
            sendStr = `${temp_report_f}℉`
          }
         
        }
      }
    return sendStr;
  };

  const getHumiValue = (nextProps) => {
    const { sensor_humidity } = nextProps;
    let schema: TempHuiSchema = {};
    let sendStr = '';
    
    if (standardDpMode && schema.sensor_humidity) {
      schema = TYSdk.device.getDpSchema();
      const { scale } = schema.sensor_humidity;
      if (!_.isUndefined(scale)) {
        const humidityValue = showMathPowValue(sensor_humidity, scale);
        sendStr = `${humidityValue}%`;
      } 
    } else {
      sendStr = `${sensor_humidity}%`;
    }
    return sendStr;
  };



  return (
    <View style={[Styles.tempHumiPage, { width: humiContainWidth }, containerStyle]}>
      {showTemp ? (
        <View style={[Styles.iconBox, iconBoxStyle]}>
          <Image source={tempIcon} style={[ Styles.iconImg, tempIconImgStyle ]} />
          <TYText style={[Styles.iconText, tempIconTextStyle]}>{getTempValue(props)}</TYText>
        </View>
      ) : null}
      {showSymbol ? <TYText style={[Styles.symbol, symbolTextStyle]}>/</TYText> : null}
      {showHumidity ? (
        <View style={[Styles.iconBox, iconBoxStyle]}>
          <Image source={humiIcon} style={[ Styles.iconImg, humiIconImgStyle ]}  />
          <TYText style={[Styles.iconText, humiIconTextStyle]}>{getHumiValue(props)}</TYText>
        </View>
      ) : null}
  </View>
  );
};

TYIpcTempHumi.defaultProps = {
  standardDpMode: true,
  containerStyle: {},
  iconBoxStyle: {},
  tempIconImgStyle: {},
  humiIconImgStyle: {},
  tempIcon: Res.tempIcon,
  humiIcon: Res.humIcon,
  tempIconTextStyle: {},
  humiIconTextStyle: {},
  sensor_temperature: undefined,
  temp_report_f: undefined,
  sensor_humidity: undefined,
  temp_unit_select: '0',
};

export default TYIpcTempHumi;
