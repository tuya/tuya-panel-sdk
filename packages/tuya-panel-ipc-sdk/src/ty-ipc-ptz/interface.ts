import { ViewStyle } from 'react-native';

export interface TYIpcPtzProps {
 // 是否禁用
 disabled: boolean,
 // ptz宽度
 pieWidth: number,
 // ptz高度
 pieHeight: number,
 // ptz数值
 pieNumber: number,
 // 主题色
 themeType: string,
 // 容器样式
 containerStyle: ViewStyle,
 // 旋转角度
 rotateDegree: string,
 // 点击函数
 pressIn: Function,
 // 离开函数
 pressOut: Function,
 // 激活键颜色
 panelItemActiveColor: string,
}

