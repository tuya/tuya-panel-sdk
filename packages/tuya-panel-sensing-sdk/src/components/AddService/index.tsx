import React, { useState, useEffect, FC } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, FlatListProps } from 'react-native';
import { Divider, TYText, IconFont, TYSdk, Popup, Dialog, ListDate } from 'tuya-panel-kit';
import { SensingSDK, IServe, NoticeType, DpSchema } from '../../SensingSDK';
import { useDpSchema } from '../../hooks';
import { Utils } from '../../szos-utils-sdk';
import { getDpCodeById, scaleNumber, cx, jumpToH5 as jumpTo } from '../../utils';

export const reductionDpState = (value: any, schema: DpSchema) => {
  if (schema?.type === 'value') {
    // eslint-disable-next-line no-param-reassign, no-restricted-properties
    value = transLateNumber(value * Math.pow(10, schema?.scale || 0), schema?.scale);
  }
  return value;
};

const { transLateNumber } = Utils;

type TypeNotice = 'appPushTrigger' | 'mobileVoiceSend' | 'smsSend';

type TypeAlarmCode = 'temp_current' | 'humidity_value';

type TypeAlarm = 'tempAlarm' | 'humidityAlarm';

export interface IInitList {
  conditionType: number;
  dpCode: TypeAlarmCode;
  dpId: string;
  dpValue: [number, number] | [];
  entityValue: TypeAlarm;
  key: string;
  name: string;
  status: boolean;
  timer: number[] | [];
  timeout: number;
}

export interface IBind {
  alarmTitle: string; // 告警标题
  associativeEntityId: string; //
  associativeEntityValue: TypeAlarm; //
  bindExecutor: string;
  bindId: number;
  bizDomain: string;
  code: string;
  conditionRuleId: string;
  conditionType: number;
  dpId: string;
  enable: boolean;
  entityValue: TypeAlarm;
  icon: string;
  id: number;
  isBind: true;
  key: string;
  name: string;
  ownerId: string;
  property: string;
  pushType: TypeNotice;
  range: [number, number];
  sourceEntityId: string;
  status: boolean;
  timeout: number;
  timer: any[];
  triggerRuleId: string;
  triggerRuleVO: {
    actions: {
      actionExecutor: string;
      actionStrategy: string;
      attribute: number;
      devDelMark: boolean;
      executorProperty: {
        deviceExecuteLog: number;
        devId: string;
        jumpType: string;
        source: string;
      };
      id: number;
      offGwSync: boolean;
      orderNum: number;
      ruleId: string;
    }[];
    attribute: number;
    auditStatus: number;
    boundForPanel: boolean;
    boundForWiFiPanel: boolean;
    code: string;
    commonField: string;
    conditions: {
      attribute: number;
      condType: number;
      devDelMark: boolean;
      entityId: string;
      entitySubIds: string;
      entityType: number;
      expr: any[];
      expression: string;
      extra: string;
      handleStrategy: string;
      id: string;
      orderNum: number;
      serverProperty: string;
      serviceProvider: string;
    }[];
    coverIcon: string;
    displayColor: string;
    enabled: boolean;
    gmtCreate: number;
    gmtModified: number;
    id: string;
    iotAutoAlarm: boolean;
    isLogicRule: boolean;
    localLinkage: boolean;
    matchType: number;
    name: string;
    needCleanGidSid: boolean;
    needValidOutOfWork: boolean;
    newLocalScene: boolean;
    offGwSync: boolean;
    offGwSyncSuccess: boolean;
    outOfWork: number;
    ownerId: string;
    preConditions: {
      condType: string;
      expr: {
        end: string;
        loops: string;
        start: string;
        id: number;
        timeZoneId: string;
        weeks: string;
      };
      id: string;
    }[];
    ruleSource: number;
    ruleType: number;
    runtimeEnv: string;
    scenarioRule: boolean;
    stickyOnTop: boolean;
    uid: string;
  };
  uid: string;
  [props: string]: any;
}

export interface IBindInfo {
  // eslint-disable-next-line camelcase
  humidity_value?: Partial<IBind>;
  // eslint-disable-next-line camelcase
  temp_current?: Partial<IBind>;
}

interface AddServiceProps {
  initList: IInitList[];
  bindInfo: IBindInfo;
  getBindInfoList: (list: IBindInfo) => void;
  Strings: Record<string, any>;
  FlatListProps?: FlatListProps<any>;
}

const getBindInfo = async (schema: Partial<{ [props: string]: DpSchema }>) => {
  try {
    const data = (await SensingSDK.INSTANCE?.queryCloudAlarm()) || [];
    if (data.length === 0) return {} as IBindInfo;

    const result = data.reduce((memo, item) => {
      const { associativeEntityId, triggerRuleVO, id } = item;
      const { actions, conditions, preConditions = [], name = '' } = triggerRuleVO;
      const code = (getDpCodeById(+associativeEntityId) as TypeAlarmCode) || 'temper_alarm';

      if (code === undefined) return memo;

      // eslint-disable-next-line no-shadow
      const range = conditions.map(item =>
        transLateNumber(
          +scaleNumber(schema[`schema_${code}`]?.scale || 0, item.expr[0][2]),
          schema[`schema_${code}`]?.scale
        )
      );
      const pushType = actions[0]?.actionExecutor as NoticeType;

      const commonData = {
        ...item,
        range,
        code,
        isBind: true,
        dpId: associativeEntityId,
        bindId: id,
        pushType,
        status: true,
        timer: preConditions.map((t: any, i: number) => ({
          start: t.expr.start,
          end: t.expr.end,
          loops: t.expr.loops,
          weeks: t.expr.loops, // 不转化，自行处理
          id: i,
        })),
        alarmTitle: name,
        conditionType: 1,
        entityValue: code === 'temp_current' ? 'tempAlarm' : 'humidityAlarm',
        key: code === 'temp_current' ? 'tempAlarm' : 'humidityAlarm',
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
    }, {} as IBindInfo);
    return result;
  } catch (error) {
    __DEV__ && console.log('error', error);
    throw error;
  }
};

const AddService: FC<AddServiceProps> = props => {
  // eslint-disable-next-line no-shadow
  const { initList, bindInfo, getBindInfoList, Strings, FlatListProps } = props;

  // eslint-disable-next-line camelcase
  const { humidity_value = '', temp_current = '' } = TYSdk.devInfo.schema || {};

  const { schema } = useDpSchema(TYSdk.devInfo.schema, 'schema');

  const [serverList, setServerList] = useState<IServe[]>([]);

  const popupList = (value: TypeNotice, dpCode: TypeAlarmCode) => {
    Popup.list({
      value,
      mask: false,
      dataSource: serverList as ListDate[],
      title: Strings.getLang(`pushTitle_${dpCode}`),
      cancelText: Strings.getLang('cancel'),
      confirmText: Strings.getLang('confirm'),
      iconTintColor: '#44DB5E',
      // eslint-disable-next-line no-shadow
      onSelect: value => {
        const { status, url } = serverList.find(d => d.pushType === value)!;
        if (status) return;
        Dialog.close();
        // eslint-disable-next-line consistent-return
        return Dialog.confirm({
          title: Strings.getLang('noOpenServeTips'),
          cancelText: Strings.getLang('cancel'),
          confirmText: Strings.getLang('confirm'),
          onConfirm: () => {
            Dialog.close();
            setTimeout(() => {
              jumpTo(url!);
            }, 800);
          },
        });
      },
      onConfirm: (v: NoticeType) => {
        return updateBind(v, dpCode);
      },
    });
  };

  const getList = async () => {
    try {
      const data = await getBindInfo(schema);
      getBindInfoList(data);
    } catch (error) {
      __DEV__ && console.log('error', error);
      throw error;
    }
  };

  // eslint-disable-next-line consistent-return
  const updateBind = async (type: NoticeType, alarmType: TypeAlarmCode) => {
    try {
      const isTempCode = alarmType === 'temp_current';
      let data = {};

      if (!bindInfo?.[alarmType]) {
        data = {
          dpId: isTempCode ? '1' : '2',
          entityValue: isTempCode ? 'tempAlarm' : 'humidityAlarm',
          dpValue: isTempCode
            ? // eslint-disable-next-line camelcase
              [(temp_current as DpSchema).min, (temp_current as DpSchema).max]
            : // eslint-disable-next-line camelcase
              [(humidity_value as DpSchema).min, (humidity_value as DpSchema).max],
          pushType: type,
          timer: [],
          timeout: 0,
          name: Strings.getLang(`cloud_${alarmType}`),
        };
      } else {
        const { dpId, entityValue, timer = [], timeout = 0, name, range } = bindInfo?.[alarmType];
        data = {
          dpId,
          entityValue,
          dpValue: range!.map(d => reductionDpState(d, schema[`schema_${alarmType}`]!)),
          pushType: type,
          timer,
          timeout,
          name,
        };
      }

      await SensingSDK.INSTANCE?.updateCloudAlarm({ ...data, actionStrategy: 'edge' } as any, [
        '>=',
        '<=',
      ]);
      await Popup.close();
      return getList();
    } catch (err) {
      Popup.close();
      const e = typeof err === 'string' ? JSON.parse(err) : err;
      const errTip = e.message || e.errorMsg || e;
      TYSdk.mobile.simpleTipDialog(errTip, () => undefined);
    }
  };

  const renderItem = ({ item }: { item: IInitList; [props: string]: any }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.88}
        onPress={() => popupList(bindInfo[item.dpCode]?.pushType, item.dpCode)}
        key={item?.dpId}
      >
        <View style={styles.item}>
          <TYText style={styles.title}>{Strings.getLang(item.key)}</TYText>
          <View style={styles.left}>
            <TYText style={styles.txt}>
              {bindInfo[item.dpCode]?.pushType && bindInfo[item.dpCode]?.status
                ? Strings.getLang(`pushType_${bindInfo[item.dpCode]?.pushType}`)
                : Strings.getLang('noOpen')}
            </TYText>
            <IconFont name="arrow" color="#D7D8DE" />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const getServerList = async () => {
    try {
      TYSdk.mobile.showLoading();
      const Ret = await SensingSDK.INSTANCE?.getServerList(true);
      const array = Object.keys(Ret!) as ['sms' | 'app' | 'mobile'];
      const source = array.reduce<IServe[]>((memo, item) => {
        return memo.concat({
          ...Ret[item],
          value: Ret[item]?.pushType,
          title: `${Strings.getLang(`pushType_${Ret[item]?.pushType}`)}${getTitle(
            Ret[item]?.status
          )}`,
        });
      }, []);
      setServerList(source);
      return TYSdk.mobile.hideLoading();
    } catch (error) {
      TYSdk.mobile.hideLoading();
      __DEV__ && console.log('error', error);
      throw error;
    }
  };

  const getTitle = (isServer: boolean) => (isServer ? '' : Strings.getLang('noOpenServe'));

  useEffect(() => {
    getServerList();
  }, []);

  return (
    <FlatList
      data={initList as any}
      renderItem={renderItem as any}
      contentContainerStyle={styles.list}
      keyExtractor={(item: TypeAlarmCode) => bindInfo[item]?.key}
      ItemSeparatorComponent={() => <Divider color="#F1F2F4" height={1} />}
      {...(FlatListProps as any)}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: cx(20),
  },
  left: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  list: {
    backgroundColor: '#FFF',
    borderRadius: cx(16),
    paddingHorizontal: cx(20),
  },
  title: {
    color: '#1A1E30',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 23,
  },
  txt: {
    color: '#1A1E30',
    fontSize: 12,
    lineHeight: 18,
    marginRight: cx(5),
    opacity: 0.3,
  },
});

export default AddService;
