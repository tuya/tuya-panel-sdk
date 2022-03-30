import 'babel-polyfill';
import DpMapFactory from '../../lib/factory/DpMapFactory';
const map = [
  {
    name: 'id',
    length: 2,
  },

  {
    name: 'colors',
    length: 26,
    loop: true,
    type: 'child',
    childMap: [
      {
        name: 'speed',
        length: 2,
      },
      {
        name: 'time',
        length: 2,
      },
      {
        name: 'mode',
        length: 2,
      },
      {
        name: 'hue',
        length: 4,
      },
      {
        name: 'saturation',
        length: 4,
      },
      {
        name: 'value',
        length: 4,
      },
      {
        name: 'brightness',
        length: 4,
      },
      {
        name: 'temperature',
        length: 4,
      },
    ],
  },
];
const result = DpMapFactory.parse(
  map,
  '07464602000003e803e800000000464602007803e803e80000000046460200f003e803e800000000464602003d03e803e80000000046460200ae03e803e800000000464602011303e803e800000000'
);

console.log(JSON.stringify(result, null, '  '));
console.log(DpMapFactory.format(map, result));
