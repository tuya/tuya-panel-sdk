import * as FunctionUtils from './FunctionUtils';
import * as PressCoordinateUtils from './PressCoordinateUtils';
import * as StringsUtils from './StringsUtils';
import * as RxUtils from './RxUtils';
import * as MapServiceChannelUtils from './MapServiceChannelUtils';

import LoggerUtils from './LoggerUtils';
import SvgBrushUtils from './SvgBrush';
import Lz4 from './lz4';

import * as GyroUtils from './GyroUtils';
import * as RobotUtils from './Robot';

export default {
  FunctionUtils,
  PressCoordinateUtils,
  LoggerUtils,
  RxUtils,
  SvgBrushUtils,
  StringsUtils,
  MapServiceChannelUtils,
  Lz4,

  // ---- 向下兼容，废弃 ----
  GyroUtils,
  RobotUtils,
};
