export interface FingerProps {
  isNeedPageTip?: boolean;
  currentNumber: number;
  totalNumber: number;
  commonTip?: string;
  tipPageTip?: string;
  successColor?: string;
  errorColor?: string;
  isSuccess: boolean;
}

export interface FingerState {
  isNeedPageTip: boolean;
}
