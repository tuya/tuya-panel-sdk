import React, { FC, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Button, TYText, Dialog, Toast } from 'tuya-panel-kit';
import { SetPasswordModal } from '@tuya/tuya-panel-gateway-sdk';
import Strings from './i18n';

const SetPasswordModalScene: FC = () => {
  const [toastText, setToastText] = useState('');
  const [toastShow, setToastShow] = useState(false);

  const showModalNormal = () => {
    SetPasswordModal.show({});
  };
  const setPasswordLength = () => {
    SetPasswordModal.show({
      passwordLength: 8,
    });
  };
  const setCircleActivedColor = () => {
    SetPasswordModal.show({
      activedDotColor: 'pink',
    });
  };
  const setOnConfirm = () => {
    SetPasswordModal.show({
      onConfirm: () => {
        Dialog.close();
        setTimeout(() => {
          setToastText(Strings.getLang('setPasswordSuccess'));
          setToastShow(true);
        }, 300);
      },
    });
  };

  const exampleConfigList = [
    {
      desc: Strings.getLang('normalUsage'),
      onPress: showModalNormal,
    },
    {
      desc: Strings.getLang('setPasswordLength'),
      onPress: setPasswordLength,
    },
    {
      desc: Strings.getLang('setCircleActivedColor'),
      onPress: setCircleActivedColor,
    },
    {
      desc: Strings.getLang('setOnConfirm'),
      onPress: setOnConfirm,
    },
  ];
  return (
    <View style={styles.containerStyle}>
      <ScrollView style={styles.scrollView}>
        {exampleConfigList.map(({ desc, onPress }) => (
          <View style={styles.row} key={desc}>
            <TYText style={styles.text} text={desc} />
            <Button
              text={Strings.getLang('setPassword')}
              onPress={onPress}
              textStyle={{ fontSize: 14 }}
              style={styles.addBtn}
            />
          </View>
        ))}
      </ScrollView>
      <Toast text={toastText} show={toastShow} onFinish={() => setToastShow(false)} />
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

export default SetPasswordModalScene;
