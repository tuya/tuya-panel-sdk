/**
 * 向量类型
 */
export default class Vector {
  x: number;

  y: number;

  $length = 0;

  get length(): number {
    return this.$length;
  }

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.$length = this._length();
  }

  _length(): number {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize(): Vector {
    if (this.$length === 0) {
      return new Vector(this.x, this.y);
    }
    return new Vector(this.x / this.length, this.y / this.length);
  }

  add(v: Vector): Vector {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  multiply(v: number): Vector {
    return new Vector(this.x * v, this.y * v);
  }

  dot(v: Vector): number {
    return this.x * v.x + this.y * v.y;
  }

  angle(v: Vector): number {
    return (Math.acos(this.dot(v) / (this.length * v.length)) * 180) / Math.PI;
  }
}
