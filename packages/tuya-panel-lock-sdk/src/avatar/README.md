### 组件属性

| 字段名        | 类型   | 描述                                                   | 默认值    |
| :------------ | :----- | :----------------------------------------------------- | --------- |
| `size`          | number \| 'small' \| 'medium' \| 'large' \| 'xlarge'  | 头像尺寸大小 | 'medium'    |
| `containerStyle`  | ViewPropTypes.style | 容器样式 | undefined |
| `placeholderSource`  | ImageSourcePropType | 默认展示图 | undefined |
| `activeOpacity`  | number | 按压透明度 | undefined |
| `avatarStyle`     | ImageStyle | 头像Image样式 | undefined |
| `accessaryStyle`  | ViewPropTypes.style | 角标样式 | undefined |
| `accessarySource` | ImageSourcePropType | 角标图片源 | undefined |
| `children`        | React.ReactChildren | 组件children | undefined |
| `source`          | ImageSourcePropType | 头像图片源 | undefined |`
| `type`            | 'circle' \| 'square' | 头像形状类型，正方形或者圆形 | circle |
| `onPress`         | function | 按压头像触发事件 | undefined |
| `Component`       | `typeof React.Component` | 外层替换元素 | View |
| `showPicker`      | boolean \| 'picker' \| 'camera' \| 'library' | 是否展示默认角标，具有本地选择相册或者拍照功能，picker 是弹出选项弹窗，camera是直接进入相机，library是直接进入相册 | false  |
| `pickerProps`     | PickerOptionsType | picker 自定义属性 | undefined |
| `onSuccess`       | `(res) => void` | 选择本地图片后成功回调，showPicker模式下 | undefined |
| `onError`         | `(res) => void` | 选择本地图片失败后回调，showPicker模式下 | undefined |

### 使用示例

```jsx
import { Avatar } from 'tuya-panel-lock-sdk'

class AvatarDemo extends Component {

  render() { 
    return <Avatar {...this.props} />; 
  } 
}
```