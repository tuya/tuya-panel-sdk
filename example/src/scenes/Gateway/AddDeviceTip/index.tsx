import React, { FC } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, TYText } from 'tuya-panel-kit';
import { AddDeviceTipModal } from '@tuya/tuya-panel-gateway-sdk';
import Strings from './i18n';
import Res from './res';

const AddDeviceTipScene: FC = () => {
  const dataSource = [
    {
      name: Strings.getLang('tipName1'),
      icon: Res.iconSensor,
      content: Strings.getLang('tipContent1'),
    },
    {
      name: Strings.getLang('tipName2'),
      icon: Res.iconSocket,
      content: Strings.getLang('tipContent2'),
    },
    {
      name: Strings.getLang('tipName3'),
      icon: Res.iconLight,
      content: Strings.getLang('tipContent3'),
    },
  ];
  const showModalNormal = () => {
    AddDeviceTipModal.show({
      dataSource,
    });
  };
  const showModalChangeText = () => {
    AddDeviceTipModal.show({
      dataSource,
      title: Strings.getLang('distributionNetworkPrompt'),
      desc: Strings.getLang('distributionNetworkDesc'),
    });
  };
  const showModalChangeContentPaddingHorizontal = () => {
    AddDeviceTipModal.show({
      dataSource,
      contentPaddingHorizontal: 40,
    });
  };
  const showModalChangeBtnStyle = () => {
    AddDeviceTipModal.show({
      dataSource,
      addButtonStyle: {
        backgroundColor: 'lightblue',
      },
      addButtonTextStyle: {
        color: '#333',
      },
      moreButtonTextStyle: {
        color: 'red',
      },
    });
  };
  const showModalChangeMaskStyle = () => {
    AddDeviceTipModal.show({
      dataSource,
      maskStyle: { backgroundColor: 'pink' },
    });
  };
  const exampleConfigList = [
    {
      desc: Strings.getLang('normalUsage'),
      onPress: showModalNormal,
    },
    {
      desc: Strings.getLang('changeTextUsage'),
      onPress: showModalChangeText,
    },
    {
      desc: Strings.getLang('changeBtnStyleUsage'),
      onPress: showModalChangeBtnStyle,
    },
    {
      desc: Strings.getLang('changeContentPaddingHorizontal'),
      onPress: showModalChangeContentPaddingHorizontal,
    },
    {
      desc: Strings.getLang('changeMaskStyleUsage'),
      onPress: showModalChangeMaskStyle,
    },
  ];
  return (
    <View style={styles.containerStyle}>
      <ScrollView style={styles.scrollView}>
        {exampleConfigList.map(({ desc, onPress }) => (
          <View style={styles.row} key={desc}>
            <TYText style={styles.text} text={desc} />
            <Button
              text={Strings.getLang('addDevice')}
              onPress={onPress}
              textStyle={{ fontSize: 14 }}
              style={styles.addBtn}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  addBtn: {
    backgroundColor: '#E5E5E5',
    borderRadius: 10,
    margin: 20,
    padding: 20,
  },
  containerStyle: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-start',
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  text: {
    alignSelf: 'flex-start',
    // textAlign: 'left',
    marginLeft: 10,
  },
});

export default AddDeviceTipScene;
