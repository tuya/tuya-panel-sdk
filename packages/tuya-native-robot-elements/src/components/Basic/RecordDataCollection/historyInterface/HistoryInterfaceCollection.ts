/** 扫地机清扫记录
 * 接口： m.smart.scale.history.get.list
 */

import { Utils, TYSdk } from '@tuya-rn/tuya-native-components';
import moment from 'moment';

import Api from '../../../../api';
import Record from '@RecordDataCollection';
import RecordCollection from '../RecordCollection';

export default class HistoryInterfaceCollection extends RecordCollection {
  cleanRecordCode = 'clean_record';

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

  constructor(data?: { cleanRecordCode: string }) {
    super();
    const { cleanRecordCode } = data || {};
    if (cleanRecordCode) this.cleanRecordCode = cleanRecordCode;
  }

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
    return { ...this.store };
  };

  fetch = async (): Promise<void> => {
    const { isRequesting, offset, pageSize } = this.getStatus();

    if (isRequesting) return;

    this.setStatus({ isRequesting: true });
    TYSdk.mobile.showLoading();

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

    TYSdk.mobile.hideLoading();
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

  getSectionList(data: Record.IRecordInterfaceOriginData[]): Record.IRecordSectionList[] {
    const titleList: { [index: string]: string } = {};
    const sectionList = [];
    for (let i = 0; i < data.length; i++) {
      const d = data[i];
      const date = moment(d.gmtCreate).format('YYYY-MM-DD');

      if (!titleList[date]) {
        sectionList.push({
          title: date,
          data: [d],
          // key: date,
        });
        titleList[date] = date;
      } else {
        for (let j = 0; j < sectionList.length; j++) {
          const dj = sectionList[j];
          const dateDj = dj.title;
          if (date === dateDj) {
            dj.data.push({
              // key: i,
              ...d,
            });
            break;
          }
        }
      }
    }
    return sectionList;
  }

  fetchData(): Promise<Record.IRecordInterfaceOriginData> {
    const { offset, pageSize } = this.getStatus();
    const { logData, sectionListData = [] } = this.getStore();
    const dpIdRecords = [Number(TYSdk.device.getDpIdByCode(this.cleanRecordCode))];

    return new Promise((resolve, reject) => {
      Api.getGyroMapHistoryList(dpIdRecords, offset, pageSize).then(
        (d: any) => {
          // console.warn(
          //   { dpIdRecords, offset, pageSize, d },
          //   TYSdk.device.getDpIdByCode(this.cleanRecordCode),
          //   this.cleanRecordCode
          // );

          if (typeof d.datas === 'undefined' || d.datas.length === 0) {
            resolve(d);
            return;
          }

          const newData = this.getSectionList(d.datas);

          this.setStore({
            logData: [...logData, ...d.datas],
            sectionListData: [...sectionListData, ...newData],
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

  parseOneRecord(item: Record.IRecordInterfaceOriginData) {
    const {
      dps: [recordDp],
      gmtCreate,
    } = item;
    const value = recordDp[TYSdk.device.getDpIdByCode(this.cleanRecordCode)];

    if (!value) return null;

    const timeAndAreanoWithRecordIdLength = 6;
    const timeAndAreaWithRecordIdLength = 11;
    const dateAndArea3AndCleanTime3WithRecordIdLength = 23;
    const dateAndArea4AndCleanTime4WithRecordIdLength = 25;

    const [reg, regString] = (() => {
      switch (value.length) {
        case timeAndAreanoWithRecordIdLength:
          return [/(\w{3})(\w{3})/, '$1_$2'];

        case timeAndAreaWithRecordIdLength:
          return [/(\w{3})(\w{3})(\w{5})/, '$1_$2_$3'];
        case dateAndArea3AndCleanTime3WithRecordIdLength:
          return [
            /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{3})(\d{3})(\d{5})/,
            '$1_$2_$3_$4_$5_$6_$7_$8',
          ];
        case dateAndArea4AndCleanTime4WithRecordIdLength:
          return [
            /(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{4})(\d{4})(\d{5})/,
            '$1_$2_$3_$4_$5_$6_$7_$8',
          ];
      }
      return ['', ''];
    })();

    switch (value.length) {
      case timeAndAreanoWithRecordIdLength:
      case timeAndAreaWithRecordIdLength: {
        const [cleanTime, cleanArea, recordId] = value.replace(reg, regString).split('_');
        const [dateTitle, time12, time12Unit] = moment(gmtCreate)
          .format('YYYY-MM-DD_hh:mm_A')
          .split('_');
        const [cleanAreaInt, cleanTimeInt] = [cleanArea, cleanTime].map(d => parseInt(d, 10));
        return {
          id: recordId,
          cleanTime: cleanTimeInt,
          cleanArea: cleanAreaInt,
          recordId,
          dateTitle,
          time12,
          time12Unit,
        };
      }

      case dateAndArea3AndCleanTime3WithRecordIdLength:
      case dateAndArea4AndCleanTime4WithRecordIdLength: {
        const [year, month, day, hour, minute, cleanTime, cleanArea, recordId] = value
          .replace(reg, regString)
          .split('_');
        const [dateTitle, time12, time12Unit] = moment(
          `${year}${month}${day}${hour}${minute}`,
          'YYYYMMDDHHmm'
        )
          .format('YYYY-MM-DD_hh:mm_A')
          .split('_');
        const [cleanAreaInt, cleanTimeInt] = [cleanArea, cleanTime].map(d => parseInt(d, 10));
        return {
          id: recordId,
          cleanTime: cleanTimeInt,
          cleanArea: cleanAreaInt,
          recordId,
          dateTitle,
          time12,
          time12Unit,
        };
      }
    }

    return null;
  }
}
