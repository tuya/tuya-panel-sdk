export interface StopItem {
  angle: number;
  color: string;
}

export interface Coordinate {
  x: number;
  y: number;
}

export interface ColorItem {
  path?: string;
  from?: Coordinate;
  to?: Coordinate;
  startColor?: string;
  endColor?: string;
  angle?: number;
  color?: string;
}
