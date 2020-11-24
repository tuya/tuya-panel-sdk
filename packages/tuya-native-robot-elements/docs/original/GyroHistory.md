# GyroHistory

即插即用，自动获取陀螺仪清扫记录，可适配是否有清扫记录id的情况，支持点击跳转地图详情，支持多选删除
！！仅适用于真实扫地机，无法预览

## 版本

0.3.10

## 代码演示

```js
import { GyroHistory } from '@tuya-rn/tuya-native-robot-elements';

Config.setRoute('historyRecords', {
  ...defRoute,
  hideTopbar: true,
  Element: GyroHistory.HistoryRecords,
});

Config.setRoute('historyMap', {
  ...defRoute,
  hideTopbar: true,
  Element: GyroHistory.HistoryMap,
});

```

### 基本用法
