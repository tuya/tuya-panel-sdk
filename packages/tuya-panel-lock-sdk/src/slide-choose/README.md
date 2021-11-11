### 组件属性

| 字段名        | 类型   | 描述                                                   | 默认值    |
| :------------ | :----- | :----------------------------------------------------- | --------- |
| `btnTextColor`          | string | 按钮文案颜色 | #fff |
| `tiggerDistance`  | number | 距离边界多少距离触发事件 | 20 |
| `leftColors`  | { [key: string]: string } | 左边滑动区域颜色 | { '0%': '#FF4040', '100%': 'rgba(254,72,71,0.5)' } |
| `rightColors`  | TextStyle | 按钮文案样式 | undefined |
| `btnText`     | { [key: string]: string } | 右边滑动区域颜色 | { '0%': '#239C8E', '100%': 'rgba(35,156,142,0.5)' } |
| `leftText`  | string | 左边文案 | left |
| `rightText` | string | 右边文案 | right |
| `onChooseLeft`        | () => void | 选中左边事件 | undefined |
| `onChooseRight`        | () => void | 选中右边事件 | undefined |

### 使用示例

```jsx
import { SlideChoose } from '@tuya/tuya-panel-lock-sdk'

class SlideChooseDemo extends Component {

  render() { 
    return (
      <View>
        <Text style={styles.title}>default</Text>
        <View style={[styles.group, { height: 100 }]}>
          <SlideChoose
            onChooseLeft={() => console.log('left')}
            onChooseRight={() => console.log('right')}
          />
        </View>

        <Text style={styles.title}>custom btn text </Text>
        <View style={[styles.group, { height: 100 }]}>
          <SlideChoose leftText="reject" rightText="agree" />
        </View>

        <Text style={styles.title}>custom btn colors </Text>
        <View style={[styles.group, { height: 100 }]}>
          <SlideChoose
            leftColors={{ '0%': 'skyblue', '100%': 'blue' }}
            rightColors={{ '0%': 'yellow', '100%': 'orange' }}
          />
        </View>
      </View>
    ); 
  } 
}
```