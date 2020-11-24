import React, { Component } from 'react';
import { View, StyleSheet, InteractionManager, ScrollView } from 'react-native';
import { TYSdk, Utils, Button } from '@tuya-rn/tuya-native-components';
import moment from 'moment';
import _isEmpty from 'lodash/isEmpty';

import Api from '../../../api';
import LaserSweepMapLeDong from '../../../map/LaserMap/LaserSweepMapLeDong';
import { stringToAtHex, atHexToString } from '../../../utils/StringsUtils';
import { awaitExpectDpsState } from '../../../utils/FunctionUtils';
import panelMapConfig, {
  ILaserMapPanelConfig,
} from '../../../map/LaserMap/LaserSweepMapLeDong/constant/panelMapConfig';
import { createDpValue$ } from '../../../utils/RxUtils';
import Toast from '../../../components/Display/Toast';
import I18n from '../../../i18n';
import { dpCodesEnum } from '../../../map/LaserMap/LaserSweepMapLeDong/constant/dpCodes';
import multiMap, { IHistoryMapData } from '../../../protocol/ledong/multiMap';

import Item from './Item';
import MainButton from './MainButton';
import SubButton from './SubButton';

const { convertX: cx, width } = Utils.RatioUtils;

enum multiMapVersion {
  v1 = 'v1',
  v2 = 'v2',
}

interface IMultiMapManageState {
  dataSource: IHistoryMapData[];
  localSource: any[];
}

interface IMultiMapManageProps {
  commonCmdCode: string;
  resetMapCode: string;
  themeColor: string;
  laserMapConfig: ILaserMapPanelConfig;
  version: multiMapVersion;
}

export default class MultiMapManage extends Component<IMultiMapManageProps, IMultiMapManageState> {
  static defaultProps = {
    commonCmdCode: dpCodesEnum.commRaw,
    resetMapCode: dpCodesEnum.resetMap,
    themeColor: '#000000',
    laserMapConfig: panelMapConfig,
    version: multiMapVersion.v1,
  };

  state: IMultiMapManageState = {
    dataSource: [],
    localSource: [],
  };

  componentDidMount() {
    // TYSdk.mobile.showLoading();
    InteractionManager.runAfterInteractions(() => {
      // this.getCommandRawRx();
      this.getRecord();
      // TYSdk.mobile.showLoading();
    });
  }

  componentWillUnmount() {
    this.commandRaw$ && this.commandRaw$.unsubscribe();
  }

  commandRaw$: any = null;

  getCommandRawRx() {
    const { commonCmdCode } = this.props;
    this.commandRaw$ = createDpValue$(commonCmdCode, false, { distinct: true }).subscribe(
      (value: string) => {
        const content = multiMap.decodeCmd(value);
        // if (!_isEmpty(content)) {
        //   const { code } = content.data;
        //   if (code !== multiMap.IUploadCode.success) {
        //     console.log('mapChange_Error');
        //     Toast.debounceInfo(`${I18n.getLang('mapChange_Error')}: ${code}`);
        //   }
        //   // if (content.data && content.data.localMapsInfo) {
        //   //   // 明天来调
        //   // }
        // }
      }
    );
  }

  awaitExpect = async () => {
    const { commonCmdCode } = this.props;
    const expectValue = [
      {
        dpCode: commonCmdCode,
        comparator: (value = '') => {
          const { infoType, data } = Utils.JsonUtils.parseJSON(atHexToString(value)) || {};
          if (infoType === 21031) {
            if (data && data.code !== multiMap.IUploadCode.success) {
              throw Error(data.code);
            } else return true;
          }
          return false;
        },
      },
    ];
    await awaitExpectDpsState(expectValue, 32000, {
      onError: (e: Error) => {
        const { message } = e;
        if (message === 'DpTimeOut') {
          Toast.debounceInfo(I18n.getLang('networkTimeout'));
        } else {
          Toast.debounceInfo(`${I18n.getLang('mapChange_Error')} ${message}`);
        }
        console.log('getRecord', e);
        TYSdk.mobile.hideLoading();
      },
    });
  };

  getRecord = async () => {
    const { commonCmdCode } = this.props;
    // 取全量数据
    const result = await multiMap.getMultiMapsFromServer();
    // 取到云端数据后下发给机器
    const data = multiMap.putServerMapsToLocal(result);

    TYSdk.device.putDeviceData({
      [commonCmdCode]: stringToAtHex(JSON.stringify(data)),
    });

    await this.awaitExpect();
    // 再次取全量数据
    const result2 = await multiMap.getMultiMapsFromServer();
    this.setState({
      dataSource: result2,
    });
  };

  putSaveToServer = async () => {
    const { commonCmdCode } = this.props;
    TYSdk.device.putDeviceData({
      [commonCmdCode]: stringToAtHex(JSON.stringify(multiMap.saveServer())),
    });

    await this.awaitExpect();
    const result = await multiMap.getMultiMapsFromServer();
    // this.state.dataSource.length

    if (result) {
      Toast.debounceInfo(I18n.getLang('changeMap_success'));
      this.setState({
        dataSource: result,
      });
    }
  };

  // putSaveToLocal = async () => {
  //   const { commonCmdCode } = this.props;
  //   TYSdk.device.putDeviceData({
  //     [commonCmdCode]: stringToAtHex(JSON.stringify(multiMap.saveLocal())),
  //   });

  //   await this.awaitExpect();
  //   const result = await multiMap.getMultiMapsFromServer();
  // };

  handlePutSaveCurMap = async () => {
    TYSdk.mobile.showLoading();
    await this.putSaveToServer();
    TYSdk.mobile.hideLoading();
  };

  handlePutResetCurMap = () => {
    const { resetMapCode } = this.props;
    Api.simpleConfirmDialog(
      I18n.getLang('tips'),
      I18n.getLang('changeMap_isReset'),
      () => {
        TYSdk.device.putDeviceData({
          [resetMapCode]: true,
          option: 0,
        });
      },
      () => {}
    );
  };

  handleChangeMap = (data: { bucket: string; file: string; md5: string; id: number }) => {
    const { commonCmdCode } = this.props;
    Api.simpleConfirmDialog(
      I18n.getLang('tips'),
      I18n.getLang('changeMap_isChange'),
      async () => {
        TYSdk.mobile.showLoading();

        const cmd = multiMap.setCurMapsFromServerByServerId(data.id);
        TYSdk.device.putDeviceData({
          [commonCmdCode]: stringToAtHex(JSON.stringify(cmd)),
        });
        await this.awaitExpect();
        TYSdk.mobile.hideLoading();
        Toast.debounceInfo(I18n.getLang('changeMap_isChangeSuccess'));
      },
      () => {}
    );
  };

  handleDeleteMap = async (data: { id: number }) => {
    const { commonCmdCode } = this.props;
    if (!data.id) return;

    const cmd = multiMap.deleteFromServer(data.id);
    TYSdk.mobile.showLoading();
    TYSdk.device.putDeviceData({
      [commonCmdCode]: stringToAtHex(JSON.stringify(cmd)),
    });

    await this.awaitExpect();
    const result = await multiMap.getMultiMapsFromServer();

    if (result) {
      TYSdk.mobile.hideLoading();
      Toast.debounceInfo(I18n.getLang('changeMap_success'));

      this.setState({
        dataSource: result,
      });
    }
  };

  renderSubButton(recordData: IHistoryMapData) {
    const { themeColor } = this.props;
    const { md5, robotMapId, backupFile, bucket, id } = recordData;
    return (
      <SubButton
        onSet={() => {
          this.handleChangeMap({
            md5,
            file: backupFile,
            bucket,
            id: Number(id),
          });
        }}
        onDelete={() => {
          this.handleDeleteMap({ id: Number(id) });
        }}
        setButtonBg={themeColor}
      />
    );
  }

  renderMap(recordData?: IHistoryMapData) {
    const { laserMapConfig } = this.props;

    const uiInterFace = {
      isEdit: false,
      isShowAppoint: false,
      isShowSweepPath: false,
      isStatic: true,
      isUseHistoryMapCache: false,
    };
    const mapDisplayMode = recordData?.historyFile ? 'history' : 'splitMap';
    const mapHistory = recordData?.historyFile
      ? {
          file: recordData.historyFile,
          bucket: recordData.bucket,
          id: recordData.id,
        }
      : undefined;
    return (
      <View style={styles.map} pointerEvents="none">
        <LaserSweepMapLeDong
          uiInterFace={uiInterFace}
          config={laserMapConfig}
          history={mapHistory}
          mapDisplayMode={mapDisplayMode}
        />
      </View>
    );
  }

  render() {
    const { themeColor } = this.props;
    const { dataSource } = this.state;
    const nowTime = moment(new Date()).format('YYYY.MM.DD HH:mm');
    return (
      <ScrollView style={styles.root}>
        <Item title={I18n.getLang('curMap')} subTitle={`${nowTime}`}>
          {this.renderMap()}
          <MainButton
            onReset={() => {
              this.handlePutResetCurMap();
            }}
            onSave={() => {
              this.handlePutSaveCurMap();
            }}
            saveButtonBg={themeColor}
          />
        </Item>
        {dataSource.map((data, i) => {
          const { startTime } = data;
          const historyTime = moment.unix(Number(startTime)).format('YYYY.MM.DD HH:mm');
          return (
            <Item
              key={`map_${data.id}`}
              title={I18n.getLang(`mapChange_floor_${i + 1}`)}
              subTitle={`${historyTime}`}
            >
              {this.renderMap(data)}
              {this.renderSubButton(data)}
            </Item>
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  map: {
    height: cx(200),
  },
});
