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
      contentContainerStyle={styles.TYIpcPirPage}
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
    >
      <TYText style={styles.descTxt} text="Description: Single area control" />
      <TYIpcPir
        title="Set PIR alarm area"
        onChangePir={onChangePir}
        dpCodeAValue={dpCodeAValue}
        pieNumber={1}
      />
      <TYText style={styles.descTxt} text="Description: Two area control" />
      <TYIpcPir
        title="Set PIR alarm area"
        onChangePir={onChangePir}
        dpCodeAValue={dpCodeAValue}
        dpCodeBValue={dpCodeBValue}
        pieNumber={2}
      />
      <TYText style={styles.descTxt} text="Description: Three area control" />
      <TYIpcPir
        title="Set PIR alarm area"
        onChangePir={onChangePir}
        dpCodeAValue={dpCodeAValue}
        dpCodeBValue={dpCodeBValue}
        dpCodeCValue={dpCodeCValue}
        pieNumber={3}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  TYIpcPirPage: {
    flex: 1,
  },
  descTxt: {
    color: 'red',
    marginVertical: 10,
    paddingLeft: 15,
  },
});

export default IpcPir;
