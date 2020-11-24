# RecordList

清扫记录列表（激光、陀螺仪通用）,单项滑动删除，仅真机有效，无法预览

## 版本

0.3.10

## 代码演示

```jsx
import {
  RecordList,
  RecordDataCollection,
} from '@tuya-rn/tuya-native-robot-elements';

const ledongStore = new RecordDataCollection.OSS.LaserLeiDongRecord();

.....
<RecordList recordStore={ledongStore} is12Hours={is12Hours} />


```

### 基本用法
