import { Observable, Scheduler } from 'rxjs';
import { filter, map, concatMap, partition } from 'rxjs/operators';
import 'rxjs/operators/pluck';
import 'rxjs/operators/filter';
import 'rxjs/operators/map';
import 'rxjs/operators/concatMap';
import 'rxjs/operators/partition';
import 'rxjs/operators/scan';
import 'rxjs/operators/withLatestFrom';

import { TYSdk, Utils } from 'tuya-panel-kit';
import { Platform } from 'react-native';

import Api from '../../../api/customApi';
import { TYLaserManager } from '../../../components/Basic/RCTLaserMap';
import logger from '../../LoggerUtils';
import { handleError } from '../../FunctionUtils';
// import testData from './test.json';
// import testPath from './testPath.json';

// eslint-disable-next-line no-shadow
enum LaserMapOssType {
  // eslint-disable-next-line no-shadow
  map = 0,
  path = 1,
  increPath = 2,
  planPath = 3,
}

const hour = 1000 * 60 * 10;
const waitTime = Platform.OS === 'android' ? 3000 : 2500;

let canUpdateMap = true;

TYSdk.event.on('MapShouldUninterruptibleSleep', () => {
  canUpdateMap = false;
});

TYSdk.event.on('MapCanRunnable', () => {
  canUpdateMap = true;
});

function getMapPath({ mapPath }) {
  return mapPath;
}
function createIsEqualType(curType: any) {
  return function isEqual({ mapType }) {
    return curType === mapType;
  };
}

function isValidPath(value: any) {
  if (value instanceof Error) {
    handleError(value);
    return false;
  }
  try {
    return !!value.id;
  } catch (error) {
    return false;
  }
}

function extractError(error: Error) {
  console.warn('extractError', error);

  return Observable.of(error);
}

function isNotError(value: any) {
  if (value instanceof Error) {
    console.warn('isNotError', value);

    handleError(value);
    return false;
  }
  return true;
}

interface IOSSRxConfig {
  fileType: 'blob' | 'text';
}

class OSSRx {
  config: IOSSRxConfig = {
    fileType: 'text',
  };

  constructor(config: IOSSRxConfig | null = null) {
    if (config) this.config = { ...config };
    // const Rx = this.createRx();
    // if (__DEV__) {
    //   this.logger(Rx);
    // }
  }

  getContent = async (url: string) => {
    const { fileType } = this.config;
    const data = await Api.downloadFile(url, fileType);
    return data;
  };

  getCloudFileUrlWithAuth = async (bucket: string, path: string) => {
    await Api.updateCloudConfig();
    const url = await Api.getCloudFileUrl(bucket, path);
    return url;
  };

  createRx = () => {
    // --------------------rx ---------------------

    const bucket$ = Observable.timer(0, hour)
      .pipe(concatMap(() => Observable.fromPromise(Api.updateCloudConfig())))
      .share();

    // 一定要鉴权完才拿链接
    const [mapFilePathInitial$, pathFilePathInitial$] = bucket$
      .first()
      .pipe(concatMap(() => Observable.fromPromise(Api.getLatestMapFile())))
      .pipe(
        concatMap(({ mapPath, routePath }) => Observable.of(mapPath, routePath)),
        partition((_, idx) => idx === 0)
      );

    // 流程：机器上传阿里云oss，bin文件。包括地图的map.bin和路径route.bin。云端通过mqtt 推送，通知我们文件更新了，给到我们文件的路径，让我们去下载bin文件解析内容。

    // TODO1 通过mqtt获取到机器上传的更新的地图文件和路径文件 { mapPath: 文件url, mapType: 文件类型(地图0，清扫路径1，规划路径2) }。

    const channel$ = Observable.fromEventPattern(
      (handle: any) => {
        TYLaserManager.startConnectSweeperDataChannel();
        TYSdk.DeviceEventEmitter.addListener('laserMqttEventData', handle);
      },
      (handle: any) => {
        // TYLaserManager.stopConnectSweeperDataChannel();
        TYSdk.DeviceEventEmitter.removeListener('laserMqttEventData', handle);
      }
    )
      .observeOn(Scheduler.animationFrame)
      .pipe(filter(() => canUpdateMap))
      .share();

    /**
     * TODO2 将机器更新的文件路径数据流，拆分为三个独立的数据流：地图数据流，清扫路径流，规划路径流。 如地图文件路径数据流[ path1, path2, path3 ]
     */

    const mapFilePathChannel$ = channel$
      .pipe(
        filter(createIsEqualType(LaserMapOssType.map)),
        // throttleTime(waitTime),
        map(getMapPath),
        map((d, idx) => {
          console.log(`coastTime RX${idx} 开始：${new Date()}`);
          return d;
        })
      )
      .observeOn(Scheduler.animationFrame)
      .share();

    const pathFilePathChannel$ = channel$
      .pipe(
        filter(createIsEqualType(LaserMapOssType.path)),
        // throttleTime(waitTime),
        map(getMapPath)
      )
      .observeOn(Scheduler.animationFrame)
      .do(value => {
        logger.info('实时路径文件通道', value);
      })
      .share();

    const planPathFilePathChannel$ = channel$
      .pipe(
        filter(createIsEqualType(LaserMapOssType.planPath)),
        // throttleTime(waitTime),
        map(getMapPath)
      )
      .observeOn(Scheduler.animationFrame)
      .share();

    /**
     * TODO3 将三个路径数据流，start开端加入一个起始数据后，并且通过合并bucket$服务端鉴权的key数据流,一小时更新一次, merge成新的路径数据流 [ [ path1, bucket1 ], [ path2, bucket1 ], [ path3, bucket2 ] ]
     */

    const mapFilePath$ = Observable.merge(
      Observable.zip(mapFilePathInitial$, bucket$).take(1),
      mapFilePathChannel$.withLatestFrom(bucket$)
    )
      .do(d => {
        console.warn('mapFilePath$', d);
      })
      .observeOn(Scheduler.animationFrame)
      .share();

    const pathFilePath$ = Observable.merge(
      Observable.zip(pathFilePathInitial$, bucket$).take(1),
      pathFilePathChannel$.withLatestFrom(bucket$)
    )
      .observeOn(Scheduler.animationFrame)
      .share();

    const planPathFilePath$ = Observable.merge(
      Observable.zip(planPathFilePathChannel$, bucket$).take(1),
      planPathFilePathChannel$.withLatestFrom(bucket$)
    )
      .observeOn(Scheduler.animationFrame)
      .share();
    /**
     * TODO4 将三个文件路径数据流，[path, bucket]，通过调接口返回一个真实文件的url下载链接数据流. [url1, url2]
     */
    const [mapFileUrl$, fullPathFileUrl$, planPathFileUrl$] = [
      mapFilePath$,
      pathFilePath$,
      planPathFilePath$,
    ].map(path$ =>
      path$.pipe(
        concatMap(([path, bucket]) => Observable.fromPromise(Api.getCloudFileUrl(bucket, path)))
      )
    );

    /**
     * TODO5 订阅url数据流，去下载文件并且解析成 data数据流。全量地图数据流，全量路径数据流，规划路径数据流
     */
    const mapFileData$ = mapFileUrl$
      .concatMap((url: string) => {
        logger.info('地图完整路径', url);
        const disposableStream$ = Observable.fromPromise(this.getContent(url)).retry(3);
        return disposableStream$.catch(e => {
          TYSdk.event.emit('MapServiceChannelUtils_OSSFullMapFileErr', e);
          return Observable.of();
        });
      })
      .observeOn(Scheduler.animationFrame)
      .share();

    const fullPathFileData$ = fullPathFileUrl$
      .concatMap((url: string) => {
        logger.info('路径文件完整路径', url);
        const disposableStream$ = Observable.fromPromise(this.getContent(url)).retry(3);
        // return disposableStream$.catch(extractError);
        return disposableStream$.catch(e => {
          // showToast(i18n.getLang('networkTimeout'));
          TYSdk.event.emit('MapServiceChannelUtils_OSSFullPathFileErr', e);
          return Observable.of();
        });
      })
      .observeOn(Scheduler.animationFrame)
      .share();

    const planPathFileData$ = planPathFileUrl$
      .concatMap((url: string) => {
        const disposableStream$ = Observable.fromPromise(this.getContent(url)).retry(3);
        // return disposableStream$.catch(extractError);
        return disposableStream$.catch(e => {
          // showToast(i18n.getLang('networkTimeout'));
          TYSdk.event.emit('MapServiceChannelUtils_OSSPlanPathFileErr', e);
          return Observable.of();
        });
      })
      .observeOn(Scheduler.animationFrame)
      .share();

    // ------------ rx end ------------------------

    const mapFileDataOrigin$ = mapFileData$
      .observeOn(Scheduler.async)
      .do(
        d => {
          TYSdk.event.emit('MapServiceChannelUtils_OSSFullMapFileSuccess', {});
          logger.success('全量地图数据-mapFileData$', Utils.JsonUtils.parseJSON(d));
        },
        d => {
          // logger.error('全量地图数据-mapFileData$', d);
        }
      )
      .observeOn(Scheduler.animationFrame)
      .share();
    // const testStr = JSON.stringify(testData)
    // const mapFileDataOrigin$ = Observable.interval(2000)
    //   .concatMapTo(Observable.of(testStr))
    //   .do(
    //     d => {
    //       TYSdk.event.emit('MapServiceChannelUtils_OSSFullMapFileSuccess', {});
    //       logger.success('全量地图数据-mapFileData$', Utils.JsonUtils.parseJSON(d));
    //     },
    //     d => {
    //       // logger.error('全量地图数据-mapFileData$', d);
    //     }
    //   );

    const fullPathFileDataOrigin$ = fullPathFileData$
      .do(
        (d: any) => {
          logger.success('全量路径数据-fullPathFileData$');
        },
        d => {
          // logger.error('全量路径数据-fullPathFileData$$', d);
        }
      )
      .observeOn(Scheduler.animationFrame)
      .share();
    // const testStr2 = JSON.stringify(testPath)
    // const fullPathFileDataOrigin$ = Observable.interval(2000)
    //   .concatMapTo(Observable.of(testStr2))
    //   .do(
    //     d => {
    //       TYSdk.event.emit('MapServiceChannelUtils_OSSFullMapFileSuccess', {});
    //       logger.success('全量路径数据-fullPathFileData$', Utils.JsonUtils.parseJSON(d));
    //     },
    //     d => {
    //       // logger.error('全量地图数据-mapFileData$', d);
    //     }
    //   );

    const planPathFileDataOrigin$ = planPathFileData$
      .do(
        (d: any) => {
          // logger.success('全量规划路径数据-planPathFileData$', Utils.JsonUtils.parseJSON(d));
        },
        d => {
          // logger.error('全量规划路径数据-planPathFileData$', d);
        }
      )
      .observeOn(Scheduler.animationFrame)
      .share();

    // ------ logger ------------

    if (__DEV__) {
      // mapFilePath$.subscribe(d => {
      //   logger.success('全量地图文件路径-mapFilePath$', d);
      // });
      // mapFileUrl$.subscribe(d => {
      //   logger.success('全量地图url-mapFileUrl$', d);
      // });
      // fullPathFileUrl$.subscribe(d => {
      //   logger.success('全量路径文件url-fullPathFileUrl$', d);
      // });
      // mapFileData$.subscribe(d => {
      //   logger.success('全量地图数据-mapFileData$', d);
      // });
      // mapFilePathChannel$.subscribe(d => {
      //   logger.success('mapFilePathChannel$', d);
      // });
      // pathFilePathChannel$.subscribe(d => {
      //   logger.success('pathFilePathChannel$', d);
      // });
      // planPathFilePathChannel$.subscribe(d => {
      //   logger.success('planPathFilePathChannel$', d);
      // });
      // fullPathFileData$.subscribe((d: any) => {
      //   logger.success('全量路径数据-fullPathFileData$', d);
      // }, handleError);
      // mapFileData$.subscribe((data: any) => {
      //   logger.success('地图数据更新-fullMapFileData$', data);
      // }, handleError);
    }

    return {
      mapFileData$: mapFileDataOrigin$,
      fullPathFileData$: fullPathFileDataOrigin$,
      planPathFileData$: planPathFileDataOrigin$,

      mapFileUrl$,
      fullPathFileUrl$,
    };
    // return {
    //   mapFileData$,
    //   fullPathFileData$,
    //   planPathFileData$,

    //   mapFileUrl$,
    //   fullPathFileUrl$,
    // };
  };

  createHistoryDataRx = (config: { bucket: string; file: string }) => {
    const { bucket, file } = config;

    // const bucket$ = Observable.timer(0, hour).pipe(
    //   concatMap(() => Observable.fromPromise(Api.updateCloudConfig()))
    // );

    const historyUrl$ = Observable.fromPromise(this.getCloudFileUrlWithAuth(bucket, file));
    const historyFileData$ = historyUrl$
      .pipe(
        concatMap(url => Observable.fromPromise(this.getContent(url)).catch(extractError)),
        filter(isNotError)
      )
      .do(d => {
        logger.success('历史地图数据-historyFileData$', d);
      });

    // ------------ logger --------------------
    // bucket$.subscribe(d => {
    //   logger.success('历史鉴权-bucket$', d);
    // })

    // historyFileData$.subscribe(d => {
    //   // logger.success('历史地图数据-historyFileData$', d);
    // });

    // historyUrl$.subscribe(d => {
    //   // logger.success('历史地图url-historyUrl$', d);
    // });

    return historyFileData$;
  };

  createHistoryDatasRx = (config: { bucket: string; file: string }) => {
    const { bucket, file } = config;

    // const bucket$ = Observable.timer(0, hour).pipe(
    //   concatMap(() => Observable.fromPromise(Api.updateCloudConfig()))
    // );

    const historyUrl$ = Observable.fromPromise(this.getCloudFileUrlWithAuth(bucket, file));
    const historyFileData$ = historyUrl$.pipe(
      concatMap(url => Observable.fromPromise(this.getContent(url)).catch(extractError)),
      filter(isNotError)
    );

    // ------------ logger --------------------
    // bucket$.subscribe(d => {
    //   logger.success('历史鉴权-bucket$', d);
    // })

    // historyFileData$.subscribe(d => {
    //   // logger.success('历史地图数据-historyFileData$', d);
    // });

    // historyUrl$.subscribe(d => {
    //   logger.success('历史地图url-historyUrl$', d);
    // });

    return {
      historyUrl$,
      historyFileData$,
    };
  };
}

export default OSSRx;
