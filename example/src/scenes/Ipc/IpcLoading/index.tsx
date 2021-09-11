import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TYIpcLoading } from '@tuya/tuya-panel-ipc-sdk';

const IpcLoading: React.FC = () => {
  return (
    <View style={styles.TYIpcLoadingPage}>
      <TYIpcLoading
        showComplete={false}
        itemNum={3}
        completeColor="green"
        sequenceColor="green"
        dotSize={8}
      />
      <TYIpcLoading
        showComplete={false}
        itemNum={5}
        completeColor="#FA9601"
        sequenceColor="#FA9601"
        dotSize={8}
        containerStyle={{ marginTop: 50 }}
      />
      <TYIpcLoading
        showComplete
        itemNum={5}
        completeColor="#000000"
        sequenceColor="#000000"
        dotSize={8}
        containerStyle={{ marginTop: 50 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  TYIpcLoadingPage: {
    marginTop: 100,
  },
});

export default IpcLoading;
