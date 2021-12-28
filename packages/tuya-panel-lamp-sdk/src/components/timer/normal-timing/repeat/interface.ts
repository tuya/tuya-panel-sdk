import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { IWeekOptionStyle } from '../timer/interface';

declare type StackParamsList = {
  weekRoute: {
    useNavigation: boolean;
    weeks: number[];
    onChange: (weeks: number[]) => void;
    themeColor: string;
    backgroundColor: string;
    weekOptionStyle: IWeekOptionStyle;
  };
};

export interface IWeekRepeatProps {
  navigation?: StackNavigationProp<any>;
  route: RouteProp<StackParamsList, 'weekRoute'>;
}
