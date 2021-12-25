import { EBubbleTipeConfigType } from './interface';
import { safe, info, danger } from './icons';

export const DEFAULT_CURRENTINDEX = 0;
export const DEFAULT_DISTANCE = 0;
export const DEFAULT_FADE = 1;

export const ICON_TYPE = {
  [EBubbleTipeConfigType.safe]: safe,
  [EBubbleTipeConfigType.info]: info,
  [EBubbleTipeConfigType.danger]: danger,
};
