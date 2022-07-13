import { TYSdk, Utils } from 'tuya-panel-kit';
import React, { Component } from 'react';
import NewOfflineView from 'tuya-panel-kit/lib/components/layout/offline-view/new-offline-view';

const TYMobile = TYSdk.mobile;
const TYNative = TYSdk.native;

const { compareVersion, get } = Utils.CoreUtils;

const requireWifiRnVersion = '5.30';

interface IOfflineViewProps {
  showDeviceImg?: boolean;
  maskColor?: any;
}

interface IOfflineViewState {
  show: boolean;
}

export default class OfflineView extends Component<IOfflineViewProps, IOfflineViewState> {
  constructor(props: IOfflineViewProps) {
    super(props);
    this.state = {
      show: true,
    };
  }

  _handleLinkPress = () => {
    const { devId } = TYSdk.devInfo;
    const isJumpToWifi = this._handleVersionToJump();
    if (isJumpToWifi) {
      TYNative.jumpTo(`tuyaSmart://device_offline_reconnect?device_id=${devId}`);
    }
  };

  // 判断App RN版本是否为3.21及以上，且身份符合条件才可跳转至配网页面
  _handleVersionToJump = () => {
    const appRnVersion = get(TYNative, 'mobileInfo.appRnVersion');
    const role = get(TYSdk, 'devInfo.role');
    const isGreater = appRnVersion && compareVersion(appRnVersion, requireWifiRnVersion);
    const isJumpToWifi = isGreater === 0 || isGreater === 1;
    // role = 1: 家庭管理员  role = 2: 家庭超级管理员
    return isJumpToWifi && (role === 1 || role === 2);
  };

  _handleMoreHelp = () => {
    const isJumpToWifi = this._handleVersionToJump();
    let linkJumpStyle;
    if (isJumpToWifi) {
      linkJumpStyle = {
        color: '#FF4800',
        textDecorationLine: 'underline',
      };
    } else {
      linkJumpStyle = {
        textDecorationLine: 'none',
        color: '#999',
      };
    }
    TYMobile.jumpSubPage(
      { uiId: '000000cg8b' },
      {
        textLinkStyle: linkJumpStyle,
      }
    );
  };

  _handleConfirm = () => {
    console.log('点击了确定');
  };

  render() {
    const { showDeviceImg, maskColor } = this.props;
    const { show } = this.state;
    const isJumpToWifi = this._handleVersionToJump();
    return (
      <NewOfflineView
        show={show}
        showDeviceImg={showDeviceImg}
        onLinkPress={this._handleLinkPress}
        onConfirm={this._handleConfirm}
        onHelpPress={this._handleMoreHelp}
        maskColor={maskColor}
        isJumpToWifi={isJumpToWifi}
      />
    );
  }
}
