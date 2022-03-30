// 定义全局变量

const Global: {
  requestTimeOut: number;
  enterBackTimeOut: number;
  // 管理多个设备互斥状态
  // 扬声器每一次只能开启一个
  // 若用户未管理该状态，将由组件内部进行管理
  // deviceStatusStore: deviceSameStatus;
  deviceStatusStore: any;
} = {
  requestTimeOut: 0,
  enterBackTimeOut: 0,
  deviceStatusStore: {},
};

export default Global;
