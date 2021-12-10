import React, { FC, useEffect, useState, useMemo } from 'react';
import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { TYText, Utils, DevInfo, TYSdk } from 'tuya-panel-kit';
import Strings from './i18n';
import styles from './style';
import { SelectDeviceProps } from './interface';
import Res from '../../res';
import { getOnlineState } from '../../utils';

const { convertX: cx } = Utils.RatioUtils;

const SelectDevice: FC<SelectDeviceProps> = ({
  activeOpacity,
  dataSource,
  selectLimit,
  containerStyle,
  tipContainerStyle,
  tipText,
  tipTextStyle,
  offlineText,
  offlineTextStyle,
  selectAllText,
  selectAllTextStyle,
  listStyle,
  activedTintColor,
  disabledTintColor,
  normalTintColor,
  ListEmptyComponent,
  onSelectChange,
  renderOfflineState: customRenderOfflineState,
}) => {
  const [selectedList, setSelectedList] = useState([]);

  const [roomInfo, setRoomInfo] = useState({});

  useEffect(() => {
    getRoomInfo();
  }, []);

  // 如果进度最大值由大变小，要删掉部分设备
  useEffect(() => {
    if (selectLimit > selectedList.length) {
      setSelectedList(selectedList.slice(0, selectLimit));
    }
  }, [selectLimit]);

  const deviceList = useMemo(() => {
    return dataSource.map(d => ({ selected: selectedList.includes(d.devId), ...d }));
  }, [dataSource, selectedList]);

  // 已选设备数量是否已达到上限
  const isReachSelectLimit = useMemo(() => {
    if (typeof selectLimit === 'number') {
      return selectedList.length >= selectLimit;
    }
    return false;
  }, [selectedList, selectLimit]);

  const selectAll = () => {
    const totalDeviceNum = deviceList.length;
    const selectedDeviceNum = selectedList.length;
    let result = [];
    // 如果已经达到上限，或者已经全部选择，则清空已选设备
    if (isReachSelectLimit || selectedDeviceNum === totalDeviceNum) {
      result = [];
    } else {
      const allDevIds = deviceList.map(item => item.devId);
      if (typeof selectLimit === 'number') {
        let restNumber = selectLimit - selectedDeviceNum;
        const newDevicelist = [];
        for (let i = 0; i < totalDeviceNum; i++) {
          const device = deviceList[i];
          if (restNumber > 0) {
            if (!selectedList.includes(device.devId)) {
              newDevicelist.push(device.devId);
              restNumber--;
            }
          } else {
            break;
          }
        }
        result = [...selectedList, ...newDevicelist];
      } else {
        result = allDevIds;
      }
    }
    setSelectedList(result);
    typeof onSelectChange === 'function' && onSelectChange(result);
  };

  const selectItem = ({ devId }: DevInfo) => {
    let list = [...selectedList];
    if (selectedList.includes(devId)) {
      const i = selectedList.indexOf(devId);
      list.splice(i, 1);
    } else {
      list = [...list, devId];
    }
    setSelectedList(list);
    typeof onSelectChange === 'function' && onSelectChange(list);
  };

  // 获取房间信息
  const getRoomInfo = () => {
    TYSdk.native.getRoomsInCurrentHome(
      d => {
        const data = {};
        d.forEach(item => {
          data[item.roomId] = item.name;
        });
        setRoomInfo(data);
      },
      e => e
    );
  };
  // 获取房间名称
  const getRoomName = (id: number) => {
    if (id === 0) {
      return '';
    }
    return roomInfo[id];
  };

  const renderTip = () => (
    <View style={[styles.top, tipContainerStyle]}>
      <TYText style={[styles.tip, tipTextStyle]}>{tipText}</TYText>
      <TouchableOpacity activeOpacity={activeOpacity} onPress={() => selectAll()}>
        <TYText style={[styles.selectText, selectAllTextStyle]}>{selectAllText}</TYText>
      </TouchableOpacity>
    </View>
  );

  const renderList = () => {
    return (
      <FlatList
        style={[styles.list, listStyle]}
        data={deviceList}
        keyExtractor={item => item.devId}
        extraData={deviceList}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
      />
    );
  };

  const renderItem = ({ item }) => {
    const { iconUrl, name, selected, roomId, isOnline, pcc } = item;
    const online = getOnlineState(pcc) || isOnline;
    const roomName = getRoomName(roomId);
    return (
      <TouchableOpacity
        activeOpacity={activeOpacity}
        style={styles.itemMain}
        onPress={() => selectItem(item)}
        disabled={!selected && isReachSelectLimit}
      >
        <View style={styles.itemContainer}>
          <Image source={{ uri: iconUrl }} style={styles.itemIcon} />
          <View style={styles.devInfoContainer}>
            <TYText style={styles.itemText} numberOfLines={1}>
              {name}
            </TYText>
            <View style={styles.statusContainer}>
              {!!roomName && (
                <TYText
                  style={[
                    styles.alarmItemText,
                    { fontSize: cx(12), color: '#ccc', marginRight: cx(8) },
                  ]}
                >
                  {roomName}
                </TYText>
              )}
              {!online &&
                (typeof customRenderOfflineState === 'function'
                  ? customRenderOfflineState()
                  : renderOfflineState())}
            </View>
          </View>
        </View>
        {renderCheckBox(selected)}
      </TouchableOpacity>
    );
  };
  // 离线状态标签
  const renderOfflineState = () => (
    <View style={styles.offlineWrap}>
      <TYText style={[styles.offlineText, offlineTextStyle]}>{offlineText}</TYText>
    </View>
  );
  // 勾选框
  const renderCheckBox = (selected: boolean) => (
    <Image
      source={selected ? Res.checkOn : isReachSelectLimit ? Res.checkDisabled : Res.checkOff}
      style={[
        styles.checkBox,
        {
          tintColor: selected
            ? activedTintColor
            : isReachSelectLimit
            ? disabledTintColor
            : normalTintColor,
        },
      ]}
    />
  );

  return (
    <View style={[styles.main, containerStyle]}>
      {renderTip()}
      {renderList()}
    </View>
  );
};
SelectDevice.defaultProps = {
  activeOpacity: 0.9,
  dataSource: [],
  tipText: Strings.getLang('addTip'),
  tipTextStyle: {},
  offlineText: Strings.getLang('deviceOffline'),
  offlineTextStyle: {},
  selectAllText: Strings.getLang('selectAll'),
  selectAllTextStyle: {},
  listStyle: {},
  activedTintColor: '#3566FF',
  disabledTintColor: '#DBDBDB',
};

export default SelectDevice;
