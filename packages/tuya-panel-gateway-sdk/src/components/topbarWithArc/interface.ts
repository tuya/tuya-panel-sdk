import { StatusBarStyle } from 'react-native';
import { TopBarProps } from 'tuya-panel-kit';

interface TopBarWithArcProps {
  title?: string;
  color?: string;
  onBack?: () => void;
  barStyle?: StatusBarStyle;
  topBarParams?: TopBarProps;
  fill?: string;
  arcWidth?: number;
  arcHeight?: number;
  renderStatusBar?: () => JSX.Element | null;
  renderTopBar?: () => JSX.Element | null;
  renderArc?: () => JSX.Element | null;
}

export { TopBarWithArcProps };
