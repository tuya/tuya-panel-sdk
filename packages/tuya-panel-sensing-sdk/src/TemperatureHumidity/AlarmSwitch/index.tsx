import React, { FC, useEffect, useRef, useState } from 'react';
import { FlatList, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Divider, SwitchButton, TYListItem, TYListItemProps, TYSdk } from 'tuya-panel-kit';
import { SensingSDK } from '../../index';
import { cx } from '../../utils';
import { debounce } from '../../SensingSDK/loadsh';

const theme = {
  fontColor: '#333333',
  subFontColor: '#999',
  descFontColor: '#999',
  cellBg: '#ffffff',
};

interface AlarmSwitchProps {
  language: string;
  initList?: any[];
  itemStyle?: TYListItemProps;
  style?: StyleProp<ViewStyle>;
}

const AlarmSwitch: FC<AlarmSwitchProps> = props => {
  const { language, initList, itemStyle, style } = props;
  const [list, setList] = useState<any[]>(initList || []);

  const listRef = useRef<any[]>([]);

  const getList = async () => {
    try {
      const Ret = (await SensingSDK?.INSTANCE?.productSetting()) || [];
      const isZhRegex = /^zh-hans$|^zh_cn$|^zh_hans_\w+/;
      const isZh = isZhRegex.test(language.toLowerCase());
      const curLanguage = isZh ? 'zh' : (language as 'en' | 'zh' | 'zh-Hans');
      const alarmList = Ret?.filter(data => data.auditStatus === 1).map((item, index) => ({
        ...item,
        theme,
        key: item.id,
        value: item.enabled,
        title: item.i18nData.name[curLanguage] || item.i18nData.name.en,
        showIcon: false,
        top: 20,
        show: true,
        dps: [],
        arrow: false,
        onPress: () => undefined,
        action: (
          <SwitchButton
            value={item.enabled}
            onValueChange={enabled => changeSwitch(index, enabled)}
          />
        ),
      }));

      setList(alarmList);
      listRef.current = alarmList;
    } catch (error) {
      __DEV__ && console.log('error', error);
      throw error;
    }
  };

  const changeSwitch = debounce(async (index: number, enabled: boolean) => {
    try {
      listRef.current[index].enabled = enabled;
      const disAlarmIds = listRef.current
        // eslint-disable-next-line no-shadow
        .filter(({ enabled }) => !enabled)
        .map(({ id }) => id)
        .join(',');

      await SensingSDK?.INSTANCE?.productSwitch(disAlarmIds, disAlarmIds.length > 0);

      return getList();
    } catch (error) {
      __DEV__ && console.log('error', error);
      TYSdk.mobile.simpleTipDialog('api错误', () => undefined);
      throw error;
    }
  }, 300);

  const renderItem = (item: Record<string, any>) => {
    // eslint-disable-next-line no-shadow
    const { theme, title, action, onPress, arrow, children, style, showIcon, top = 20 } = item;
    const iconConfig = showIcon && {
      Icon: 'warning',
      iconSize: 12,
      iconColor: 'red',
    };
    return (
      <TYListItem
        {...iconConfig}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        styles={{
          container: [styles.container, style],
          contentLeft: [styles.contentLeft, { top }],
          ...itemStyle,
        }}
        arrow={arrow}
        theme={theme}
        title={title}
        Action={action}
        onPress={onPress}
      >
        {children}
      </TYListItem>
    );
  };

  useEffect(() => {
    initList?.length === 0 && getList();
  }, []);

  if (list.length === 0) return null;

  return (
    <FlatList
      data={list}
      style={[styles.list, style]}
      ItemSeparatorComponent={() => (
        <Divider color="#F1F2F4" height={1} width={cx(295)} style={{ alignSelf: 'center' }} />
      )}
      renderItem={(item: any) => renderItem(item.item)}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 64,
    justifyContent: 'center',
  },
  contentLeft: {
    marginLeft: 2,
    marginRight: 4,
    position: 'absolute',
  },
  list: {
    borderRadius: cx(16),
  },
});

export default AlarmSwitch;
