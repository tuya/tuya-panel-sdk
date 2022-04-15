import React, { FC } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import {
  Divider,
  DpSchema,
  Popup,
  PopUpListProps,
  PopupPickerProps,
  TabBarProps,
  TYListItem,
  TYSdk,
} from 'tuya-panel-kit';
import { cx, isIos } from '../../utils';
import { TabBar } from '../../components';
import { NewTabProps } from '../../components/TabBar';

interface ITemperatureScaleSwitchingProps {
  type: 'checkBox' | 'list' | 'picker';
  title: string;
  style?: any;
  dpCode?: string;
  showIcon?: boolean;
  schema?: DpSchema;
  value?: string;
  tempUnit?: string;
  putDp?: (dpInfo: Record<string, any>) => void;
  checkBoxProps?: TabBarProps & NewTabProps;
  listProps?: PopUpListProps;
  pickerProps?: PopupPickerProps;
}

const theme = {
  fontColor: '#333333',
  subFontColor: '#999',
  descFontColor: '#999',
  cellBg: '#ffffff',
};

const MAP_TEM = {
  c: '℃',
  f: '℉',
};

const TemperatureScaleSwitching: FC<ITemperatureScaleSwitchingProps> = props => {
  const {
    showIcon,
    dpCode,
    schema,
    value,
    tempUnit,
    type,
    checkBoxProps,
    listProps,
    pickerProps,
    style,
    title,
    putDp,
  } = props;

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
        styles={{
          container: [styles.container, style],
          contentLeft: [styles.contentLeft, { top }],
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

  const data = [
    {
      theme,
      id: dpCode,
      title,
      showIcon,
      top: 16,
      show: value !== undefined,
      dps: [dpCode],
      arrow: !!['list', 'picker'].includes(type),
      onPress: () => {
        if (type === 'list') {
          return Popup.list({
            value,
            type: 'radio',
            maxItemNum: 7,
            dataSource: schema?.range?.map((d: 'c' | 'f') => {
              return {
                key: d,
                title: MAP_TEM[d],
                value: d,
              };
            }),
            title: '温标',
            cancelText: '取消',
            footerType: 'singleCancel',
            onMaskPress: ({ close }) => close(),
            // eslint-disable-next-line no-shadow
            onSelect: (value, { close }: any) => {
              putDp && putDp({ [dpCode!]: value });
              close();
            },
            ...listProps,
          });
        }
        if (type === 'picker') {
          return Popup.picker({
            value,
            dataSource: schema?.range?.map((d: 'c' | 'f') => ({
              key: d,
              label: MAP_TEM[d],
              value: d,
            })),
            title: '温标',
            cancelText: '取消',
            confirmText: '确认',
            onMaskPress: ({ close }) => close(),
            // eslint-disable-next-line no-shadow
            onConfirm: (value, _, { close }) => {
              putDp && putDp({ [dpCode!]: value });
              close();
            },
            ...pickerProps,
          });
        }
        return undefined;
      },
      action: ['list', 'picker'].includes(type) ? (
        MAP_TEM[value! as 'c' | 'f']
      ) : (
        <TabBar
          type="radio"
          tabs={TabList}
          activeKey={value}
          onChange={(val: string) => putDp && putDp({ [dpCode!]: val })}
          style={styles.tab}
          activeColor="#65656E"
          tabActiveTextStyle={styles.tabActiveTextStyle}
          wrapActiveViewStyle={styles.wrapActiveViewStyle}
          {...checkBoxProps}
        />
      ),
    },
    {
      theme,
      id: 'custom_unit_convert',
      title,
      showIcon: false,
      show: value === undefined,
      dps: ['custom_unit_convert'],
      arrow: true,
      onPress: () =>
        TYSdk.mobile.jumpTo(isIos ? 'tuyaSmart://ty_user_setting' : 'tuyaSmart://setting'),
      action: MAP_TEM[tempUnit as 'c' | 'f'],
    },
  ].filter(d => d.show);

  return (
    <FlatList
      style={[styles.list, style]}
      data={data}
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
  tab: {
    borderRadius: cx(8),
    width: 120,
  },
  tabActiveTextStyle: {
    color: 'rgba(255,255,255,0.9)',
  },
  tabStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  textStyle: {
    fontSize: 16,
  },
  wrapActiveViewStyle: {
    borderRadius: cx(8),
  },
});

const TabList = [
  {
    key: 'c',
    title: '℃',
    tabStyle: styles.tabStyle,
    textStyle: styles.textStyle,
  },
  {
    key: 'f',
    title: '℉',
    tabStyle: styles.tabStyle,
    textStyle: styles.textStyle,
  },
];

export default TemperatureScaleSwitching;
