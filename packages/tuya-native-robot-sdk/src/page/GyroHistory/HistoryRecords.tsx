import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
  StatusBarStyle,
} from 'react-native';
import { TYSdk, Utils, Divider, TopBar } from '@tuya-rn/tuya-native-components';
import _debounce from 'lodash/debounce';
import Api from '../../api';
import Strings from '../../i18n';
import { Button } from './Button';
import Res from './res';

const themeMap = {
  default: 'light-content',
  light: 'default',
};

const { scaleNumber } = Utils.NumberUtils;
const {
  convertY: cy,
  convertX: cx,
  width,
  viewHeight,
  viewHeight: height,
  isIos,
  viewWidth,
} = Utils.RatioUtils;
const backIcon = isIos ? 'backIos' : 'backAndroid';
const pageSize = 50;

const BOTTOM_HEIGHT = cy(56);

interface HistoryRecordsProps {
  barTheme: 'default' | 'light';
  dpCodeMap: { cleanRecord: string; cleanArea: string; cleanTime: string; mapConfig?: string };
  historyMapRoute: string;
}

interface ItemRowData {
  logData: any;
  isSelected: boolean;
}

interface HistoryRecordsState {
  dataSource: ItemRowData[];
  refreshing: boolean;
  clearData: boolean;
  deleteSum: number;
}

const defaultCodeMap = {
  cleanRecord: 'clean_record',
  cleanArea: 'clean_area',
  cleanTime: 'clean_time',
  mapConfig: 'map_config',
};

export class HistoryRecords extends PureComponent<HistoryRecordsProps, HistoryRecordsState> {
  static defaultProps = {
    barTheme: 'default',
    dpCodeMap: defaultCodeMap,
    historyMapRoute: 'historyMap',
  };

  loadMore = _debounce(() => {
    if (this.hasNextPage) {
      this.getLogs();
    }
  }, 375);

  hasNextPage: boolean;
  data: ItemRowData[];
  offset: number;
  dpIdRecords: number;

  constructor(props: HistoryRecordsProps) {
    super(props);

    this.state = {
      dataSource: [],
      refreshing: false,
      clearData: false,
      deleteSum: 0,
    };

    this.data = [];
    this.hasNextPage = false;
    this.offset = 0;
    const { cleanRecord } = this.getDpCodeMap();
    this.dpIdRecords = parseInt(TYSdk.device.getDpIdByCode(cleanRecord), 10);
  }

  componentDidMount() {
    this.getLogs();
  }

  getDpCodeMap = () => {
    return {
      ...defaultCodeMap,
      ...this.props.dpCodeMap,
    };
  };

  onSelectPress(rowData: { isSelected: boolean; logData: any }) {
    let newDeleteSum = this.state.deleteSum;
    if (newDeleteSum > 99 && rowData.isSelected === false) {
      TYSdk.mobile.simpleTipDialog(Strings.getLang('limitTip'), () => {});
      return;
    }
    const i = this.data.indexOf(rowData);
    const newRowData = {
      logData: rowData.logData,
      isSelected: !rowData.isSelected,
    };
    if (newRowData.isSelected) {
      newDeleteSum += 1;
    } else {
      newDeleteSum -= 1;
    }
    this.data.splice(i, 1, newRowData);
    this.setState({
      deleteSum: newDeleteSum,
      dataSource: this.data,
    });
  }

  getLogs = () => {
    Api.getGyroMapHistoryList([this.dpIdRecords], this.offset, pageSize)
      .then((d: { datas: any[]; totalCount: number }) => {
        if (typeof d.datas === 'undefined' || d.datas.length === 0) {
          return;
        }
        const newData: ItemRowData[] = [...this.state.dataSource];
        d.datas.forEach((e: any) => {
          newData.push({
            logData: e,
            isSelected: false,
          });
        });

        this.setState({
          dataSource: newData,
        });
        this.data = [...newData];

        this.hasNextPage = this.offset < d.totalCount;
        if (this.hasNextPage) this.offset += pageSize;
      })
      .catch((e: Error) => {
        console.warn('e', e);
      });
  };

  selectAll = () => {
    let newDeleteSum = this.state.deleteSum;
    const isAllSelect = newDeleteSum === this.data.length;
    if (isAllSelect) {
      this.data = this.data.map(d => ({ ...d, isSelected: false }));
      this.setState({
        dataSource: this.data,
        deleteSum: 0,
      });
      return;
    }
    for (let i = 0; i < this.data.length; i++) {
      if (i > 99) {
        TYSdk.mobile.simpleTipDialog(
          `${Strings.getLang('limitTip')},${Strings.getLang('allSelectTip')}`,
          () => {}
        );
        break;
      }
      const newRowData = {
        logData: this.data[i].logData,
        isSelected: true,
      };
      if (!this.data[i].isSelected) {
        newDeleteSum += 1;
      }
      this.data.splice(i, 1, newRowData);
    }
    this.setState({
      dataSource: this.data,
      deleteSum: newDeleteSum,
    });
  };

  deleteOne = (uuid: string) => (callback: () => {}) => {
    Api.deleteLogs(uuid)
      .then(() => {
        for (let j = 0; j < this.data.length; j++) {
          if (this.data[j].logData.uuid === uuid) {
            this.data.splice(j, 1);
            break;
          }
        }
        this.setState({
          dataSource: [...this.data],
        });
        TYSdk.mobile.simpleTipDialog(Strings.getLang('deleteSuccessTip'), callback);
      })
      .catch((e: any) => {
        console.warn(e);
      });
  };

  deleteData = () => {
    let newDeleteSum = this.state.deleteSum;
    if (newDeleteSum <= 0) {
      return;
    }
    TYSdk.mobile.simpleConfirmDialog(
      '',
      Strings.getLang(newDeleteSum === 1 ? 'deleteTip' : 'deleteAllTip'),
      () => {
        let uuid = '';
        let i = 0;
        this.data.forEach(d => {
          if (i === 0 && d.isSelected) {
            uuid += d.logData.uuid;
            i += 1;
          } else if (d.isSelected) {
            uuid += ',';
            uuid += d.logData.uuid;
            i += 1;
          }
        });
        Api.deleteLogs(uuid).then(
          () => {
            for (let j = 0; j < this.data.length; j++) {
              if (this.data[j].isSelected) {
                this.data.splice(j--, 1);
                newDeleteSum -= 1;
              }
            }
            this.setState({
              dataSource: this.data,
              clearData: false,
            });
            TYSdk.mobile.simpleTipDialog(Strings.getLang('deleteSuccessTip'), () => {});
          },
          (e: any) => {
            console.log(e);
          }
        );
      },
      () => {}
    );
  };

  _onRowClicked(
    dayDate: any,
    timeDate: any,
    time: any,
    area: any,
    subRecordId: string | any[],
    item: { logData: { uuid: string } }
  ) {
    const { mapConfig, cleanTime: cleanTimeCode, cleanArea: cleanAreaCode } = this.getDpCodeMap();
    const isExist = mapConfig && TYSdk.device.checkDpExist(mapConfig);
    // if (!isExist || subRecordId.length !== 5) {
    //   return false;
    // }
    if (subRecordId.length !== 5) {
      return false;
    }
    const mapConfigValue =
      mapConfig && isExist ? TYSdk.device.getState<string>(TYSdk.device.getDpIdByCode(mapConfig)) : '';
    const { barTheme } = this.props;
    const barStyle = themeMap[barTheme] || themeMap.default;
    TYSdk.Navigator.push({
      id: this.props.historyMapRoute,
      dayDate,
      timeDate,
      cleanTime: time,
      cleanArea: area,
      subRecordId,
      mapConfig: mapConfigValue,
      item,
      deleteApi: this.deleteOne(item.logData.uuid),
      barStyle,
      cleanTimeCode,
      cleanAreaCode,
    });
  }

  renderRow = ({ item }: { item: ItemRowData }) => {
    const { cleanArea, cleanTime } = this.getDpCodeMap();

    const { logData, isSelected } = item;
    const { scale: timeScale = 0 } = TYSdk.device.getDpSchema(cleanTime) || {};
    const { scale: areaScale = 0 } = TYSdk.device.getDpSchema(cleanArea) || {};
    const value = logData.dps[0][this.dpIdRecords];
    let time = parseInt(value.substr(0, 3), 10);

    let area = parseInt(value.substr(3, 3), 10);
    let subRecordId = value.length > 6 ? `${value.substr(6, 5)}` : '';

    let date = Utils.TimeUtils.dateFormat('yyyy-MM-dd hh:mm', new Date(logData.gmtCreate));
    let dayDate = date.substr(0, 10);
    let timeDate = date.substr(11, 5);
    if (value.length > 11) {
      const year = value.substr(0, 4);
      const month = value.substr(4, 2);
      const day = value.substr(6, 2);
      const hour = value.substr(8, 2);
      const minute = value.substr(10, 2);
      dayDate = `${year}-${month}-${day}`;
      timeDate = `${hour}:${minute}`;
      date = `${dayDate} ${timeDate}`;
      time = +scaleNumber(timeScale, parseInt(value.substr(12, 3), 10));
      area = +scaleNumber(areaScale, parseInt(value.substr(15, 3), 10));
      subRecordId = value.substr(18, 5);
    }
    const img = isSelected ? Res.choose : Res.disChoose;
    const cleanStatus = Strings.getLang('cleanFail');
    return (
      <TouchableOpacity
        key={item.logData.uuid}
        style={styles.listItem}
        disabled={this.state.clearData}
        activeOpacity={1}
        onPress={this._onRowClicked.bind(this, dayDate, timeDate, time, area, subRecordId, item)}
      >
        {this.state.clearData && (
          <Button image={img} style={styles.image} onPress={this.onSelectPress.bind(this, item)} />
        )}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.listItemDate}>{date}</Text>
            <View style={[styles.cleanFail, area ? { opacity: 0 } : {}]}>
              <Text style={{ color: '#FF403F', fontSize: cx(10), fontWeight: '500' }}>
                {cleanStatus}
              </Text>
            </View>
          </View>
          <View style={styles.listItemBottom}>
            {this.renderRowItem('recordArea', area, cleanArea)}
            <Text style={styles.listItemTips}>|</Text>
            {this.renderRowItem('recordTime', time, cleanTime)}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderRowItem(title: any, value: any, code: string) {
    return (
      <Text style={styles.listItemTips}>
        {Strings.getLang(title)}
        {` ${value}`}
        {Strings.getDpLang(code, 'unit')}
      </Text>
    );
  }

  renderSeparator(_sectionID: any, rowID: any) {
    return (
      <Divider
        key={rowID}
        style={styles.line}
        width={width - cx(24)}
        height={Math.max(0.5, StyleSheet.hairlineWidth)}
        color="#E5EAF3"
      />
    );
  }

  renderEmpty() {
    return (
      <View style={styles.noData}>
        <Image source={Res.none} />
        <Text style={styles.empty}>{Strings.getLang('emptyRecords')}</Text>
      </View>
    );
  }

  handleHeaderBack = () => {
    if (!this.state.clearData) {
      TYSdk.Navigator.pop();
      return;
    }
    this.setState({
      clearData: false,
    });
  };

  handleHeaderDelete = () => {
    this.setState({
      clearData: !this.state.clearData,
    });
  };

  renderOldHeader = () => {
    const { barTheme } = this.props;
    const barStyle = themeMap[barTheme] || themeMap.default;
    const isDefaultTheme = barTheme === 'default';
    const title = this.state.clearData
      ? Strings.getLang('deleteRecords')
      : Strings.getLang('records');
    const deleteVisible = !!this.state.dataSource.length;
    const deleteIcon = this.state.clearData ? Res.deleteOff : Res.delete;
    return (
      <View>
        <StatusBar barStyle={barStyle as StatusBarStyle} />
        <TopBar
          alignCenter={true}
          textStyle={{ color: isDefaultTheme ? '#fff' : '#000', fontSize: 17 }}
          centerText={title}
          isLeftBack={true}
          leftText={this.state.clearData ? Strings.getLang('cancel') : ''}
          rightImage={
            this.state.dataSource.length
              ? this.state.clearData
                ? null
                : Res.delete
              : Res.deleteOff
          }
          // rightText={rightText}
          isRightMore={false}
          onChange={(tab: string) => {
            if (tab === 'right') {
              this.handleHeaderDelete();
            } else {
              this.handleHeaderBack();
            }
          }}
        />
      </View>
    );
  };

  renderNewHeader = () => {
    const { barTheme } = this.props;
    const barStyle = themeMap[barTheme] || themeMap.default;
    const isDefaultTheme = barTheme === 'default';
    const title = this.state.clearData
      ? Strings.getLang('deleteRecords')
      : Strings.getLang('records');
    const deleteVisible = !!this.state.dataSource.length;
    const deleteIcon = this.state.clearData ? Res.deleteOff : Res.delete;
    return (
      <View>
        <StatusBar barStyle={barStyle as StatusBarStyle} />
        <TopBar.Container>
          <TopBar.Action name={backIcon} onPress={this.handleHeaderBack} />
          <TopBar.Content
            title={title}
            titleStyle={{ color: isDefaultTheme ? '#fff' : '#000', fontSize: 17 }}
          />
          {deleteVisible && <TopBar.Action source={deleteIcon} onPress={this.handleHeaderDelete} />}
        </TopBar.Container>
      </View>
    );
  };

  renderHeader = () => {
    return !!TopBar.Action ? this.renderNewHeader() : this.renderOldHeader();
  };

  renderActionSheet = (visible: boolean) => {
    const chooseImg = this.state.deleteSum === this.data.length ? Res.choose : Res.disChoose;
    return (
      <View
        style={[styles.bottomContainer, { opacity: visible ? 1 : 0 }]}
        onStartShouldSetResponderCapture={() => !visible}
      >
        <Button
          style={styles.flex1Center}
          image={chooseImg}
          imageStyle={styles.image}
          text={Strings.getLang('allSelect')}
          textStyle={styles.textAllSelect}
          textDirection="right"
          onPress={this.selectAll}
        />

        <Button
          text={
            this.state.deleteSum
              ? Strings.formatValue('deleteNum', this.state.deleteSum)
              : Strings.getLang('delete')
          }
          textStyle={styles.textDelete}
          onPress={this.deleteData}
          disabled={this.state.deleteSum === 0}
          style={[
            styles.flex1Center,
            { backgroundColor: this.state.deleteSum === 0 ? '#90acf4' : '#4073FC' },
          ]}
        />
      </View>
    );
  };

  render() {
    const { refreshing } = this.state;
    const showBottom = this.state.clearData && this.data.length > 0;
    console.log('dataSource', this.state.dataSource);
    return (
      <View style={styles.flex1}>
        {this.renderHeader()}
        <View style={styles.content}>
          <FlatList
            style={styles.flex1}
            contentContainerStyle={[{ paddingTop: 24 }]}
            data={this.state.dataSource}
            keyExtractor={item => item.logData.uuid}
            renderItem={this.renderRow}
            onRefresh={this.loadMore}
            refreshing={refreshing}
            onEndReached={this.loadMore}
            onEndReachedThreshold={20}
            ItemSeparatorComponent={this.renderSeparator}
            ListEmptyComponent={this.renderEmpty}
            initialNumToRender={10}
          />
          {this.renderActionSheet(showBottom)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  flex1Center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  list: {
    flexGrow: 0,
    height: height - TopBar.TopBarHeight,
  },

  empty: {
    fontSize: cx(14),
    color: '#999',
    textAlign: 'center',
    marginTop: cy(12),
  },

  listItem: {
    height: 80,
    paddingLeft: cx(16),
    paddingRight: cx(16),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  listItemDate: {
    color: '#666',
    fontSize: cx(16),
  },

  listItemBottom: {
    marginTop: cy(6),
    flexDirection: 'row',
  },

  listItemTips: {
    color: '#999',
    fontSize: cx(12),
    marginRight: cx(10),
  },

  line: {
    marginLeft: cx(24),
  },

  image: {
    marginRight: cx(20),
  },

  bottomContainer: {
    height: BOTTOM_HEIGHT,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  cleanFail: {
    paddingVertical: 4,
    paddingHorizontal: cx(4),
    backgroundColor: 'rgba(255,64,63,0.1)',
    marginLeft: cx(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textAllSelect: {
    fontSize: cx(16),
    color: '#4073FC',
  },

  textDelete: {
    fontSize: cx(16),
    color: '#fff',
  },
  bottomRight: {
    height: BOTTOM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 2,
  },
  noData: {
    // flex: 1,
    width: viewWidth,
    height: viewHeight - 24 - BOTTOM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
