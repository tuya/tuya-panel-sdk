export class SvgBrush {
  MoveTo(x: number, y: number) {
    return `M ${x} ${y}`;
  }
  moveTo(x: number, y: number) {
    return `m ${x} ${y}`;
  }

  LineTo(x: number, y: number) {
    return `L ${x} ${y}`;
  }

  lineTo(x: number, y: number) {
    return `l ${x} ${y}`;
  }

  /**
   * 画一段椭圆弧线
   *
   * @param {number} rx 圆心x坐标
   * @param {number} ry 圆心y坐标
   * @param {number} [xAxisRotation = 0]  x轴旋转角度
   * @param {(0 | 1)} [largeArcFlag = 0] 角度大小,决定弧线是大于还是小于180度，0表示小角度弧，1表示大角度弧
   * @param {(0 | 1)} [sweepFlag = 0] 表示弧线的方向，0表示从起点到终点沿逆时针画弧，1表示从起点到终点沿顺时针画弧
   * @param {number} x 目标点x
   * @param {number} y 目标点y
   * @returns
   * @memberof SvgBrush
   */
  ArcTo(
    rx: number,
    ry: number,
    xAxisRotation: number,
    largeArcFlag: 0 | 1,
    sweepFlag: 0 | 1,
    x: number = 10,
    y: number
  ) {
    return `A ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`;
  }

  arcTo(
    rx: number,
    ry: number,
    xAxisRotation: number,
    largeArcFlag: 0 | 1,
    sweepFlag: 0 | 1,
    x: number,
    y: number
  ) {
    return `a ${rx} ${ry} ${xAxisRotation} ${largeArcFlag} ${sweepFlag} ${x} ${y}`;
  }
}
const SvgBrushUtils = new SvgBrush();

export default SvgBrushUtils;
