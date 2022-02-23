import Vector from './Vector';

interface Point {
  x: number;
  y: number;
}

export interface LineItem {
  point: Point;
  cp1: Point;
  cp2: Point;
  nextCp1: Point;
}
/** 获取svg曲线* */
export const getPath = (
  list: number[],
  buttonLineY: number,
  lineBoxWdith: number,
  TopLineY: number,
  min: number,
  max: number,
  slope?: number
) => {
  const getPoint = (value: number, index: number, stepX: number) => {
    const x = stepX * index;
    const y = ((buttonLineY - TopLineY) * (max - value)) / (max - min) + TopLineY;
    return { x, y };
  };

  function getLineData(listData: number[]) {
    const data: LineItem[] = [];
    const stepX = lineBoxWdith / (listData.length - 1);
    listData.reduce((res, value, index) => {
      const point = getPoint(value, index, stepX);
      const prevData = res[res.length - 1] || {
        nextCp1: undefined,
      };
      // 边界处理
      if (index === 0) {
        res.push({ point, cp1: point, cp2: point, nextCp1: point });
        return res;
      }
      if (index === listData.length - 1) {
        res.push({ point, cp1: prevData.nextCp1, cp2: point, nextCp1: point });
        return res;
      }
      const prevPoint = getPoint(listData[index - 1], index - 1, stepX);
      const nextPoint = getPoint(listData[index + 1], index + 1, stepX);
      const prevVector = new Vector(prevPoint.x - point.x, prevPoint.y - point.y);
      const nextVector = new Vector(nextPoint.x - point.x, nextPoint.y - point.y);
      const helpVector = prevVector.normalize().add(nextVector.normalize()).normalize();
      const ncp1 = new Vector(helpVector.y, helpVector.x * -1);
      const ncp2 = new Vector(helpVector.y * -1, helpVector.x);
      const rt = slope ?? 0.3; // 斜率
      if (ncp1.angle(prevVector) < 90) {
        const p1 = ncp1.multiply(prevVector.length * rt).add(point as Vector);
        const p2 = ncp2.multiply(nextVector.length * rt).add(point as Vector);
        res.push({ point, cp1: prevData.nextCp1, cp2: p1, nextCp1: p2 });
      } else {
        const p1 = ncp1.multiply(nextVector.length * rt).add(point as Vector);
        const p2 = ncp2.multiply(prevVector.length * rt).add(point as Vector);
        res.push({ point, cp1: prevData.nextCp1, cp2: p2, nextCp1: p1 });
      }

      return res;
    }, data);
    return data;
  }

  if (list.length <= 1) {
    return `M0,${buttonLineY}L${lineBoxWdith},${buttonLineY}`;
  }
  let data = getLineData(list);

  // 向下闭合
  data = [
    {
      point: { x: 0 - 10, y: buttonLineY },
      cp1: { x: 0 - 10, y: buttonLineY },
      cp2: { x: 0 - 10, y: buttonLineY },
      nextCp1: { x: 0 - 10, y: buttonLineY },
    },
    ...data,
    {
      point: { x: lineBoxWdith + 10, y: buttonLineY },
      cp1: { x: lineBoxWdith + 10, y: buttonLineY },
      cp2: { x: lineBoxWdith + 10, y: buttonLineY },
      nextCp1: { x: lineBoxWdith + 10, y: buttonLineY },
    },
  ];
  return data.reduce((path, value, index) => {
    const { point, cp1, cp2 } = value;
    if (index === 0) {
      return `M${point.x},${point.y}`;
    }
    return `${path}C${cp1.x},${cp1.y} ${cp2.x},${cp2.y} ${point.x},${point.y}`;
  }, '');
};
