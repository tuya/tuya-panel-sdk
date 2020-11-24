# SettingsSectionList 设置页列表

通常用于设置列表，对 TYSectionList 二次封装

- 优点：
  - 保持与 TYSectionList 用法一直
  - 支持不展示某项列表
  - 自动根据 dp 点是否存在展示该设置项
  - 可根据 dp 点类型提供默认的 onPress（目前支持 enum、bool 类型）

## Props API

继承自`TYSectionList.Item`

``` ts
interface ISettingsViewItem {
  dpCode?: string;
  title?: string;
  visible?: boolean;
  value?: any;
  arrow?: boolean;
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

```

## 代码演示

``` jsx
import React, { Component } from 'react';
import { TYSdk } from '@tuya-rn/tuya-native-components';

import { SettingsSectionList } from '@tuya-rn/tuya-native-robot-elements';

import { DPCodes } from '../configs';
import Strings from '../i18n';

class SettingsLayout extends Component {
  static propTypes = {
    dpState: PropTypes.object,
  };
  static defaultProps = {
    dpState: {},
  };

  get sections() {
    const { dpState } = this.props;
    const data = [
      {
        title: Strings.getLang('functionSetting'),
        data: [
          {
            key: 'water',
            dpCode: DPCodes.water,
            title: Strings.getDpLang(DPCodes.water),
            value: dpState[DPCodes.water],
          },
          {
            key: 'dust_collection',
            dpCode: DPCodes.dustCollection,
            title: Strings.getDpLang(DPCodes.dustCollection),
            onPress: () => {
             // do...
            },
            visible: false,
          },

        ],
      },
      {
        title: Strings.getLang('commonSetting'),
        data: [
          {
            key: 'autoBoost',
            dpCode: DPCodes.autoBoost,
            title: Strings.getDpLang(DPCodes.autoBoost),
            value: dpState[DPCodes.autoBoost],
          },
          {
            key: 'common',
            title: 'common',
          }
        ],
        visible: false,
      }
    ];

    return data;
  }

  render() {
    return (
      <View style={styles.container}>
        <SettingsSectionList sections={this.sections} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(248,248,248)',
    paddingTop: 15,
  },
});

```


