/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Utils, Swipeout, TYText, SwitchButton } from 'tuya-panel-kit';
import colorData from 'color';
import { lampApi } from '@tuya/tuya-panel-api';
import { repeatArrStr, parseHour12Data, actionTypeStr } from '../../../../utils';
import Strings from '../i18n';
import { TListProps, ICloudTimerList } from './interface';
import Res from '../res';

const { removeCloudTimer, updateTimerStatus } = lampApi.timingApi;

const { convertX: cx, isIphoneX } = Utils.RatioUtils;
const { parseTimer } = Utils.TimeUtils;

const List: React.FC<TListProps> = props => {
  const scrollViewRef = useRef();
  const {
    onGetCloudTimerList,
    onEditItem,
    is24Hour,
    category,
    noTimerTintColor,
    themeColor,
    fontColor,
    timeStyle,
    listHeaderComponent,
    renderSwipeDelElement,
    switchOptionStyle: {
      style,
      size,
      tintColor,
      thumbTintColor,
      thumbStyle,
      onThumbBorderColor,
      offThumbBorderColor,
    },
  } = props;
  const [timerList, setTimerList] = useState<ICloudTimerList[]>([]);

  useEffect(() => {
    setTimerList(getStateList(props.timerList));
    // eslint-disable-next-line react/destructuring-assignment
  }, [props.timerList]);

  const getStateList = (list: ICloudTimerList[]) => {
    const newList = list
      .map(i => ({ ...i, open: false }))
      .sort(
        (a: ICloudTimerList, b: ICloudTimerList) => a.hour * 60 + a.minute - b.hour * 60 + a.minute
      );
    return newList;
  };

  const handlePowerItem = (data: ICloudTimerList) => async () => {
    const { timerId, status } = data;
    const switchValue = !status ? 1 : 0;
    await updateTimerStatus(category!, timerId, switchValue);
    onGetCloudTimerList && onGetCloudTimerList();
  };

  const handleDelete = (data: ICloudTimerList) => async () => {
    await removeCloudTimer(data.timerId, category!);
    onGetCloudTimerList && onGetCloudTimerList();
  };

  const handleSwipeoutOpen = (index: number) => () => {
    const newList = timerList.map((i, idx) => ({
      ...i,
      open: idx === index,
    }));
    setTimerList(getStateList(newList));
  };

  const handleScrollViewEnableChange = (enable: boolean) => {
    // @ts-ignore
    if (scrollViewRef && scrollViewRef.current?.setNativeProps) {
      // @ts-ignore
      scrollViewRef.current.setNativeProps({ scrollEnabled: enable });
    }
  };

  const renderSingleTimeText = (time: number) => {
    const second = time * 60;
    // @ts-ignore
    const isZh = Strings.language?.startsWith('zh');
    if (is24Hour) {
      return <TYText style={styles.itemSingleTitleText}>{parseTimer(second)}</TYText>;
    }
    const { timeStr, isPM } = parseHour12Data(second);
    return (
      <View style={[styles.itemPosition, { flexDirection: isZh ? 'row' : 'row-reverse' }]}>
        <TYText style={styles.itemDesc}>{Strings.getLang(isPM ? 'TYLamp_pm' : 'TYLamp_am')}</TYText>
        <TYText style={[styles.itemSingleTitleText, !isZh && { marginRight: cx(4) }]}>
          {timeStr}
        </TYText>
      </View>
    );
  };

  const renderTaskItem = (item: ICloudTimerList, index: number) => {
    return (
      <Swipeout
        key={item.key}
        autoClose
        backgroundColor="transparent"
        close={timerList[index].open}
        scroll={() => handleScrollViewEnableChange(false)}
        // @ts-ignore
        onScrollEnd={() => handleScrollViewEnableChange(true)}
        onOpen={handleSwipeoutOpen(index)}
        right={[
          {
            onPress: handleDelete(item),
            type: 'delete',
            content: renderSwipeDelElement ? (
              renderSwipeDelElement()
            ) : (
              <View style={styles.swipeStyle}>
                <Image source={Res.trash} style={styles.delStyle} resizeMode="contain" />
              </View>
            ),
          },
        ]}
      >
        <View style={[styles.item, timeStyle]} key={item.key}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => onEditItem(item)}
            style={styles.itemStyle}
          >
            <View style={styles.itemTitle}>
              {renderSingleTimeText(item.hour * 60 + item.minute)}
            </View>
            <TYText style={styles.itemDesc}>{repeatArrStr(item.weeks)}</TYText>
            <TYText style={styles.itemDesc}>
              {actionTypeStr(item.dpPowerValue, item.workMode)}
            </TYText>
          </TouchableOpacity>
          <SwitchButton
            style={[styles.button, style]}
            size={size}
            tintColor={tintColor}
            onTintColor={colorData(themeColor!).alpha(0.12).rgbaString()}
            thumbTintColor={thumbTintColor}
            onThumbTintColor={themeColor}
            thumbStyle={[
              thumbStyle,
              {
                borderColor: item.status ? onThumbBorderColor : offThumbBorderColor,
              },
            ]}
            value={item.status}
            onValueChange={handlePowerItem(item)}
          />
        </View>
      </Swipeout>
    );
  };

  const renderEmpty = () => {
    return (
      <View style={styles.box}>
        <Image
          source={Res.empty}
          style={{ tintColor: noTimerTintColor ? fontColor : 'rgba(0,0,0,0.3)' }}
          resizeMode="contain"
        />
        <TYText style={styles.emptyTipText}>{Strings.getLang('TYLamp_emptyTip')}</TYText>
      </View>
    );
  };
  return (
    <FlatList
      ref={(ref: any) => {
        scrollViewRef.current = ref;
      }}
      contentContainerStyle={[styles.main, timerList.length === 0 && { flex: 1 }]}
      showsVerticalScrollIndicator={false}
      data={timerList}
      renderItem={({ item, index }) => renderTaskItem(item, index)}
      keyExtractor={item => item.key}
      ListHeaderComponent={listHeaderComponent}
      ListEmptyComponent={renderEmpty()}
    />
  );
};

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  button: {
    paddingRight: cx(24),
  },
  delStyle: {
    height: cx(20),
    tintColor: '#fff',
    width: cx(20),
  },
  emptyTipText: {
    color: 'rgba(0,0,0,0.3)',
  },
  item: {
    alignItems: 'center',
    borderBottomColor: 'rgba(0,0,0,0.05)',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: cx(24),
  },
  itemDesc: {
    fontSize: cx(12),
    marginRight: cx(4),
    opacity: 0.5,
    paddingBottom: cx(4),
  },
  itemPosition: {
    alignItems: 'flex-end',
    height: cx(32),
  },
  itemSingleTitleText: {
    fontSize: cx(28),
  },
  itemStyle: {
    flex: 1,
    paddingVertical: cx(12),
  },
  itemTitle: {
    flexDirection: 'row',
    marginBottom: cx(8),
  },
  main: {
    paddingBottom: isIphoneX ? cx(100) + 20 : cx(100),
  },
  swipeStyle: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    width: '100%',
  },
});

export default List;
