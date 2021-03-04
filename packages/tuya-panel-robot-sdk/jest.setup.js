import { NativeModules } from 'react-native';
import 'react-native-mock-render/mock';
import 'react-test-renderer';
import 'react-native/Libraries/Animated/src/bezier'; // for https://github.com/facebook/jest/issues/4710
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

NativeModules.RNGestureHandlerModule = {};
NativeModules.TYRCTPublicModule = {};
NativeModules.TYRCTDeviceModule = {};
NativeModules.TYRCTPublicManager = {};
NativeModules.TYRCTPanelManager = {};
NativeModules.RNSentry = {};
NativeModules.RNSentryEventEmitter = {};

Enzyme.configure({ adapter: new Adapter() });
