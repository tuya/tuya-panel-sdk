/* 遥控指令*/
const infoType = 21020;

export enum IRemoteDirection {
  front = 3005,
  back = 3006,
  left = 3007,
  right = 3008,
}

function encodeCmd(code: number, params: any = {}) {
  const userId = '0';
  const time = new Date().getTime();
  return {
    infoType,
    data: {
      ctrlCode: code,
      params,
    },
    dInfo: {
      ts: `${time}`,
      userId,
    },
  };
}

// 下发方向指令
function putRemoteCmd(direction: IRemoteDirection) {
  // const code = IRemoteDirection[direction]
  return encodeCmd(direction);
}

// 设置速度
function setRemoteSpeed(VSpeed?: number, WSpeed?: number) {
  const setSpeed = 3013;
  const params = {};
  VSpeed && (params['speed_v'] = VSpeed);
  WSpeed && (params['speed_w'] = WSpeed);
  return encodeCmd(setSpeed, params);
}

// 退出遥控
function exitRemote() {
  const exit = 4000;
  return encodeCmd(exit);
}

export default {
  IRemoteDirection,
  putRemoteCmd,
  setRemoteSpeed,
  exitRemote,
}