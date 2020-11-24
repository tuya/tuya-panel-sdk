import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Utils, TopBar, TYSdk, Button } from '@tuya-rn/tuya-native-components';

import Strings from '../../i18n';

import RecordsScene from './RecordsScene';
import HocSelectCell from './hoc/hoc-select-cell';
import { ItemCell } from './components';
// import { StyledDeleteButton, StyledSelectAllButton, StyledTopBar } from './styled';

const {
  RatioUtils: { viewWidth, convertY: cy, convertX: cx },
} = Utils;

const BOTTOM_HEIGHT = cy(50);
const SelectCell = HocSelectCell(ItemCell);

const default_theme = {
  topBar: { color: '#fff' },
  selectAllButton: null,
  deleteButton: null,
};

interface ITheme {
  topBar: any;
  selectAllButton: any;
  deleteButton: any;
}

interface IProps {
  renderCellItem: (props?: any) => Component; // 自定义render项目
  mapRouteId: string; // 路由id
  recordStore: any;
  title: string;
  theme: ITheme;
  is12Hours: false,
}

export default class MultiSelectList extends Component<IProps> {
  static defaultProps = {
    renderCellItem: undefined,
    mapRouteId: 'mapHistory',
    recordStore: null,
    title: '',
    theme: default_theme,
    is12Hours: true,
  };

  state = {
    showSelect: false,
    selectData: new Map([]), // 选中的项目数据, 存储格式：index => item
  };

  /** 是否展示多选框 */
  handleShowSelectToggle = () => {
    this.setState({
      showSelect: !this.state.showSelect,
    });
  };

  /** 选定/取消 */
  handleItemPress = ({ name, item, selected }) => {
    this.setState(({ selectData }) => {
      const nextSelectData = new Map(selectData);

      if (nextSelectData.has(name)) nextSelectData.delete(name);
      else nextSelectData.set(name, item);

      return { selectData: nextSelectData };
    });
  };

  /** 选择全部 */
  handleSelectAll = () => {
    const { recordStore } = this.props;
    if (!recordStore) return;

    const { sectionListData } = recordStore.getStore();
    if (!sectionListData.length) return;

    this.setState(({ selectData }) => {
      const nextSelectData = new Map(selectData);

      sectionListData.forEach((item: IRecordSectionList) => {
        const { title, data } = item;
        data.forEach((cell, index) => {
          const name = `${title}_${index}`;
          nextSelectData.set(name, cell);
        });
      });
      return { selectData: nextSelectData };
    });
  };

  /** 删除清扫记录 */
  handleDeleteData = async () => {
    const { recordStore } = this.props;
    if (!recordStore) return;

    const { selectData } = this.state;
    if (!selectData.size) return;

    const ids = [];
    const items = selectData.values();
    for (const item of items) {
      if (item.id) ids.push(item.id);
    }
    try {
      await recordStore.deleteRecordByIds(ids);
      selectData.clear();
      if (this.recordsSceneInstance) this.recordsSceneInstance.updateData();
    } catch (e) {
      console.log('eeeeee?????', e);
      if (e.message) TYSdk.mobile.simpleTipDialog(e.message, () => {});
    }
  };

  get selectTips() {
    return this.state.showSelect ? Strings.getLang('cancelDelete') : Strings.getLang('clearData');
  }

  /** 渲染item */
  renderItem = prop => {
    const {
      index,
      section: { title },
      item,
    } = prop;

    const name = `${title}_${index}`;

    return (
      <SelectCell
        onItemPress={() => this.handleItemPress({ name, item })}
        showSelectedView={this.state.showSelect}
        selected={this.state.selectData.has(name)}
        is12Hours={this.props.is12Hours}
        {...prop}
      />
    );
  };

  render() {
    const { title, theme } = this.props;
    const { showSelect } = this.state;
    const selectAction = {
      style: {
        width: Math.round(viewWidth / 3),
        flexDirection: 'row-reverse',
        justifyContent: 'flex-start',
        marginRight: 5,
      },
      source: this.selectTips,
      onPress: () => this.handleShowSelectToggle(),
    };

    return (
      <View style={styles.root}>
        <TopBar
          title={title}
          color={theme.topBar.color}
          // theme={theme.topbar}
          onBack={TYSdk.Navigator.pop}
          actions={[selectAction]}
        />
        <View style={[styles.sceneContain, showSelect && { marginBottom: BOTTOM_HEIGHT }]}>
          <RecordsScene
            {...this.props}
            ref={ref => (this.recordsSceneInstance = ref)}
            renderCellItem={this.renderItem.bind(this)}
          />
        </View>
        {showSelect && (
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={this.handleSelectAll.bind(this)}>
              <Text style={styles.textAllSelect}>{Strings.getLang('allSelect')}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleDeleteData}>
              <Text style={styles.textDelete}>{Strings.getLang('delete')}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  sceneContain: {
    flex: 1,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    height: BOTTOM_HEIGHT,
    width: viewWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: cx(16),
  },

  textAllSelect: {
    fontSize: cx(16),
    color: '#4073FC',
  },

  textDelete: {
    fontSize: cx(16),
    color: '#FF1000',
  },
});
