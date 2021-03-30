/* eslint-disable @typescript-eslint/ban-ts-comment */
import { filter as _filter, pick as _pick } from 'lodash';
import camelCase from 'camelcase';
import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Utils, TYSdk, TYSectionList, TYText, IconFont, Popup } from 'tuya-panel-kit';
import LightModeList from './lightModeList';
import Strings from '../i18n';
import { SettingProps, DefualtSettingProps, trimArray, DpState } from './index.type';

const TYDevice = TYSdk.device;
const TYMobile = TYSdk.mobile;
const { convertX: cx } = Utils.RatioUtils;
const { range, scaleNumber } = Utils.NumberUtils;

interface SettingState {
  dpState: DpState;
}

export default class SettingScene extends Component<SettingProps, SettingState> {
  static defaultProps = DefualtSettingProps;
  constructor(props: SettingProps) {
    super(props);
    const schema = TYDevice.getDpSchema();
    this.relayStatus = _filter(schema, (d: any) => /^relay_status/.test(d.code));
    this.state = {
      dpState: TYDevice.getState(),
    };
  }

  componentDidMount() {
    TYSdk.event.on('deviceDataChange', data => {
      if (data.type === 'dpData') {
        const { payload }: any = data;
        const { dpState } = this.state;
        const dpData = { ...payload };
        this.setState({ dpState: { ...dpState, ...dpData } });
      }
    });
  }

  get sections() {
    const { themeColor, cloudFunData, showSwitchLog, settingDps, logId } = this.props;
    const notBoolean = _filter(settingDps, d => d.type !== 'bool' && d.mode !== 'ro');
    const isBoolean = _filter(settingDps, d => d.type === 'bool');
    return [
      {
        title: null,
        data: trimArray([
          showSwitchLog && {
            key: 'switchLog',
            title: Strings.getLang('switchLog'),
            arrow: true,
            onPress: () =>
              TYSdk.Navigator.push({
                id: logId,
                title: Strings.getLang('switchLog'),
                themeColor,
              }),
          },
        ]),
      },
      {
        title: null,
        data: cloudFunData.map(({ code, value }: { code: string; value: string }) => {
          const [parsedValue] = value ? JSON.parse(value) : [{ value: '' }];
          const url = parsedValue.value;
          return {
            key: code,
            accessibilityLabel: `DpsLists_${camelCase(code, { pascalCase: true })}`,
            arrow: true,
            title: parsedValue.name || Strings.getLang('jumpTo'),
            onPress: () => url && TYMobile.jumpTo(url),
          };
        }),
      },
      {
        title: null,
        data: notBoolean.map((d: any) => {
          const { code, type } = d;
          const value = this.state.dpState[code];
          const isRelyStatu = code.slice(0, 12) === 'relay_status';
          const valueTxt =
            type === 'value' ? scaleNumber(d.scale, +value) : this._getValue(code, value);
          return {
            key: code,
            accessibilityLabel: `${code}`,
            arrow: true,
            title: isRelyStatu ? Strings.getLang('relayStatusTitle') : Strings.getDpLang(code),
            value:
              type === 'value'
                ? !!d.unit && d.unit !== ''
                  ? `${valueTxt} ${Strings.getDpLang(code, 'unit')}`
                  : `${valueTxt}`
                : this._getValue(code, value),
            onPress: () => this.getDpPress(code, value, type),
            renderItem: this.renderItem,
          };
        }),
      },
      {
        title: null,
        data: isBoolean.map((d: any) => {
          const { code = '' } = d;
          const value = this.state.dpState[code];
          return {
            key: code,
            accessibilityLabel: `${code}`,
            arrow: false,
            value,
            title: Strings.getDpLang(code),
            SwitchButtonProps: {
              onTintColor: themeColor,
            },
            subTitle: code === 'child_lock' ? Strings.getLang(`${code}_tip`) : null,
            onValueChange: () => this._handleItemValueChange(code, value),
            onPress: () => {},
          };
        }),
      },
    ];
  }

  getDpPress = (cd: string, value: string | number, type: string) => {
    const { themeColor, statusId } = this.props;
    const schemas = TYDevice.getDpSchema(cd);
    let dataSource = [];
    const options = {
      cancelText: Strings.getLang('cancel'),
      confirmText: Strings.getLang('sure'),
      motionType: 'PullUp',
      titleTextStyle: styles.titleTextStyle,
      cancelTextStyle: styles.cancelTextStyle,
    };
    switch (type) {
      case 'value':
        dataSource = range(0, schemas.max / schemas.step, 1).map((_item: any, index: number) => ({
          label: `${(index + 1) * schemas.step}`,
          value: (index + 1) * schemas.step,
        }));
        Popup.picker({
          dataSource,
          title: Strings.getDpLang(cd),
          value,
          label: !!schemas.unit && schemas.unit !== '' ? Strings.getDpLang(cd, 'unit') : '',
          cancelText: Strings.getLang('cancel'),
          confirmText: Strings.getLang('sure'),
          motionType: 'PullUp',
          titleTextStyle: styles.titleTextStyle,
          cancelTextStyle: styles.cancelTextStyle,
          onConfirm: (data: { [key: string]: string | number }) => {
            TYDevice.putDeviceData({
              [cd]: data,
            });
            Popup.close();
          },
        });
        break;
      case 'enum':
        dataSource =
          schemas && schemas.range
            ? schemas.range.map((item: string) => ({
                key: item,
                title: Strings.getDpLang(cd, item),
                value: item,
              }))
            : [];
        if (cd === 'light_mode') {
          Popup.custom({
            content: (
              <LightModeList
                iconTintColor={themeColor}
                value={value}
                dataSource={dataSource}
                code={cd}
              />
            ),
            title: Strings.getDpLang(cd),
            cancelText: Strings.getLang('cancel'),
            confirmText: Strings.getLang('sure'),
            motionType: 'PullUp',
            titleTextStyle: styles.titleTextStyle,
            cancelTextStyle: styles.cancelTextStyle,
            footerType: 'singleCancel',
          });
        } else {
          const isRelyStatu = cd.slice(0, 12) === 'relay_status';
          const { isStatusMultichannel } = this.props;
          if (isRelyStatu && isStatusMultichannel) {
            TYSdk.Navigator.push({
              id: statusId,
              title: Strings.getLang('relayStatus'),
              themeColor,
            });
          } else {
            Popup.list({
              dataSource,
              title: Strings.getDpLang(cd),
              value,
              footerType: 'singleCancel',
              iconTintColor: themeColor,
              ...options,
              styles: {
                // @ts-ignore
                title: [{ color: '#333333', fontSize: 16 }],
              },
              onSelect: (data: string) => {
                TYDevice.putDeviceData({
                  [cd]: data,
                });
                Popup.close();
              },
            });
          }
        }
        break;
      default:
        break;
    }
  };

  _getValue = (code: string, value: string) => {
    const isRelyStatu = code.slice(0, 12) === 'relay_status';
    let str = '';
    const singleStaus = _filter(this.relayStatus, d => d.code !== 'relay_status');
    const singleSwitch: string[] = [];
    singleStaus.forEach(d => {
      const { code: codes } = d;
      const statusValue = this.state.dpState[codes];
      const suffix = codes.replace(/^relay_status/, '');
      const powerCode = `switch${suffix}`;
      const name = Strings.getDpLang(powerCode);
      // @ts-ignore
      const txt = Strings.formatValue('statusValue', name, Strings.getDpLang(codes, statusValue));
      singleSwitch.push(txt);
    });
    if (isRelyStatu && this.relayStatus.length > 1) {
      const states = TYDevice.getState();
      const statusArr = _pick(
        states,
        this.relayStatus.map((d: { [key: string]: any }) => d.code)
      );
      const isAll = Array.from(new Set(Object.values(statusArr))).length === 1;
      // @ts-ignore
      const allStatusString = Strings.formatValue('allStatus', Strings.getDpLang(code, value));
      str = isAll ? allStatusString : singleSwitch.join(',');
    } else {
      str = Strings.getDpLang(code, value);
    }
    return str;
  };

  dpState: DpState;
  relayStatus: any;

  _handleItemValueChange = (code: string, value: boolean | number | string) => {
    TYDevice.putDeviceData({ [code]: !value });
  };

  renderItem = ({ item }: any) => {
    const { title, value, onPress } = item;
    return (
      <TouchableOpacity onPress={onPress} style={styles.enumStyle}>
        <TYText style={styles.title} numberOfLines={2}>
          {title}
        </TYText>
        <View style={styles.rightContent}>
          <TYText style={styles.value} numberOfLines={1}>
            {value}
          </TYText>
          <IconFont name="arrow" size={cx(12)} color="rgba(51,51,51,.5)" />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const sections = this.sections.filter(v => v.data.length > 0);
    return (
      <View style={styles.content}>
        <TYSectionList
          sections={sections}
          keyExtractor={(item: any, index: number) => `${index}`}
          contentContainerStyle={{ paddingTop: 0 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cancelTextStyle: {
    backgroundColor: 'transparent',
    color: '#666666',
    fontSize: 16,
  },
  content: {
    backgroundColor: '#F8F8F8',
    flex: 1,
    paddingTop: 12,
  },
  enumStyle: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    minHeight: 48,
    paddingHorizontal: cx(16),
    width: cx(375),
  },
  rightContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: '#333333',
    fontSize: 16,
  },
  titleTextStyle: {
    backgroundColor: 'transparent',
    color: '#999999',
    fontSize: 14,
  },
  value: {
    backgroundColor: 'transparent',
    color: 'rgba(51,51,51,.5)',
    fontSize: 14,
    marginRight: cx(4),
    maxWidth: cx(207),
  },
});
