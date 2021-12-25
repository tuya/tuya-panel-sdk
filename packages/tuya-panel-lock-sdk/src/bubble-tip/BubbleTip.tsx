import { memo } from 'react';
import BubbleTipBase from './BubbleTip.Base';
import ComposeHOC from './ComposeHOC';

/**
 * @desc BubbleTip 主组件的静态类型，默认是Base
 * @childType Base
 */
interface IBubbleTipStatic {
  Base: typeof BubbleTipBase;
}

const BubbleTipBaseMemo = memo(BubbleTipBase);

/**
 * @desc 默认使用的是Base的动画效果
 */
const BubbleTip: IBubbleTipStatic = props => {
  return ComposeHOC(props, BubbleTipBaseMemo);
};

BubbleTip.Base = props => {
  return ComposeHOC(props, BubbleTipBaseMemo);
};

export default BubbleTip;
