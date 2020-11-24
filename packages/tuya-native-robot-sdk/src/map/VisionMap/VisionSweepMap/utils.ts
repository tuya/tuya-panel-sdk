/* eslint-disable import/prefer-default-export */
/**
 * APP所给定的坐标系为左上角，x为横轴，y为纵轴；
 * 但i71所给定的坐标系为右下角，x为纵轴，y为横轴；
 * 因此该方法用于两个坐标系间的相互转换；
 */
export const dealXY = (x, y) => {
  return {
    x: 200 - y,
    y: 200 - x,
  };
};
