import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Text, SectionList, InteractionManager } from 'react-native';
import { Utils, Divider, TYSectionList, TYSdk } from '@tuya-rn/tuya-native-components';

import Strings from '../../i18n';
import { ItemCell } from './components';
import HocSwipeOut from './hoc/hoc-swipeout-cell';

const { convertY: cy, convertX: cx, viewWidth } = Utils.RatioUtils;
const SwipeoutItem = HocSwipeOut(ItemCell);

interface IProps {
  cleanTimeTitle: string;
  cleanAreaTitle: string;
  cleanTimeUnit: string;
  cleanAreaUnit: string;
  renderCellItem: (props?: any) => Component; // 自定义render项目
  mapRouteId: string; // 路由id
  is12Hours: boolean;
  recordStore: any;
}

// 扫地机清扫记录
export default class RecordsScene extends Component<IProps> {
  static defaultProps = {
    renderCellItem: undefined,
    mapRouteId: 'mapHistory',
    recordStore: null,
    is12Hours: true,
  };

  state = {
    dataSource: [],
    totalCount: 0,
    refreshing: false,
  };

  componentDidMount() {
    let time: number;
    time = setTimeout(() => {
      this.getRecord();
      time && clearInterval(time);
    }, 500);
    // InteractionManager.runAfterInteractions(() => {
    // TYSdk.mobile.showLoading();

    // });
  }

  updateData = () => {
    const { recordStore } = this.props;
    if (!recordStore) return;
    const { logData, sectionListData, totalCount } = recordStore.getStore();

    this.setState({
      dataSource: sectionListData,
      totalCount,
    });
  };

  getRecord = async () => {
    const { recordStore } = this.props;
    if (!recordStore) return;
    try {
      await recordStore.fetch();
      this.updateData();
    } catch (e) {
      console.log('e???', e);
    }
  };

  loadMore = () => {
    const { recordStore } = this.props;
    if (!recordStore) return;
    const { hasNextPage, isRequesting } = recordStore.getStatus();

    if (hasNextPage && !isRequesting) {
      this.getRecord();
    }
  };

  onRefresh = () => {
    const { recordStore } = this.props;
    if (!recordStore) return;
    recordStore.init();
    const { isRequesting } = recordStore.getStatus();

    if (!isRequesting) {
      this.getRecord();
    }
  };

  renderItem = (params = {}) => {
    
    const { recordStore, renderCellItem } = this.props;
    if (!recordStore) return;

    const { index, item } = params;
    // const parseItem = recordStore.parseOneRecord(item);

    // if (!parseItem) return null;

    const prop = {
      cleanTimeTitle: this.props.cleanTimeTitle,
      cleanAreaTitle: this.props.cleanAreaTitle,
      cleanTimeUnit: this.props.cleanTimeUnit,
      cleanAreaUnit: this.props.cleanAreaUnit,
      item: item,
      is12Hours: this.props.is12Hours,
      mapRouteId: this.props.mapRouteId,
    };
    if (renderCellItem) {
      return renderCellItem({ ...prop, ...params });
    }
    return (
      <SwipeoutItem
        key={`swipeout-${index}`}
        onItemDeletePress={async () => {
          try {
            await recordStore.deleteRecordById(item.id);
            this.updateData();
          } catch(e) {
            if (e && e.message) {
              TYSdk.mobile.simpleTipDialog(e.message, () => {});
            }
          }
          
        }}
        {...params}
        {...prop}
      />
    );
  };

  // renderSeparator(sectionID, rowID) {
  //   return (
  //     <Divider
  //       key={rowID}
  //       style={styles.line}
  //       width={viewWidth}
  //       height={cy(0.5)}
  //       color="rgba(0,0,0,0.3)"
  //     />
  //   );
  // }

  renderEmpty() {
    return <Text style={styles.empty}>{Strings.getLang('noRecords')}</Text>;
  }

  // renderSectionHeader = ({ section: { title } }) => (
  //   <View>
  //     <Text style={styles.sectionHeader}>{title}</Text>
  //     {this.renderSeparator()}
  //   </View>
  // );

  render() {
    const { refreshing } = this.state;
    // console.warn('this.state.dataSource',this.state.dataSource);
    
    return (
      <View style={styles.container}>
        <TYSectionList
          style={styles.list}
          renderItem={this.renderItem}
          // renderSectionHeader={this.renderSectionHeader}
          ListEmptyComponent={this.renderEmpty}
          // ItemSeparatorComponent={this.renderSeparator}
          // renderSectionFooter={this.renderSeparator}
          sections={this.state.dataSource}
          // onRefresh={this.onRefresh}
          // refreshing={refreshing}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.5}
          // initialNumToRender={10}
          keyExtractor={(item, index) => JSON.stringify(item)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  list: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },

  empty: {
    fontSize: cx(20),
    color: '#303030',
    textAlign: 'center',
    marginTop: cy(16),
  },

  line: {
    marginLeft: cx(44),
  },

  itemContainer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: viewWidth,
    paddingHorizontal: cx(20),
    paddingVertical: cy(30),
  },

  textTitle: {
    fontSize: cx(10),
    color: 'rgba(255,255,255, 0.8)',
    marginTop: cy(6),
    backgroundColor: 'transparent',
  },

  textHour12: {
    color: '#4D4D4D',
    fontSize: cx(20),
    fontWeight: 'bold',
  },

  textUnit: {
    fontSize: cx(10),
    color: 'rgba(255,255,255, 1)',
    marginTop: cy(2),
    marginLeft: cx(-3),
    backgroundColor: 'transparent',
  },

  valueContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  sectionHeader: {
    color: '#A2A3AA',
    fontSize: 14,
    paddingLeft: 20,
    paddingVertical: 10,
    width: viewWidth,
  },
});
