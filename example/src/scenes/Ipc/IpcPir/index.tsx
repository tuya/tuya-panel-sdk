import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TYIpcPir } from '@tuya/tuya-panel-ipc-sdk';

const IpcPir: React.FC = () => {
  const [dpCodeAValue, setDpCodeAValue] = useState(false);
  const [dpCodeBValue, setDpCodeBValue] = useState(false);
  const [dpCodeCValue, setDpCodeCValue] = useState(false);
  const onChangePir = (dpCode: string, value: boolean) => {
    if (dpCode === 'flight_pir_a') {
      setDpCodeAValue(!value);
    } else if (dpCode === 'flight_pir_b') {
      setDpCodeBValue(!value);
    } else if (dpCode === 'flight_pir_c') {
      setDpCodeCValue(!value);
    }
  };

  return (
    <ScrollView
      scrollEnabled
      contentContainerStyle={styles.TYIpcPirPage}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
    >
      <TYText style={styles.descTxt} text="Description: Single area control" />
      {/* <TYText style={styles.descTxt} text="描述: 单个告警区域设置" /> */}
      <TYIpcPir
        title="Set PIR alarm area"
        // title="设置告警区域"
        onChangePir={onChangePir}
        dpCodeAValue={dpCodeAValue}
        pieNumber={1}
        onText="开"
        offText="关"
      />
      <TYText style={styles.descTxt} text="Description: Two area control" />
      {/* <TYText style={styles.descTxt} text="描述: 两片告警区域设置" /> */}
      <TYIpcPir
        title="Set PIR alarm area"
        // title="设置告警区域"
        onChangePir={onChangePir}
        dpCodeAValue={dpCodeAValue}
        dpCodeBValue={dpCodeBValue}
        pieNumber={2}
        // onText="开"
        // offText="关"
      />
      <TYText style={styles.descTxt} text="Description: Three area control" />
      {/* <TYText style={styles.descTxt} text="描述: 三片告警区域设置" /> */}
      <TYIpcPir
        title="Set PIR alarm area"
        // title="设置告警区域"
        onChangePir={onChangePir}
        dpCodeAValue={dpCodeAValue}
        dpCodeBValue={dpCodeBValue}
        dpCodeCValue={dpCodeCValue}
        pieNumber={3}
        // onText="开"
        // offText="关"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  TYIpcPirPage: {
    paddingBottom: 50,
  },
  descTxt: {
    color: 'red',
    marginVertical: 10,
    paddingLeft: 15,
  },
});

export default IpcPir;
