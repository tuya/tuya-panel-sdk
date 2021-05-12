import React, { useState } from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, View } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TYIpcBattery } from '@tuya/tuya-panel-ipc-sdk';

const IpcBattery: React.FC = () => {
  const [english, setEnglish] = useState(true);
  const [value, setValue] = useState(15);

  const onChangeValue = (type: string) => {
    if (type === 'add') {
      if (value >= 100) {
        return false;
      }
      setValue(value + 1);
    } else {
      if (value <= 0) {
        return false;
      }
      setValue(value - 1);
    }
    return false;
  };

  const onChangeEleValue = (eleValue: number) => {
    console.log(eleValue, 'eleValue');
  };

  return (
    <ScrollView
      contentContainerStyle={styles.TYIpcGrid}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
    >
      <View style={styles.controlContainer}>
        <TouchableOpacity onPress={() => onChangeValue('sub')} style={styles.controlBtn}>
          <TYText text="-" style={styles.controlTxt} />
        </TouchableOpacity>

        <TYText text={`${value}`} style={styles.showTxt} />

        <TouchableOpacity onPress={() => onChangeValue('add')} style={styles.controlBtn}>
          <TYText text="+" style={styles.controlTxt} />
        </TouchableOpacity>
      </View>

      <TYText
        style={styles.descTxt}
        text={english ? 'Description: Vertical display of battery' : '描述: 电量竖向显示'}
      />
      <TYIpcBattery value={value} standardDpMode={false} />
      <TYText
        style={styles.descTxt}
        text={
          english
            ? 'Description: 90 degree horizontal power display, high power'
            : '描述: 电量横向90度显示,高电量'
        }
      />
      <TYIpcBattery value={20} rotateZ={90} standardDpMode={false} isCharging />
      <TYText
        style={styles.descTxt}
        text={
          english
            ? 'Description: The battery level is displayed at 180 degrees vertically, and the battery level is medium'
            : '描述: 电量竖向180度显示,中电量'
        }
      />
      <TYIpcBattery value={18} rotateZ={180} standardDpMode={false} />
      <TYText
        style={styles.descTxt}
        text={
          english
            ? 'Description: Battery level display at 270 degrees horizontally, low battery'
            : '描述: 电量横向270度显示,低电量'
        }
      />
      <TYIpcBattery value={8} rotateZ={270} standardDpMode={false} />
      <TYText style={styles.descTxt} text={english ? 'Description: Charging' : '描述: 充电中'} />
      <TYIpcBattery value={value} isCharging standardDpMode={false} />
      <TYText
        style={styles.descTxt}
        text={english ? 'Description: Standard dp mode dp report' : '描述: 标准dp模式 dp上报'}
      />
      <TYText
        style={styles.descTxt}
        text="[dpId]:[dpCode] 145: wireless_electricity、146: wireless_powermode、148: battery_report_cap"
      />
      <TYIpcBattery
        wireless_electricity={value}
        wireless_powermode="1"
        battery_report_cap={undefined}
        onChangeEleValue={onChangeEleValue}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  TYIpcGrid: {
    paddingBottom: 50,
  },
  controlBtn: {
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'center',
    minWidth: 100,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  controlContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 25,
    paddingVertical: 15,
  },
  controlTxt: {
    color: '#fff',
    fontSize: 16,
  },
  descTxt: {
    color: 'red',
    marginVertical: 10,
    paddingLeft: 15,
  },
  showTxt: {
    fontSize: 16,
  },
});

export default IpcBattery;
