/**
 * 向量类型
 */
export default class Vector {
  x: number;

  y: number;

  $length = 0;

  get length() {
    return this.$length;
  }

  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
    this.$length = this._length();
  }

  _length() {
    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  normalize() {
    if (this.$length === 0) {
      return new Vector(this.x, this.y);
    }
    return new Vector(this.x / this.length, this.y / this.length);
  }

  add(v: Vector) {
    return new Vector(this.x + v.x, this.y + v.y);
  }

  multiply(v: number) {
    return new Vector(this.x * v, this.y * v);
  }

  dot(v: Vector) {
    return this.x * v.x + this.y * v.y;
  }

  angle(v: Vector) {
    return (Math.acos(this.dot(v) / (this.length * v.length)) * 180) / Math.PI;
  }
}
