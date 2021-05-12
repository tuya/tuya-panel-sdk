type ErrorType = {
  showTip: true;
  errorInfo: 'passwordErrorNumber';
};
type ValueType = {
  password: string;
};
export interface GetPasswordProps {
  randomText?: string;
  passwordNumber?: number;
  inputItemText?: string;
  randomTextColor?: string;
  passwordColor?: string;
  onValueChange: (item: ValueType | ErrorType) => void;
}

export interface GetPasswordState {
  password: string;
}
