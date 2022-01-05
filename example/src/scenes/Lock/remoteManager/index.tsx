import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRemoteManager } from '@tuya/tuya-panel-lock-sdk';

const RemoteManager = () => {
  const remoteManager = useRemoteManager({ isAdmin: true, isShare: false });

  useEffect(() => {
    remoteManager.startListen({ deviceOnline: true });
  }, []);

  const handleReportRealTimeVideo = () => {
    remoteManager.mockReport({ video_request_realtime: '00000100' });
  };

  const handleReportAlarmVideo = () => {
    remoteManager.mockReport({ video_request_realtime: '00010100' });
  };

  const handleReportOpenCamera = () => {
    remoteManager.mockReport({ unlock_request: 5 });
  };

  const handleReportAlarmCamera = () => {
    remoteManager.mockReport({ alarm_request: 5 });
  };

  return (
    <View
      style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 20 }}
    >
      <TouchableOpacity style={styles.btn} onPress={handleReportRealTimeVideo}>
        <Text style={{ color: '#fff' }}>实时视频</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={handleReportAlarmVideo}>
        <Text style={{ color: '#fff' }}>告警视频</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={handleReportOpenCamera}>
        <Text style={{ color: '#fff' }}>开门抓拍</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={handleReportAlarmCamera}>
        <Text style={{ color: '#fff' }}>告警抓拍</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    backgroundColor: 'skyblue',
    height: 50,
    justifyContent: 'center',
    width: 100,
  },
});

export default RemoteManager;
