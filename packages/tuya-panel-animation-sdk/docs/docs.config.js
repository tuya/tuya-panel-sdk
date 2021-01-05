module.exports = [
  {
    name: 'CountDown',
    nameZh: '倒计时动画',
    file: 'tuya-native-animation-elements/lib/components/countdown/index.js',
    entry: 'tuya-native-animation-elements/src/components/countdown/index.js',
  },
  {
    name: 'TimeCheck',
    nameZh: '时间校准动画',
    file: 'tuya-native-animation-elements/lib/components/timeCheck/index.js',
    entry: 'tuya-native-animation-elements/src/components/timeCheck/index.js',
  },
  {
    name: 'ModeChange',
    nameZh: '模式切换动画',
    file: 'tuya-native-animation-elements/lib/components/modeChange/index.js',
    entry: [
      {
        title: 'ModeChange.Scale',
        path: 'tuya-native-animation-elements/src/components/modeChange/scale.js',
      },
      {
        title: 'ModeChange.Move',
        path: 'tuya-native-animation-elements/src/components/modeChange/move.js',
      },
    ],
  },
  {
    name: 'NumberChange',
    nameZh: '数字切换动画',
    file: 'tuya-native-animation-elements/lib/components/numberChange/index.js',
    entry: 'tuya-native-animation-elements/src/components/numberChange/index.js',
  },
  {
    name: 'Drawer',
    nameZh: '抽屉动画',
    file: 'tuya-native-animation-elements/lib/components/drawer/index.js',
    entry: 'tuya-native-animation-elements/src/components/drawer/index.js',
  },
  {
    name: 'Diffusion',
    nameZh: '波纹扩散动画',
    file: 'tuya-native-animation-elements/lib/components/diffusion/index.js',
    entry: 'tuya-native-animation-elements/src/components/diffusion/index.js',
  },
  {
    name: 'JitterAlert',
    nameZh: '抖动提醒动画',
    file: 'tuya-native-animation-elements/lib/components/jitterAlert/index.js',
    entry: 'tuya-native-animation-elements/src/components/jitterAlert/index.js',
  },
  {
    name: 'WaveView',
    nameZh: '水波动画',
    file: 'tuya-native-animation-elements/lib/components/waveView/index.js',
    entry: 'tuya-native-animation-elements/src/components/waveView/index.js',
  },
  {
    name: 'ScaleCarousel',
    nameZh: '轮播切换动画',
    file: 'tuya-native-animation-elements/lib/components/scaleCarousel/index.js',
    entry: 'tuya-native-animation-elements/src/components/scaleCarousel/index.js',
  },
  {
    name: 'HorPicker',
    nameZh: '横向选择器动画',
    file: 'tuya-native-animation-elements/lib/components/horPicker/index.js',
    entry: 'tuya-native-animation-elements/src/components/horPicker/index.js',
  },
  {
    name: 'Particle',
    nameZh: '扩散/吸收粒子的动画',
    file: 'tuya-native-animation-elements/lib/components/particle/index.js',
    entry: 'tuya-native-animation-elements/src/components/particle/index.js',
  },
];
