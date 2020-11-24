import Record from '@RecordDataCollection';

// 数据合集的抽象类。

abstract class RecordCollection {
  /**
   * 清扫记录状态
   */
  abstract status: Record.IRecordCollectionState;

  /**
   * 清扫记录数据
   */
  abstract store: Record.IRecordCollectionStore;

  /**
   * 设置清扫记录状态
   */
  abstract setStatus(newStatus: Object): void;

  /**
   * 设置清扫记录数据
   */
  abstract setStore(newStore: Object): void;

  /**
   * 初始化清扫记录数据
   */
  abstract init(): void;

  /**
   * 获取清扫记录状态
   */
  abstract getStatus(): Record.IRecordCollectionState;

  /**
   * 获取清扫记录数据
   */
  abstract getStore(): Record.IRecordCollectionStore;

  /**
   * 获取清扫记录（改变清扫状态，不请求接口）
   */
  abstract async fetch(): Promise<void>;

  /**
   * 调接口请求清扫记录
   */
  abstract fetchData(): Promise<Record.IRecordOriginData>;

  /**
   * 删除本地记录
   */
  abstract deleteLocalDataById(id: number): void;

  /**
   * 调接口删除单条记录
   */
  abstract deleteRecordById(id: number): void;

  /**
   * 调接口删除多条记录
   */
  abstract deleteRecordByIds(ids: number[]): void;

  /**
   * 生成SectionList格式的列表
   */
  abstract getSectionList(data: Record.IRecord[] | Record.IRecordInterfaceOriginData[]): Record.IRecordSectionList[];

  /**
   * 解析单条清扫记录
   */
  abstract parseOneRecord(
    item: Record.IRecord | Record.IRecordInterfaceOriginData | string
  ): Record.IRecord | null;
}

export default RecordCollection;
