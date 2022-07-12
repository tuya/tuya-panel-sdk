import React, { FC } from 'react';
import { Utils, TYSdk } from 'tuya-panel-kit';
import Res from '../../res';
import BleToastModal from './BleToastModal'; // 安卓开启蓝牙Toast提示框
import BleTipModal from './BleTipModal'; // IOS开启蓝牙弹窗提示框

const { isIos } = Utils.RatioUtils;

interface BleOfflineViewProps {
  Strings: any;
}

const BleOfflineView: FC<BleOfflineViewProps> = ({ Strings }) => {
  if (isIos) {
    return <BleTipModal disabled maskColor="rgba(0, 0, 0, 0.6)" Strings={Strings} />;
  }

  return (
    <BleToastModal
      disabled
      style={{ top: 16 }}
      image={Res.arrow}
      text={Strings.getLang('bluetoothOfflineTip')}
      onPress={() => TYSdk.device.gotoBlePermissions()}
    />
  );
};

export default BleOfflineView;
