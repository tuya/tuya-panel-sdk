/* eslint-disable no-empty */
import { NativeModules } from 'react-native';

let module = null;

try {
  module = NativeModules.TYRCTOrientationManager;
} catch (err) {}

export default module;
