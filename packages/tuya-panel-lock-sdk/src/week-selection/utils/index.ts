import _ from 'lodash';
export const getWeekSequence = (firstDay = 0): string[] => {
  const WEEKDAYS: string[] = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const restWeek = WEEKDAYS.splice(firstDay);
  return restWeek.concat(WEEKDAYS);
};
export const workingDayString = (workingDay = '0'): number[] => {
  return _.padEnd(workingDay, 8, '0')
    .slice(0, 7)
    .split('')
    .map(i => +i);
};
export const getWorkDay = (weekValue: number[]): string =>
  [...weekValue]
    .map(i => (i ? 1 : 0))
    .join('')
    .toString();
