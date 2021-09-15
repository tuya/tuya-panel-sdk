import React, { FC, useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, StyleProp, ViewStyle } from 'react-native';
import { Button, Utils, TYSdk } from 'tuya-panel-kit';
import { SelectDevice } from '@tuya/tuya-panel-gateway-sdk';
import Strings from './i18n';

const { convertX: cx } = Utils.RatioUtils;
const SelectDeviceScene: FC = () => {
  const defaultSelectLimit = 2;
  const defaultContainerStyle: StyleProp<ViewStyle> = { maxHeight: cx(300) };
  const defaultTipText = Strings.getLang('addTip');
  const defaultTipTextStyle = {};
  const defaultOfflineText = Strings.getLang('deviceOffline');
  const defaultOfflineTextStyle = {};
  const defaultSelectAllText = Strings.getLang('selectAll');
  const defaultSelectAllTextStyle = {};
  const defaultListStyle = {};
  const defaultActivedTintColor = '#3566FF';
  const defaultDisabledTintColor = '#DBDBDB';
  const defaultNormalTintColor = undefined;

  const [dataSource, setDataSource] = useState([]);
  const [selectLimit, setSelectLimit] = useState(defaultSelectLimit);
  const [containerStyle, setContainerStyle] = useState(defaultContainerStyle);
  const [tipText, setTipText] = useState(defaultTipText);
  const [tipTextStyle, setTipTextStyle] = useState(defaultTipTextStyle);
  const [offlineText, setOfflineText] = useState(defaultOfflineText);
  const [offlineTextStyle, setOfflineTextStyle] = useState(defaultOfflineTextStyle);
  const [selectAllText, setSelectAllText] = useState(defaultSelectAllText);
  const [selectAllTextStyle, setSelectAllTextStyle] = useState(defaultSelectAllTextStyle);
  const [listStyle, setListStyle] = useState(defaultListStyle);
  const [activedTintColor, setActivedTintColor] = useState(defaultActivedTintColor);
  const [disabledTintColor, setDisabledTintColor] = useState(defaultDisabledTintColor);
  const [normalTintColor, setNormalTintColor] = useState<string | undefined>(
    defaultNormalTintColor
  );

  useEffect(() => {
    getSubDevList();
  }, []);

  const getSubDevList = () => {
    TYSdk.native.getDeviceList(
      (res: any) => {
        setDataSource(res);
      },
      (err: any) => {
        console.log(err);
      }
    );
  };
  const changeSelectLimit = () => {
    setSelectLimit(4);
  };
  const changeTipTextAndStyle = () => {
    setTipText(Strings.getLang('addTip2'));
    setTipTextStyle({ color: 'lightblue' });
  };
  const changeCheckboxTintColor = () => {
    setActivedTintColor('green');
    setDisabledTintColor('#333');
    setNormalTintColor('pink');
  };
  const changeOfflineTextAndStyle = () => {
    setOfflineText(Strings.getLang('deviceOffline2'));
    setOfflineTextStyle({ color: 'yellow' });
  };
  const changeSelectAllTextAndStyle = () => {
    setSelectAllText(Strings.getLang('selectAll2'));
    setSelectAllTextStyle({ color: 'pink' });
  };
  const changeContainerAndListStyle = () => {
    setContainerStyle({ backgroundColor: 'lightblue' });
    setListStyle({ marginTop: cx(20) });
  };
  // 回到初始状态
  const backInitialState = () => {
    setSelectLimit(defaultSelectLimit);
    setTipText(defaultTipText);
    setTipTextStyle(defaultTipTextStyle);
    setOfflineText(defaultOfflineText);
    setOfflineTextStyle(defaultOfflineTextStyle);
    setSelectAllText(defaultSelectAllText);
    setSelectAllTextStyle(defaultSelectAllTextStyle);
    setContainerStyle(defaultContainerStyle);
    setListStyle(defaultListStyle);
    setActivedTintColor(defaultActivedTintColor);
    setDisabledTintColor(defaultDisabledTintColor);
    setNormalTintColor(defaultNormalTintColor);
  };

  const exampleConfigList = [
    {
      text: Strings.getLang('changeSelectLimit'),
      onPress: changeSelectLimit,
    },
    {
      text: Strings.getLang('changeTipTextAndStyle'),
      onPress: changeTipTextAndStyle,
    },
    {
      text: Strings.getLang('changeCheckboxTintColor'),
      onPress: changeCheckboxTintColor,
    },
    {
      text: Strings.getLang('changeOfflineTextAndStyle'),
      onPress: changeOfflineTextAndStyle,
    },
    {
      text: Strings.getLang('changeSelectAllTextAndStyle'),
      onPress: changeSelectAllTextAndStyle,
    },
    {
      text: Strings.getLang('changeContainerAndListStyle'),
      onPress: changeContainerAndListStyle,
    },
    {
      text: Strings.getLang('backInitialState'),
      onPress: backInitialState,
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <SelectDevice
        dataSource={dataSource}
        selectLimit={selectLimit}
        containerStyle={containerStyle}
        tipText={tipText}
        tipTextStyle={tipTextStyle}
        offlineText={offlineText}
        offlineTextStyle={offlineTextStyle}
        selectAllText={selectAllText}
        selectAllTextStyle={selectAllTextStyle}
        listStyle={listStyle}
        activedTintColor={activedTintColor}
        disabledTintColor={disabledTintColor}
        normalTintColor={normalTintColor}
        onSelectChange={(res: Array<string>) => console.log(res)}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.btnContainer}>
          {exampleConfigList.map(({ text, onPress }) => (
            <Button
              key={text}
              style={styles.btn}
              textStyle={styles.btnText}
              text={text}
              onPress={onPress}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    backgroundColor: '#E5E5E5',
    borderRadius: 20,
    margin: 10,
    padding: 15,
  },
  btnContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 14,
  },
});

export default SelectDeviceScene;
