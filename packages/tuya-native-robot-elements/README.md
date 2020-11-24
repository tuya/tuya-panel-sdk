## tuya-native-robot-elements

涂鸦扫地机器人业务组件库

## 0.x -> 1.0.0 升级注意事项

### 组件名称更替

- LaserSweepMap -> LaserSweepMapYiWei
- LaserMapFrame -> LaserMapFrameYiWei
- LaserMapRealTime -> LaserMapRealTimeYiWei
- VisionSweepMap 新增
- Timer 废弃（仅部分视觉扫地机使用，目的是为了下发定时后触发回调，新版定时已支持）
- RobotProvider 废弃，（请使用 MultiFaultToast 、 MultiFaultDetail 代替）
- laser-sweep-history/map-history -> 移动并重命名 LaserYiWeiLayout/HistoryMap
  （laser-sweep-history 其余内容废弃，不建议使用，清扫记录列表可以使用 RecordList 代替）

### TYNative 方法更替

TYNative.getFunConfig 已删除，移至内部 api 中

### 基础组件库

依赖基础组件库都需要升级
```js
"@tuya-rn/tuya-native-components": "^4.0.1",
"@tuya-rn/tuya-native-elements": "^3.2.14",
```
