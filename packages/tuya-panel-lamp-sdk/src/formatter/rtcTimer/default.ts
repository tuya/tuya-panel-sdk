// 开始执行动作关灯
export const singleOffValue = {
  repeat: '00000000',
  startDpData: { actionType: 0, power: false },
  startTime: 1080,
  startTimeType: 0,
  status: true,
  timerId: 1,
  type: 1,
};

// 开始执行动作彩光
export const singleOnValue = {
  repeat: '00000000',
  startDpData: { actionType: 3, hue: 0, saturation: 1000, value: 1000 },
  startTime: 1080,
  startTimeType: 0,
  status: true,
  timerId: 1,
  type: 1,
};

// 开始执行动作彩光，结束执行动作关灯
export const rangeOffValue = {
  timerId: 1, // 定时任务id
  status: true, // 状态 开/关
  type: 2, // 类型 00-删除指令 01-单次 02-两个时间节点
  repeat: '00000000', // 周循环
  startTimeType: 0, // 0-精确时间
  startTime: 1080, // 起始时间 分
  startDpData: { actionType: 3, hue: 0, saturation: 1000, value: 1000 },
  endTimeType: 0,
  endTime: 1240,
  endDpData: {
    actionType: 0,
    power: false,
  },
};

// 开始执行动作白光，结束执行动作太阳能模式白光
export const rangeSolarValue = {
  timerId: 1, // 定时任务id
  status: true, // 状态 开/关
  type: 2, // 类型 00-删除指令 01-单次 02-两个时间节点
  repeat: '00000000', // 周循环
  startTimeType: 0, // 0-精确时间
  startTime: 1080, // 起始时间 分
  startDpData: { actionType: 2, brightness: 1000, temperature: 500 },
  endTimeType: 0,
  endTime: 1240,
  endDpData: {
    actionType: 7,
    brightness: 1000,
    temperature: 500,
  },
};

export interface IData {
  timerId: number;
  status: boolean;
  type?: number;
  repeat?: string;
  startTimeType?: number;
  startTime?: number;
  startDpData?: Item;
  endTimeType?: number;
  endTime?: number;
  endDpData?: Item;
}

export interface Item {
  actionType: number;
  brightness?: number;
  temperature?: number;
  hue?: number;
  saturation?: number;
  value?: number;
  power?: boolean;
}
