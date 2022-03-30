import 'babel-polyfill';
import { SceneFormater, ColourFormater, ControlFormater } from '../../lib/extension/lamp/format';

// 场景的转换
const formater = new SceneFormater('scene_data');
const data = formater.parse(
  '07464602000003e803e800000000464602007803e803e80000000046460200f003e803e800000000464602003d03e803e80000000046460200ae03e803e800000000464602011303e803e800000000'
);
console.log(JSON.stringify(data, null, '  '));
console.log(JSON.stringify(formater.format(data), null, '  '));

// 彩光的转换
const colourFormater = new ColourFormater('colour_data');
const result = colourFormater.parse('006403e803e8');
console.log(JSON.stringify(result, null, '  '));
console.log(JSON.stringify(colourFormater.format(result), null, '  '));

const controlFormater = new ControlFormater('colour_data');
const result1 = controlFormater.parse('0006403e803e800020000');
console.log(JSON.stringify(result1, null, '  '));
console.log(JSON.stringify(controlFormater.format(result1), null, '  '));
