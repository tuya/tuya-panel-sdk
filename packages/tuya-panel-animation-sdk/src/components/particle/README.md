# Particle 粒子吸收/扩散组件

## 参数

| 属性            | 说明                  | 类型      | 默认值  | 必传 |
| --------------- | --------------------- | --------- | ------- | ---- |
| width        | 容器宽度              | number   | -   | 是   |
| height        | 容器高度            | number    | - | 是   |
| duration      | 动画执行一次的持续时间          | number   | 2000   | 否   |
| active           | 动画是否执行(开关)                    | boolean    | true       | 否   |
| radius       | 中间空白的部分的半径      | number    | 100      | 否   |
| tolerance    | radius属性的容差值, 使得radius在[radius-tolerance, radius+tolerance]的范围中随机取值                | number    | 0     | 否   |
| color    | 粒子的颜色                | () => string \| string[] \| string    | #fff       | 否   |
| type        | 粒子的运动形式 diffuse-从中间向外扩散, absorb-从外向中间吸引     | diffuse \| absorb  | diffuse  | 否   |
| dotRadius | 粒子的半径 | () => number \| number[] \| number  | 2  | 否   |
| amount           | 粒子的数量        | number | 50      | 否   |
| style       | 容器样式      | ViewStyle | {}      | 否   |

> 作者 tangxj@tuya.com
