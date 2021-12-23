export interface TurnLightProps {
  // 灯光开关
  switchLight: boolean;
  // 方向
  direction: 'straight' | 'left' | 'right' | 'stop';
  // tab改变的回调
  onChange: (value) => void;
}
