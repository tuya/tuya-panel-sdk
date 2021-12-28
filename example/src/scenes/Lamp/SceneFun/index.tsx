import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { lampApi } from '@tuya/tuya-panel-api';
import { Hooks } from '@tuya/tuya-panel-lamp-sdk';
import { Utils, TYText } from 'tuya-panel-kit';
import { useUpdateEffect } from 'ahooks';

const { getSceneData, getSceneVersionInfo } = lampApi.sceneApi;
const { useSceneData } = Hooks;

const { winWidth, convertX: cx } = Utils.RatioUtils;

const SceneFunScene: React.FC<any> = () => {
  const [list, setList] = useState([]);
  const [initVersion, setInitVersion] = useState('1.0');
  const [maxVersion, setMaxVersion] = useState('1.0');
  const [data, currentVersion, { renderUpdateScene }] = useSceneData('1.0');

  useEffect(() => {
    getSceneVersionInfo()
      .then((response: any) => {
        const { currVersion, allVersionList } = response;
        const max = allVersionList[allVersionList.length - 1];
        setInitVersion(currVersion);
        setMaxVersion(max);
        // 获取情景库数据
        getSceneData(currVersion)
          .then((d: any) => {
            setList(d);
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, []);

  useUpdateEffect(() => {
    setList(data);
    setInitVersion(currentVersion);
  }, [data, currentVersion]);

  const handleUpdate = async () => {
    renderUpdateScene(maxVersion);
  };

  if (list.length > 0) {
    return (
      <View style={styles.flex1}>
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
          {initVersion < maxVersion && (
            <TouchableOpacity onPress={handleUpdate} style={styles.noStyle}>
              <TYText>update download</TYText>
            </TouchableOpacity>
          )}
          {list.map((item: any) => {
            return (
              <View style={styles.sceneItemBox} key={item.sceneId}>
                <TouchableOpacity
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  key={item.sceneId}
                  activeOpacity={0.5}
                  onPress={() => {}}
                >
                  <Image style={styles.sceneImage} source={{ uri: item.icon }} resizeMode="cover" />
                  <TYText style={styles.sceneName}>{item.sceneName}</TYText>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
  return (
    <View style={styles.flex1}>
      <TYText>No Data</TYText>
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    alignItems: 'center',
    backgroundColor: '#E7ECF5',
    flex: 1,
    justifyContent: 'center',
  },
  noStyle: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: cx(13),
    flexDirection: 'row',
    height: cx(40),
    justifyContent: 'center',
    marginBottom: cx(24),
    width: cx(335),
  },
  sceneImage: {
    borderRadius: cx(25),
    height: cx(50),
    marginLeft: cx(14),
    marginTop: cx(14),
    width: cx(50),
  },
  sceneItemBox: {
    backgroundColor: '#fff',
    borderColor: 'transparent',
    borderRadius: cx(16),
    height: cx(102),
    justifyContent: 'space-between',
    marginBottom: cx(11),
    overflow: 'hidden',
    width: cx(162),
  },
  sceneName: {
    color: 'rgba(0,0,0,0.9)',
    flexWrap: 'wrap',
    fontSize: cx(14),
    marginBottom: cx(12),
    marginRight: cx(16),
    textAlign: 'right',
  },
  scrollViewContent: {
    backgroundColor: '#E7ECF5',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: cx(40),
    paddingHorizontal: cx(20),
    paddingTop: cx(24),
    width: winWidth,
  },
});

export default SceneFunScene;
