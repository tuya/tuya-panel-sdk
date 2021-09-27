import { TextProps } from 'react-native';

export interface TextInputIProp extends TextProps {
  index: any;
  displayValues: number[];
}

export interface AnimatedNumberProps extends TextProps {
  loop?: boolean;
  duration?: number;
  speed?: number;
  values?: number[];
  end?: number;
  onStart?: () => void;
  onEnd?: () => void;
  onLoop?: () => void;
}
