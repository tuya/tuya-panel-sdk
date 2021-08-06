import React, { useState } from 'react';

import { StyleSheet, View } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { TYIpcDragSort } from '@tuya/tuya-panel-ipc-sdk';

const itemHeight = 60;

const IpcDragSort: React.FC = () => {
  const arr = [];
  for (let i = 1; i < 20; i++) {
    arr.push({
      id: i,
      name: `lock${i}`,
    });
  }
  const [list, setList] = useState(arr);

  const order = (data: any) => {
    setList(data.list);
  };

  const _renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <TYText style={{ color: '#000' }}>{item.name}</TYText>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TYIpcDragSort
        itemHeight={itemHeight}
        onOrder={order}
        data={list}
        renderItem={_renderItem}
        orderWidth={60}
      />
    </View>
  );
};

export default IpcDragSort;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
  item: {
    alignContent: 'center',
    height: itemHeight,
    justifyContent: 'center',
    paddingLeft: 20,
  },
});
