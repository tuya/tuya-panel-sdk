### 组件属性

| 字段名        | 类型   | 描述                                                   | 默认值    |
| :------------ | :----- | :----------------------------------------------------- | --------- |
| `onPress`          | Function | 按钮press事件 | undefined |
| `onIdleEndCallBack`  | Function | 闲置倒计时结束触发事件 | undefined |
| `style`  | ViewStyle | 按钮样式 | undefined |
| `textStyle`  | TextStyle | 按钮文案样式 | undefined |
| `btnText`     | Stirng | 按钮文案 | undefined |
| `customCountDownText`  | (t: number) => void | 自定义按钮文案 | undefined |
| `countDownNumber` | number | 设置倒计时数字 | 3 |
| `onCountChange`        | (t: number, timer: Timer) | 倒计时变化事件 | undefined |
| `ref`        | React.RefObject<Timer> | 暴露Timer一些接口 | undefined |

### 使用示例

```jsx
import { CountDownButton } from '@tuya/tuya-panel-lock-sdk'

class CountDownButtonDemo extends Component {

  render() { 
    return (
      <View>
          <CountDownButton customCountDownText={(t: number) => `倒计时(${t} s)`} />
          <CountDownButton customCountDownText={(t: number) => `倒计时 -> ${t} s`} />
          <CountDownButton customCountDownText={(t: number) => `${t} s 后结束倒计时`} />
      </View>
    ); 
  } 
}
```