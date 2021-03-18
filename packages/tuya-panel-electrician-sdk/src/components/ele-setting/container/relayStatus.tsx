/* eslint-disable @typescript-eslint/ban-ts-comment */
import _ from 'lodash';
import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet, FlatList } from 'react-native';
import { Utils, TYText, IconFont, TYSdk, Popup } from 'tuya-panel-kit';
import Strings from '../i18n';
import { RelayProps, RelayState, _filter, DpState } from './index.type';

const TYDevice = TYSdk.device;

const { convertX: cx } = Utils.RatioUtils;
const selectedPath =
  'M288.67 521.63l18.69-25.26a5.217 5.217 0 0 1 7.29-1.09c0.02 0.01 0.04 0.03 0.06 0.04l113.01 86.01a5.216 5.216 0 0 0 6.48-0.13l275.9-228.25a5.22 5.22 0 0 1 6.97 0.29l17.32 16.98a5.212 5.212 0 0 1 0.07 7.37l-0.08 0.08-299.65 292.84a5.221 5.221 0 0 1-7.37-0.08l-0.01-0.01-138.22-142.06a5.206 5.206 0 0 1-0.46-6.73z';

export default class RelayStatus extends Component<RelayProps, RelayState> {
  static defaultProps = {
    themeColor: '#272929',
  };

  constructor(props: RelayProps) {
    super(props);
    this.dpState = TYDevice.getState();
    const schema = TYDevice.getDpSchema();
    this.status = _.filter(schema, (d: any) => /^relay_status/.test(d.code));
    this.sigleStatus = _filter(schema);
    this.allControlExist = false;
    this.status.forEach((d: any) => {
      if (d.code === 'relay_status') {
        this.allControlExist = true;
      }
    });
    const statusArr = _.pick(
      this.dpState,
      this.status.map((d: any) => d.code)
    );
    const isAll = Array.from(new Set(Object.values(statusArr))).length === 1;
    this.state = {
      select: isAll && this.allControlExist ? 0 : 1,
    };
  }

  get selectData() {
    return [
      {
        key: 'all',
        title: Strings.getLang('allSwitchs'),
        onPress: () => this._handlToSetStatus('relay_status', 0),
      },
      {
        key: 'single',
        title: Strings.getLang('singleSwitchs'),
        onPress: () => this.setState({ select: 1 }),
      },
    ];
  }

  status: any;
  allControlExist: boolean;
  sigleStatus: any;
  dpState: DpState;

  _handlToSetStatus = (cd: string, idx: number) => {
    const { themeColor } = this.props;
    const { range: rangeValue } = TYDevice.getDpSchema(cd);
    const value = this.dpState[cd];
    this.setState({
      select: idx,
    });
    const dataSource = rangeValue.map((item: string) => ({
      key: item,
      title: Strings.getDpLang(cd, item),
      value: item,
    }));
    const options = {
      cancelText: Strings.getLang('cancel'),
      confirmText: Strings.getLang('sure'),
      motionType: 'PullUp',
      titleTextStyle: styles.titleTextStyle,
      cancelTextStyle: styles.cancelTextStyle,
    };
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
      onSelect: (data: string | number) => {
        TYDevice.putDeviceData({
          [cd]: data,
        });
        Popup.close();
      },
    });
  };

  selectRenderItem = ({ item, index }: { item: any; index: number }) => {
    const { onPress, title } = item;
    const { select } = this.state;
    const { themeColor } = this.props;
    const isSelect = select === index;
    return (
      <TouchableOpacity style={styles.itemContent} onPress={onPress}>
        <View
          style={[
            styles.items,
            {
              borderBottomWidth: index === 0 ? StyleSheet.hairlineWidth : 0,
            },
          ]}
        >
          <View
            style={[
              styles.btn,
              {
                borderColor: isSelect ? themeColor : '#E5E5E5',
                backgroundColor: isSelect ? themeColor : 'transparent',
              },
            ]}
          >
            {isSelect && <IconFont d={selectedPath} size={cx(28)} color="#FFFFFF" />}
          </View>
          <TYText style={styles.title} numberOfLines={1}>
            {title}
          </TYText>
        </View>
      </TouchableOpacity>
    );
  };

  renderItem = ({ item }: any) => {
    const { code } = item;
    const value = this.dpState[code];
    const suffix = code.replace(/^relay_status/, '');
    const powerCode = `switch${suffix}`;
    const name = Strings.getDpLang(powerCode);
    return (
      <TouchableOpacity
        style={[
          styles.codeItem,
          {
            paddingLeft: this.allControlExist ? cx(41) : cx(16),
          },
        ]}
        onPress={() => this._handlToSetStatus(code, 1)}
      >
        <TYText style={[styles.title, { maxWidth: cx(155) }]} numberOfLines={1}>
          {name}
        </TYText>
        <View style={styles.rightContent}>
          <TYText style={[styles.value, { maxWidth: cx(143) }]} numberOfLines={1}>
            {/* @ts-ignore */}
            {Strings.getDpLang(code, value)}
          </TYText>
          <IconFont name="arrow" color="rgba(51,51,51,.5)" size={cx(12)} />
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const { select } = this.state;
    return (
      <View style={styles.content}>
        {this.allControlExist && (
          <View style={{ width: cx(375), height: 96 }}>
            <FlatList data={this.selectData} renderItem={this.selectRenderItem} />
          </View>
        )}
        {select === 1 && (
          <FlatList
            data={this.sigleStatus}
            keyExtractor={(item: any) => item.code}
            extraData={this.props}
            renderItem={this.renderItem}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    borderRadius: cx(9),
    borderWidth: cx(1),
    height: cx(18),
    justifyContent: 'center',
    marginRight: cx(8),
    width: cx(18),
  },
  cancelTextStyle: {
    backgroundColor: 'transparent',
    color: '#666666',
    fontSize: 16,
  },
  codeItem: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flex: 1,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'space-between',
    paddingLeft: cx(41),
    paddingRight: cx(16),
    width: cx(375),
  },
  content: {
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 12,
  },
  itemContent: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    height: 48,
    justifyContent: 'center',
    paddingLeft: cx(15),
    width: cx(375),
  },
  items: {
    alignItems: 'center',
    borderBottomColor: 'rgba(51, 51, 51, 0.1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    height: 48,
    justifyContent: 'flex-start',
    width: cx(360),
  },
  rightContent: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    fontSize: cx(14),
    marginRight: cx(4),
  },
});
