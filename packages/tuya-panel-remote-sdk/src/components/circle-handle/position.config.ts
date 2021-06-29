import { Utils } from 'tuya-panel-kit';
import _ from 'lodash';
import { PositionInfo } from './interface';

const { convertX: cx } = Utils.RatioUtils;

const defaultBgColor = '#FFFFFF';
const defaultactiveBgColor = '#FAFAFA';
const defaultDisabledBgColor = '#FAFAFA';

const getPositionInfo: (params: PositionInfo) => any = ({
  radius = cx(100),
  bgColor = {
    top: '#FFF',
    right: '#FFF',
    bottom: '#FFF',
    left: '#FFF',
  },
  disabledBgColor = {
    top: '#FAFAFA',
    right: '#FAFAFA',
    bottom: '#FAFAFA',
    left: '#FAFAFA',
  },
  activeBgColor = {
    top: '#FAFAFA',
    right: '#FAFAFA',
    bottom: '#FAFAFA',
    left: '#FAFAFA',
  },
  padding = cx(4),
  keyContent = {},
  offset = cx(18),
  pointRadius = cx(2),
  contentHeight = cx(20),
  contentWidth = cx(50),
}: PositionInfo) => {
  const r = radius - padding;
  // 扇形区域
  const keyPosition: any[] = [
    {
      key: 'top',
      top: -radius,
      left: -radius,
      bgColor: bgColor.top || defaultBgColor,
      activeBgColor: activeBgColor.top || defaultactiveBgColor,
      disabledBgColor: disabledBgColor.top || defaultDisabledBgColor,
    },
    {
      key: 'right',
      top: -radius,
      left: 0,
      bgColor: bgColor.right || defaultBgColor,
      activeBgColor: activeBgColor.right || defaultactiveBgColor,
      disabledBgColor: disabledBgColor.right || defaultDisabledBgColor,
    },
    {
      key: 'bottom',
      top: 0,
      left: 0,
      bgColor: bgColor.bottom || defaultBgColor,
      activeBgColor: activeBgColor.bottom || defaultactiveBgColor,
      disabledBgColor: disabledBgColor.bottom || defaultDisabledBgColor,
    },
    {
      key: 'left',
      top: 0,
      left: -radius,
      bgColor: bgColor.left || defaultBgColor,
      activeBgColor: activeBgColor.left || defaultactiveBgColor,
      disabledBgColor: disabledBgColor.left || defaultDisabledBgColor,
    },
  ];
  // 点
  const keyPoint: any[] = [
    { key: 'top', top: -r + offset, left: -pointRadius },
    { key: 'right', top: -pointRadius, left: r - offset - pointRadius * 2 },
    { key: 'left', top: -pointRadius, left: -r + offset },
    { key: 'bottom', top: r - offset - pointRadius * 2, left: -pointRadius },
  ];
  // 自定义内容
  let content: any[] = [];
  if (keyContent && !_.isEmpty(keyContent)) {
    content = [
      {
        key: 'top',
        origin: { top: 0, left: radius },
        position: {
          top: offset + padding,
          left: -contentWidth / 2,
          alignItems: 'center',
        },
        content: keyContent.top,
      },
      {
        key: 'right',
        origin: { top: radius, right: 0 },
        position: {
          top: -contentHeight / 2,
          right: offset + padding,
          alignItems: 'flex-end',
          justifyContent: 'center',
        },
        content: keyContent.right,
      },
      {
        key: 'bottom',
        origin: { bottom: 0, left: radius },
        position: {
          bottom: offset + padding,
          left: -contentWidth / 2,
          alignItems: 'center',
          justifyContent: 'flex-end',
        },
        content: keyContent.bottom,
      },
      {
        key: 'left',
        origin: { top: radius, left: 0 },
        position: {
          top: -contentHeight / 2,
          left: offset + padding,
          justifyContent: 'center',
        },
        content: keyContent.left,
      },
    ];
  }

  return {
    keyPoint,
    keyPosition,
    content,
  };
};

export default getPositionInfo;
