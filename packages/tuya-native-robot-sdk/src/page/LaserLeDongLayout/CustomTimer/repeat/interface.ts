import { ITheme } from '../timer/interface';

export { ITheme };

export interface IRepeatSceneProps {
  theme: ITheme;
  title: string;
  repeat: string;
  onRepeatChange: (repeat: string) => void;
  navigator: any;
}
