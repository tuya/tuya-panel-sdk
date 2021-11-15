/* eslint-disable no-empty */
import { NativeModules } from 'react-native';

let module = null;

try {
  module = NativeModules.TYRCTLifecycleManager;
} catch (err) {}

export default module;
