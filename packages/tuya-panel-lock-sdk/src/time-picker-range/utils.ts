import _ from 'lodash';
import { timeItem } from './interface';
export const scheduleDetailItemFn = (t: string): string => {
  const h = _.padStart(t, 4, '0').slice(0, 2);
  const m = _.padStart(t, 4, '0').slice(2);

  return `${h}:${m}`;
};
export const scheduleDetailItemFnWithSecond = (t: string): string => {
  const h = _.padStart(t, 6, '0').slice(0, 2);
  const m = _.padStart(t, 6, '0').slice(2, 4);
  const s = _.padStart(t, 6, '0').slice(4);

  return `${h}:${m}:${s}`;
};

export const apiToTime = (params: timeItem): number => params.hour * 60 + params.min;
export const apiToTimeWithSecond = (params: timeItem): number =>
  params.hour * 60 + params.min + params.second / 100;
export const timeToApi = (t = 0): string => {
  const currentHour = `${parseInt(`${t / 60}`, 10)}`;
  const currentMin = `${t % 60}`;
  const hour = _.padStart(currentHour, 2, '0');
  const min = _.padStart(currentMin, 2, '0');
  return hour + min;
};
export const timeToApiWithSecond = (t = 0): string => {
  const currentHour = `${parseInt(`${t / 60}`, 10)}`;
  const currentMin = `${+Number(t).toFixed(2).split('.')[0] % 60}`;
  const currentSecond = `${+Number(t).toFixed(2).split('.')[1] % 60}`;

  const hour = _.padStart(currentHour, 2, '0');
  const min = _.padStart(currentMin, 2, '0');
  const second = _.padStart(currentSecond, 2, '0');
  return hour + min + second;
};
export const getTimeHour = (t = 0): number => {
  const currentHour = `${parseInt(`${t / 60}`, 10)}`;
  const hour = _.padStart(currentHour, 2, '0');
  return +hour;
};
export const getTimeMin = (t = 0): number => {
  const currentMin = `${+Number(t).toFixed(2).split('.')[0] % 60}`;
  const min = _.padStart(currentMin, 2, '0');
  return +min;
};
export const getTimeSecond = (t = 0): number => {
  const currentSecond = `${+Number(t).toFixed(2).split('.')[1] % 60}`;
  const second = _.padStart(currentSecond, 2, '0');
  return +second;
};
export const error =
  'M512 0c282.7776 0 512 229.2224 512 512s-229.2224 512-512 512S0 794.7776 0 512 229.2224 0 512 0z m0 51.2C257.5104 51.2 51.2 257.5104 51.2 512s206.3104 460.8 460.8 460.8 460.8-206.3104 460.8-460.8S766.4896 51.2 512 51.2z m162.9184 297.8816a38.4 38.4 0 0 1 0 54.2976L566.3232 512l108.5952 108.6464a38.4 38.4 0 1 1-54.2976 54.2976L512 566.2976l-108.6464 108.6208a38.4 38.4 0 1 1-54.2976-54.2976l108.6208-108.6464-108.6208-108.5952a38.4 38.4 0 1 1 54.2976-54.2976l108.6464 108.5952 108.5952-108.5952a38.4 38.4 0 0 1 54.2976 0z';
