import React, { useState, useEffect } from 'react';
import { ScrollView, View } from 'react-native';
import { AddService, SensingSDK } from '@tuya/tuya-panel-sensing-sdk';
import { Utils, TYSdk } from 'tuya-panel-kit';
import Strings from '../../../i18n';

const { convertX: cx } = Utils.RatioUtils;

const { scaleNumber } = Utils.NumberUtils;

const getBindInfo = async schema => {
  try {
    const data = (await SensingSDK.INSTANCE?.queryCloudAlarm()) || [];
    const result = data.reduce((memo, item) => {
      const { associativeEntityId, triggerRuleVO, id } = item;
      const { actions, conditions, preConditions = [], name = '' } = triggerRuleVO;
      const code = TYSdk.device.getDpCodeById(+associativeEntityId) || 'temper_alarm';
      if (code === undefined) return memo;

      const range = conditions.map(
        // eslint-disable-next-line no-shadow
        item => +scaleNumber(schema[`schema_${code}`]?.scale || 0, item.expr[0][2])
      );
      const pushType = actions[0]?.actionExecutor;

      const commonData = {
        ...item,
        range,
        code,
        isBind: true,
        dpId: associativeEntityId,
        bindId: id,
        pushType,
        status: true,
        timer: preConditions.map((t, i) => ({
          start: t.expr.start,
          end: t.expr.end,
          loops: t.expr.loops,
          weeks: t.expr.loops,
          id: i,
        })),
        alarmTitle: name,
        conditionType: 1,
        entityValue: code,
        key: code,
        name: code,
        timeout: 0,
      };
      conditions.forEach(cItem => {
        const conditionType = cItem.entityType;
        commonData.conditionType = conditionType;
        if (conditionType === 13) {
          commonData.timeout = JSON.parse(cItem.extra).timeWindow; // 秒
        }
      });
      // eslint-disable-next-line no-param-reassign
      memo = {
        ...memo,
        [code]: commonData,
      };
      return memo;
    }, {});
    return result;
  } catch (error) {
    __DEV__ && console.log('error', error);
    throw error;
  }
};

const initList = [
  {
    conditionType: 1,
    dpCode: 'temp_current',
    dpId: '1', // 温度dp
    dpValue: [0, 10], // 默认范围
    entityValue: 'tempAlarm',
    key: 'tempAlarm',
    name: '温度告警',
    status: false,
    timer: [],
    timeout: 0,
  },
  {
    conditionType: 1,
    dpCode: 'humidity_value',
    dpId: '2', // 湿度dp
    dpValue: [0, 10], // 默认范围
    entityValue: 'humidityAlarm',
    key: 'humidityAlarm',
    name: '湿度告警',
    status: false,
    timer: [],
    timeout: 0,
  },
];

const AddServiceCom = () => {
  const [bindInfo, setBindInfo] = useState({});

  useEffect(() => {
    getBindInfo(TYSdk.devInfo.schema).then(res => setBindInfo(res));
  }, []);

  return (
    <ScrollView>
      <View style={{ flex: 1, paddingHorizontal: cx(8), backgroundColor: 'transparent' }}>
        <AddService
          initList={initList}
          bindInfo={bindInfo}
          getBindInfoList={setBindInfo}
          Strings={Strings}
        />
      </View>
    </ScrollView>
  );
};

export default AddServiceCom;
