/**  OSS通道扫地机清扫记录 */

import Api from '../../../../api';
import Record from '@RecordDataCollection';
import RecordCollection from '../RecordCollection';

export default class OSSRecordCollection extends RecordCollection {
  status: Record.IRecordCollectionState = {
    hasNextPage: false,
    offset: 0,
    isRequesting: false,
    pageSize: 10,
  };

  store: Record.IRecordCollectionStore = {
    logData: [], // 原始数据
    sectionListData: [], // SectionList 类型数据
    totalCount: 0,
  };

  setStatus = (newStatus: Object) => {
    this.status = {
      ...this.status,
      ...newStatus,
    };
  };

  setStore = (newStore: Object) => {
    this.store = {
      ...this.store,
      ...newStore,
    };
  };

  init = () => {
    this.setStatus({
      hasNextPage: false,
      offset: 0,
      isRequesting: false,
      pageSize: 10,
    });
    this.setStore({
      logData: [],
      sectionListData: [],
      totalCount: 0,
    });
  };

  getStatus = (): Record.IRecordCollectionState => {
    return { ...this.status };
  };

  getStore = (): Record.IRecordCollectionStore => {
    return { ...this.store, sectionListData: this.getSectionList(this.store.logData) };
  };

  fetch = async (): Promise<void> => {
    const { isRequesting, offset, pageSize } = this.getStatus();

    if (isRequesting) return;

    this.setStatus({ isRequesting: true });
    // TYSdk.mobile.showLoading();

    try {
      const d: Record.IRecordOriginData = await this.fetchData();
      const isNext = offset < d.totalCount;

      this.setStatus({
        hasNextPage: isNext,
        offset: isNext ? offset + pageSize : offset,
      });
    } catch (e) {
      console.log('fetch==', e);
    }

    // TYSdk.mobile.hideLoading();
    this.setStatus({ isRequesting: false });
  };

  deleteLocalDataById = (id: number) => {
    const { logData } = this.getStore();
    const deleteIndex = logData.findIndex(item => item.id === id);
    const newLogData = [...logData];
    newLogData.splice(deleteIndex, 1);
    const dataSource = this.getSectionList(newLogData);
    this.setStore({ sectionListData: dataSource, logData: newLogData });
  };

  deleteRecordById = (id: number) => {
    return new Promise((resolve, reject) => {
      Api.deleteLog(id)
        .then(d => {
          this.deleteLocalDataById(id);
          resolve();
        })
        .catch(e => {
          reject(e);
        });
    });
  };

  deleteRecordByIds = (ids: number[] = []) => {
    return new Promise((resolve, reject) => {
      Api.deleteLog(...ids)
        .then(d => {
          ids.forEach(id => this.deleteLocalDataById(id));

          resolve();
        })
        .catch(e => {
          reject(e);
        });
    });
  };

  getSectionList(data: Record.IRecord[]): Record.IRecordSectionList[] {
    const titleList: { [index: string]: string } = {};
    const sectionList = [];
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const item = this.parseOneRecord(d);
      if (!item) continue;
      const { sectionTitle } = item;

      // const date: string = Utils.TimeUtils.dateFormat('yyyy-MM-dd', new Date(parseInt(`${d.time}000`, 10)));

      if (!titleList[sectionTitle]) {
        sectionList.push({
          title: sectionTitle,
          data: [item],
        });
        titleList[sectionTitle] = sectionTitle;
      } else {
        for (let j = 0; j < sectionList.length; j++) {
          const dj = sectionList[j];
          const dateDj = dj.title;
          if (sectionTitle === dateDj) {
            dj.data.push(item);
            break;
          }
        }
      }
    }
    
    return sectionList;
  }

  fetchData(): Promise<Record.IRecordOriginData> {
    const { offset, pageSize } = this.getStatus();
    const { logData,  } = this.getStore();

    return new Promise((resolve, reject) => {
      Api.getHistoryFileList('pic', offset, pageSize).then(
        (d: Record.IRecordOriginData) => {
          if (typeof d.datas === 'undefined' || d.datas.length === 0) {
            resolve(d);
          }

          // const newData = this.getSectionList(d.datas);
          this.store.logData.push(...d.datas)
          

          this.setStore({
            // logData: [...logData, ...d.datas],
            // sectionListData: [...sectionListData, ...newData],
            totalCount: d.totalCount,
          });

          resolve(d);
        },
        e => {
          console.warn('=====eeee', e);
          reject(e);
        }
      );
    });
  }

  parseOneRecord(item: Record.IRecord): Record.IRecord | any {}
}
