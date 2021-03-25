import React from 'react';
import CrossDeviceFunc from './cross-device-func';

class TYIpcCrossDevice extends React.Component {
  static getCurrentHomeDevList = CrossDeviceFunc.getCurrentHomeDevList;
  static initAddListenCrossDeviceList = CrossDeviceFunc.initAddListenCrossDeviceList;
  static removeListenCrossDeviceList = CrossDeviceFunc.removeListenCrossDeviceList;
  static putDpWithDevList = CrossDeviceFunc.putDpWithDevList;
  static render() {
    return null;
  }
}

export default TYIpcCrossDevice;
