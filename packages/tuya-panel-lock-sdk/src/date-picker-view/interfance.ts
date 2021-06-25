interface DatePickerViewProps {
  visible: boolean;
  selectDate: any;
  startLabel?: string; // 开始时间
  endLabel?: string; // 结束时间
  dateRange?: [Date | string, Date | string]; // 时间范围
  defautlStartDate?: string; // 默认开始时间
  startDate: string; // 开始时间
  endDate: string; // 结束时间
  mode?: string;
  cancelText?: string; // 取消文案
  confirmText?: string; // 确定文案
  placeholder?: string; // 占位文案
  startDateTip?: string;
  dateLimitTip?: string;
  onDateChange: ({
    startDate,
    endDate,
  }: {
    startDate: number | number;
    endDate: string | number;
  }) => void;
}
interface DatePickerViewState {
  visible: boolean;
  placeholder?: string; //
  currentOperationIndex: number; //
  startLabel?: string; // 开始时间
  endLabel?: string; // 结束时间
  dateRange?: [Date | string, Date | string]; // 时间范围
  defautlStartDate?: string; // 默认开始时间
  startDate?: any; // 开始时间
  endDate?: any; // 结束时间
}
interface NextProps {
  startDate?: Date | string;
  endDate?: Date | string;
}
type dateString = string | number;
