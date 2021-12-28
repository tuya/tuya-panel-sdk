import { lampApi } from '@tuya/tuya-panel-api';
import { useState, useRef } from 'react';
import _ from 'lodash';
const { getSceneData, updateVersion } = lampApi.sceneApi;

const useSceneData = (v: string) => {
  const currentRef = useRef<ISceneData[]>([]);
  const [currentVersion, setCurrentVersion] = useState(v);
  const [data, setData] = useState<ISceneData[]>([]);

  const renderUpdateScene = (version: string) => {
    // 升级版本
    updateVersion(version)
      .then((flag: boolean) => {
        if (flag) {
          setCurrentVersion(version);
          // 获取新的情景库数据
          getSceneData(version)
            .then((response: ISceneData[]) => {
              if (!_.isEqual(currentRef.current, response)) {
                currentRef.current = response;
                setData(response);
              }
            })
            .catch(() => {});
        }
      })
      .catch(err => console.log(err));
  };
  return [
    data,
    currentVersion,
    {
      renderUpdateScene,
    },
  ] as const;
};

export default useSceneData;
