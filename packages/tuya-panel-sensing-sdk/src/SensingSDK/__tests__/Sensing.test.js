import { TYSdk } from 'tuya-panel-kit';
import { SensingSDK } from '../index';

let sensingSDK = null;

beforeAll(() => {
  sensingSDK = new SensingSDK('SD_LL', TYSdk, 'en');
});

describe('sensingSDK', () => {
  it('init', () => {
    expect(sensingSDK).toHaveBeenCalled();
  });
  it('queryCloudAlarm default', () => {
    expect(SensingSDK?.INSTANCE?.queryCloudAlarm()).toHaveBeenCalled();
    expect(SensingSDK?.INSTANCE?.queryCloudAlarm('1')).toHaveBeenCalled();
  });
  it('queryCloudAlarm', () => {
    expect(SensingSDK?.INSTANCE?.queryCloudAlarm('1')).toHaveBeenCalled();
  });

  it('getServerList default', () => {
    expect(SensingSDK?.INSTANCE?.getServerList()).toHaveBeenCalled();
  });

  it('getServerList', () => {
    expect(SensingSDK?.INSTANCE?.getServerList(true)).toHaveBeenCalled();
  });

  it('getCallServiceStatus', () => {
    expect(SensingSDK?.INSTANCE?.getCallServiceStatus()).toHaveBeenCalled();
  });

  it('enableRule', () => {
    expect(SensingSDK?.INSTANCE?.enableRule('111', false)).toHaveBeenCalled();
  });

  it('static enableRule', () => {
    expect(SensingSDK?.enableRule('111', false)).toHaveBeenCalled();
  });

  it('updateCloudAlarm default', () => {
    expect(
      SensingSDK?.INSTANCE?.updateCloudAlarm(
        {
          dpId: '',
          timeout: 0,
          dpValue: [1, 100],
          entityValue: '',
          name: '',
        },
        ['<']
      )
    ).toHaveBeenCalled();
  });

  it('updateCloudAlarm', () => {
    expect(
      SensingSDK?.INSTANCE?.updateCloudAlarm(
        {
          dpId: '',
          timeout: 0,
          dpValue: false,
          entityValue: '',
          pushType: 'appPushTrigger',
          timer: '',
          actionStrategy: 'repeat',
          name: '',
        },
        '>',
        false
      )
    ).toHaveBeenCalled();
  });

  it('updateCloudAlarm string or number', () => {
    expect(
      SensingSDK?.INSTANCE?.updateCloudAlarm(
        {
          dpId: '',
          timeout: 0,
          dpValue: '19',
          entityValue: '',
          pushType: 'appPushTrigger',
          timer: '',
          actionStrategy: 'repeat',
          name: '',
        },
        '<',
        false
      )
    ).toHaveBeenCalled();
  });

  it('static removeCloudAlarm', () => {
    expect(SensingSDK?.removeCloudAlarm('111')).toHaveBeenCalled();
  });

  it('removeCloudAlarm', () => {
    expect(SensingSDK?.INSTANCE?.removeCloudAlarm('111')).toHaveBeenCalled();
  });

  it('forceRemoveAlarm', () => {
    expect(SensingSDK?.INSTANCE?.forceRemoveAlarm('111', 'ooo')).toHaveBeenCalled();
  });

  it('static getCallServiceStatus', () => {
    expect(SensingSDK?.getCallServiceStatus()).toHaveBeenCalled();
  });

  it('getOssUrl', () => {
    expect(SensingSDK?.INSTANCE?.getOssUrl()).toHaveBeenCalled();
  });

  it('static getOssUrl', () => {
    expect(SensingSDK?.getOssUrl()).toHaveBeenCalled();
  });

  it('getUserInfo', () => {
    expect(SensingSDK?.INSTANCE?.getUserInfo()).toHaveBeenCalled();
  });

  it('static getUserInfo', () => {
    expect(SensingSDK?.getUserInfo()).toHaveBeenCalled();
  });

  it('getAlarmScenesLog default', () => {
    expect(SensingSDK?.INSTANCE?.getAlarmScenesLog('1,2')).toHaveBeenCalled();
  });

  it('getAlarmScenesLog', () => {
    expect(SensingSDK?.INSTANCE?.getAlarmScenesLog('1,2', 1, 100)).toHaveBeenCalled();
  });

  it('getDeviceLog', () => {
    expect(SensingSDK?.INSTANCE?.getDeviceLog('1,2', 1, 100)).toHaveBeenCalled();
  });

  it('static enableScene false', () => {
    expect(SensingSDK?.enableScene(false, 1)).toHaveBeenCalled();
  });

  it('static enableScene true', () => {
    expect(SensingSDK?.enableScene(true, 1)).toHaveBeenCalled();
  });

  it('enableScene false', () => {
    expect(SensingSDK?.INSTANCE?.enableScene(false, 1)).toHaveBeenCalled();
  });

  it('enableScene true', () => {
    expect(SensingSDK?.INSTANCE?.enableScene(true, 1)).toHaveBeenCalled();
  });

  it('static startScene', () => {
    expect(SensingSDK?.startScene('1')).toHaveBeenCalled();
  });

  it('startScene', () => {
    expect(SensingSDK?.INSTANCE?.startScene('1')).toHaveBeenCalled();
  });

  it('getSceneAndAuto', () => {
    expect(
      SensingSDK?.INSTANCE?.getSceneAndAuto(
        res => {},
        err => {}
      )
    ).toHaveBeenCalled();
  });

  it('isHighAbility', () => {
    expect(SensingSDK?.INSTANCE?.isHighAbility('jiuhiu')).toHaveBeenCalled();
  });

  it('isLowPowDevice', () => {
    expect(SensingSDK?.INSTANCE?.isLowPowDevice()).toHaveBeenCalled();
  });

  it('getLastDp', () => {
    expect(SensingSDK?.INSTANCE?.getLastDp()).toHaveBeenCalled();
  });

  it('addCache', () => {
    expect(SensingSDK?.INSTANCE?.addCache({})).toHaveBeenCalled();
  });

  it('getDpsInfos', () => {
    expect(SensingSDK?.INSTANCE?.getDpsInfos({})).toHaveBeenCalled();
  });

  it('productSetting', () => {
    expect(SensingSDK?.INSTANCE?.productSetting({})).toHaveBeenCalled();
  });

  it('productSwitch', () => {
    expect(SensingSDK?.INSTANCE?.productSwitch('111', false)).toHaveBeenCalled();
  });
});
