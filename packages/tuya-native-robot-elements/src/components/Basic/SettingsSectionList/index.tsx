import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { TYSdk, I18N } from '@tuya-rn/tuya-native-components';
// import { Popup } from '@tuya-rn/tuya-native-elements';
import _isUndefined from 'lodash/isUndefined';

const i18n = new I18N();

enum SettingsItemOnPressType {
  enum = 'enum', // 弹层枚举选择列表
  bool = 'bool', // 开关
  range = 'value', // 范围值， min到max
}

interface ISettingsViewItem {
  dpCode?: string;
  title?: string;
  visible?: boolean;
  value?: any;
  arrow?: boolean;
  onPressType?: SettingsItemOnPressType;
  onPress?: () => any;
  onValueChange?: (value: boolean) => any;
}

interface ISettingsViewList {
  title: string | null;
  data: ISettingsViewItem[];
  visible?: boolean;
}

interface ISettingsViewProps {
  sections: ISettingsViewList[];
}

interface ISettingsViewState {}

export default class SettingsView extends PureComponent<ISettingsViewProps, ISettingsViewState> {
  static propTypes = {
    // ...TYSectionList.propTypes,
    sections: PropTypes.array.isRequired,
  };

  onSelectListEnumPopup = (dpCode: string, curValue: any) => {
    const { range = [] } = TYSdk.device.getDpSchema(dpCode) || {};
    const dataSource = range.map((value: string) => ({
      key: value,
      title: i18n.getDpLang(dpCode, value),
      value,
    }));
    const Popup = require('@tuya-rn/tuya-native-elements').Popup;
    Popup.list({
      dataSource,
      title: i18n.getDpLang(dpCode),
      value: curValue,
      type: 'radio',
      footer: () => {},
      onSelect: (v: string) => {
        TYSdk.device.putDeviceData({ [dpCode]: v });
        Popup.close();
      },
    });
  };

  onSelectRangePopup = (dpCode: string, curValue: any) => {
    const { min = 0, max = 10 } = TYSdk.device.getDpSchema(dpCode) || {};
    const dataSource = [];
    for (let i = min; i < max; i++) {
      dataSource.push({
        key: `${i}`,
        label: `${i}`,
        value: i,
      });
    }
    // const dataSource = range.map((value: string) => ({
    //   key: value,
    //   title: i18n.getDpLang(dpCode, value),
    //   value,
    // }));
    const Popup = require('@tuya-rn/tuya-native-elements').Popup;
    Popup.picker({
      dataSource,
      title: i18n.getDpLang(dpCode),
      value: curValue,
      cancelText: i18n.getLang('cancel'),
      confirmText: i18n.getLang('confirm'),
      // footer: () => {},
      type: 'radio',
      onConfirm: (v: string) => {
        TYSdk.device.putDeviceData({ [dpCode]: v });
        Popup.close();
      },
    });
  };

  onToggleSwitch = (dpCode: string, value: boolean) => {
    TYSdk.device.putDeviceData({ [dpCode]: value });
  };

  getDpItem = (item: ISettingsViewItem): ISettingsViewItem => {
    const { dpCode = '', value } = item;
    const { type } = TYSdk.device.getDpSchema(dpCode) || {};
    const curItem = { ...item };

    switch (type) {
      case SettingsItemOnPressType.bool:
        curItem.onValueChange = (curValue: boolean) => this.onToggleSwitch(dpCode, curValue);
        break;

      case SettingsItemOnPressType.enum:
        curItem.onPress = () => this.onSelectListEnumPopup(dpCode, value);
        curItem.value = i18n.getDpLang(dpCode, value);
        curItem.arrow = true;
        break;

      case SettingsItemOnPressType.range:
        curItem.onPress = () => this.onSelectRangePopup(dpCode, value);
        curItem.value = `${value}`;
        curItem.arrow = true;
        break;
        
      default:
        break;
    }
    return curItem;
  };

  get sections() {
    const { sections } = this.props;
    if (!sections || !sections.length) return [];
    return sections
      .map(({ title, data, visible }) => {
        const curData = data
          .filter(item => {
            const { visible, dpCode } = item;

            if (!_isUndefined(visible) && !visible) return false;
            if (!_isUndefined(dpCode) && !TYSdk.device.checkDpExist(dpCode)) return false; // 检查dpcode是否存在

            return true;
          })
          .map(item => {
            const { onPress, dpCode } = item;
            if (dpCode && !onPress) return this.getDpItem(item); // 生成dpcode对应type的onPress
            return {
              arrow: true,
              ...item,
            };
          });
        return {
          title,
          visible,
          data: curData,
        };
      })
      .filter((data: ISettingsViewList) => {
        if (!_isUndefined(data.visible) && !data.visible) return false;
        return true;
      });
  }
  render() {
    const TYSectionList = require('@tuya-rn/tuya-native-components').TYSectionList;
    return (
      <View style={styles.root}>
        <TYSectionList {...this.props} sections={this.sections} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  root: { flex: 1 },
});
