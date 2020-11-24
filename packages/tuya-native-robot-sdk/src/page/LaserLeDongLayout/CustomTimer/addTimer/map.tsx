import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';
import {
  TYSdk,
  Utils,
  TYText,
  SwitchButton,
  TYFlatList,
  IconFont,
} from '@tuya-rn/tuya-native-components';

import _isString from 'lodash/isString';

import LaserSweepMapLeDong from '../../../../map/LaserMap/LaserSweepMapLeDong';
import panelMapConfig, {
  ILaserMapPanelConfig,
} from '../../../../map/LaserMap/LaserSweepMapLeDong/constant/panelMapConfig';
import LaserUIApi, { nativeMapStatusEnum } from '../../../../api/laserUIApi';
// import I18n from '@i18n';
import I18n from '../i18n';

import { StyledCell, StyledTitle, StyledSubTitle } from './style';

const { convertY: cy, convertX: cx, width, height, iPhoneX } = Utils.RatioUtils;

const checkIconPath =
  'M288.67 374.37l18.69 25.26a5.217 5.217 0 0 0 7.29 1.09c0.02-0.01 0.04-0.03 0.06-0.04l113.01-86.01a5.216 5.216 0 0 1 6.48 0.13l275.9 228.25a5.22 5.22 0 0 0 6.97-0.29l17.32-16.98a5.212 5.212 0 0 0 0.07-7.37l-0.08-0.08-299.65-292.84a5.221 5.221 0 0 0-7.37 0.08l-0.01 0.01-138.22 142.06a5.206 5.206 0 0 0-0.46 6.73z';

interface IProps {
  laserMapConfig: ILaserMapPanelConfig;
  disabled: boolean;
  selectTags: string[];
  mode: 'selectedRoom' | 'smart';
}

export default class MapPartition extends Component<IProps> {
  static defaultProps = {
    laserMapConfig: panelMapConfig,
    disabled: false,
    selectTags: [],
    mode: 'smart',
  };

  state = {
    mapId: '',
    disabled: this.props.disabled,
    mode: this.props.mode,
    mapRoomData: new Map(),
  };

  get data() {
    return [
      {
        value: 'smart',
        title: I18n.getLang(`smart`),
      },
      {
        value: 'selectedRoom',
        title: I18n.getLang(`selectedRoom`),
        subTitle: I18n.getLang(`selectedRoom_subTitle`),
      },
    ];
  }

  componentDidMount() {
    LaserSweepMapLeDong.mapStoreObservable$.subscribe(value => {
      const { mapRoomData } = value;
      this.setState({
        mapRoomData: new Map(mapRoomData),
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== this.state.disabled) {
      this.setState({ disabled: nextProps.disabled });
    }
  }

  onMapId = ({ mapId }: { mapId: string }) => {
    LaserUIApi.setLaserMapStateAndEdit({
      mapId,
      state: nativeMapStatusEnum.mapSelect,
      edit: true,
    }).then(() => {
      this.setState({ mapId });
    });
  };

  getValue = async () => {
    const { mapId, mode } = this.state;

    const { data = [] } = await LaserUIApi.getLaserMapPointsInfo({
      mapId: mapId,
    });

    if (!data.length) {
      return {
        mode: 'smart',
        roomTags: [],
      };
    }
    const roomTags: string[] = [];
    data
      .sort((pre, cur) => {
        // 如果返回有排序
        if (typeof pre.order === 'number' && typeof cur.order === 'number') {
          return pre.order - cur.order;
        }
        return 0;
      })
      .forEach(item => {
        const { extend } = item;
        if (extend) {
          extend.tag && roomTags.push(`${extend.tag}`);
        }
      });
    // const roomIds = data.map(item => Number(item.pixel));
    return {
      mode,
      roomTags,
    };
  };

  render() {
    const { disabled, mapRoomData } = this.state;
    const { laserMapConfig, selectTags } = this.props;

    const roomStateList = [];

    mapRoomData.forEach((value, key) => {
      if (value) {
        const { id, tag, water, fan, valueOrder, name } = value;
        // const active = selectTags.includes(tag);
        const order = selectTags.indexOf(tag) + 1; // 没有的情况下+1后为0
        const active = !!order;
        roomStateList.push({
          id, // id
          active, // 是否选定
          name, // 名称
          water, // 水箱
          fan, // 吸力
          order, // 顺序
          tag, // 标签
        });
      }
    });

    const uiInterFace = {
      isEdit: false,
      isShowAppoint: false,
      isShowSweepArea: false,
      isShowForbiddenSweepArea: false, // 是否显示禁扫区域
      isShowForbiddenMopArea: false, // 是否显示禁拖区域
      isShowForbiddenWall: false, // 是否显示虚拟墙
      isShowSweepPath: false,
      isShowRoomOrder: true,
      isStatic: true,
      bitmapColorType: 'gray',
      mapDisplayMode: 'splitMap',
      // roomStateList: selectTags.map(tag => ({ tag, active: true })),
      roomStateList: roomStateList,
    };
    return (
      <View style={styles.container}>
        <View
          style={[styles.mapContainer, disabled && { opacity: 0.5 }]}
          pointerEvents={disabled ? 'none' : 'auto'}
        >
          <LaserSweepMapLeDong
            uiInterFace={uiInterFace}
            config={laserMapConfig}
            mapDisplayMode="splitMap"
            onMapId={this.onMapId}
          />
          {/* {disabled && <View style={styles.mask} ></View>} */}
        </View>
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <TYFlatList
            contentContainerStyle={{
              marginTop: cx(16),
              backgroundColor: '#f8f8f8',
            }}
            scrollEnabled={false}
            data={this.data}
            keyExtractor={(item: any) => item.value}
            extraData={this.state.selected}
            renderItem={({ item, index }: { item: any; index: number }) => {
              const inUnSelect = item.value !== this.state.mode;
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  accessibilityLabel={`Timer_Repeat_Row${index}`}
                  onPress={() => {
                    this.setState({ disabled: item.value === 'smart', mode: item.value });
                  }}
                >
                  <StyledCell style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                      <StyledTitle size={cx(16)}>{item.title}</StyledTitle>
                      {item.subTitle && (
                        <StyledSubTitle
                          style={{ textAlign: 'left', marginTop: 6, fontSize: cx(14) }}
                        >
                          {item.subTitle}
                        </StyledSubTitle>
                      )}
                    </View>

                    <IconFont
                      style={[inUnSelect && { opacity: 0 }]}
                      d={checkIconPath}
                      color={'#44DB5E'}
                      size={28}
                      useART={true}
                    />
                  </StyledCell>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#f8f8f8',
    // marginTop: cy(15),
  },

  mapContainer: {
    flex: 1,
    justifyContent: 'center',
    // position: 'absolute',
    backgroundColor: 'transparent',
    width,
    height: cy(255),
  },

  mask: {
    position: 'absolute',
    width,
    height: cy(255),
  },

  main: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: cx(20),
  },

  text: {
    fontSize: cx(12),
    color: 'rgba(255,255,255, 0.8)',
  },
});
