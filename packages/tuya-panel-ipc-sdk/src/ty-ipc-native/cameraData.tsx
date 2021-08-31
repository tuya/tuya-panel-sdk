import Strings from '../ty-ipc-player/i18n';

export const decodeClarityDic = {
  SS: 1, // 省流量
  SD: 2, // 标清
  HD: 4, // 高清
  UD: 6, // 超清
  SSP: 8, // 超超清
  AUDIO: 65535, // 音频模式
};

export const videoLoadText = {
  /* 返回状态进行定义
     status:  0: 设备离线 1: 隐私模式 2: 正在连接P2P通道 3: 通道构建失败 4: 正在获取视频流 5: 获取视频流失败 6: 正常播放
  */
  0: Strings.getLang('tyIpc_device_off_line'), // 设备离线
  1: Strings.getLang('tyIpc_private_mode_sleep'), // 隐私模式
  2: Strings.getLang('tyIpc_video_channel_connecting'), // 正在连接P2P通道
  3: Strings.getLang('tyIpc_video_channel_connect_fail'), // 通道构建失败
  4: Strings.getLang('tyIpc_video_get_stream_ing'), // 正在获取视频流
  5: Strings.getLang('tyIpc_video_get_stream_failure'), // 获取视频流失败
  6: Strings.getLang('tyIpc_video_channel_connecting'), // 正常播放
  8: Strings.getLang('tyIpc_video_channel_pause'), // 暂停播放 视频暂停中 点击开启
};
