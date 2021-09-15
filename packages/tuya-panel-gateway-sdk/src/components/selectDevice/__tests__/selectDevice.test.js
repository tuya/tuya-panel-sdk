import React from 'react';
import { shallow } from 'enzyme';
import { Utils } from 'tuya-panel-kit';
import SelectDevice from '../index';

const { convertX: cx } = Utils.RatioUtils;
const deviceList = [
  {
    productId: 'kjnntrgi',
    capability: 32768,
    category: 'ldcg',
    uuid: '522bf2eba5e001ea',
    pcc: '4320',
    mac: 'dc234d1dbbcf',
    switchDp: 0,
    schema:
      '[{"mode":"ro","code":"bright_value","name":"当前亮度值","property":{"unit":"lux","min":0,"max":83000,"scale":0,"step":1,"type":"value"},"id":2,"trigger":"direct","type":"obj","extContent":"{\\"trigger\\":\\"direct\\"}"},{"mode":"ro","code":"battery_percentage","name":"电池电量","property":{"unit":"%","min":0,"max":100,"scale":0,"step":1,"type":"value"},"id":4,"trigger":"direct","type":"obj","extContent":"{\\"trigger\\":\\"direct\\"}"}]',
    isOnline: true,
    nodeId: '04f0',
    dps: {
      2: 67,
      4: 89,
    },
    roomId: 0,
    meshId: '6cba7d0205ec3dfc09fxpz',
    quickOpDps: [],
    iconUrl:
      'https://images.tuyacn.com/smart/icon/ay1523669254163tcGDj/d9306127e0c5ee956c915bce006a7ef1.png',
    devId: '6c8c071759fa1cf3e585eu',
    name: '亮度传感器',
  },
  {
    productId: '1s2lu5hh',
    capability: 4096,
    category: 'qt',
    uuid: 'ec1bbdfffe452be2',
    pcc: '0204',
    mac: 'ec1bbdfffe452be2',
    switchDp: 0,
    schema:
      '[{"mode":"ro","code":"PIR","name":"检测状态","property":{"type":"bool"},"id":101,"trigger":"direct","type":"obj","extContent":"{\\"trigger\\":\\"direct\\"}"},{"mode":"ro","code":"battery","name":"电量","property":{"unit":"","min":0,"max":100,"scale":0,"step":1,"type":"value"},"id":103,"trigger":"direct","type":"obj","extContent":"{\\"trigger\\":\\"direct\\"}"}]',
    isOnline: false,
    nodeId: 'ec1bbdfffe452be2',
    dps: {
      101: true,
      103: 100,
    },
    roomId: 0,
    meshId: '6cc0d1baeea35bdbfeurxc',
    quickOpDps: [],
    iconUrl:
      'https://images.tuyacn.com/smart/icon/ay1483666828415gwChQ/34c97001a75fb90f64490a4d86afd954.png',
    devId: '6cd055b389c34ba6a4kpas',
    name: 'Human body sensor',
  },
  {
    productId: 'wo8ibue55x1n2oaz',
    capability: 1,
    category: 'jzq',
    uuid: 'tuya618a498a34227f55',
    pcc: '',
    mac: '',
    switchDp: 0,
    schema:
      '[{"mode":"ro","code":"rp_signal_strength","name":"中继器信号强度","property":{"range":["good","great","bad"],"type":"enum"},"id":1,"type":"obj"},{"mode":"rw","code":"indicator","name":"状态指示灯","property":{"type":"bool"},"id":2,"type":"obj"},{"mode":"rw","code":"is_password_set","name":"是否设置密码","property":{"type":"bool"},"id":8,"type":"obj"},{"mode":"rw","code":"switch_speed_limit","name":"限速开关","property":{"type":"bool"},"id":24,"type":"obj"},{"mode":"rw","code":"router_info_copy","name":"复制路由信息","property":{"type":"bool"},"id":25,"type":"obj"},{"mode":"rw","code":"sta_config","name":"station配置","property":{"type":"string","maxlen":255},"iconname":"icon-dp_mode","id":26,"type":"obj"}]',
    isOnline: false,
    nodeId: '',
    dps: {
      1: 'good',
      2: true,
      8: true,
      24: false,
      25: true,
      26: '{"mac":"34:79:16:15:d9:a2","allowNetwork":true}',
    },
    roomId: 0,
    meshId: null,
    quickOpDps: [],
    iconUrl:
      'https://images.tuyacn.com/smart/icon/bay1580896010506VFGF/f4a689e5ab154ecc027a180e096f5a53.png',
    devId: '6c163805d061071bb0xjja',
    name: 'Wi-Fi repeater',
  },
];

describe('SelectDevice components', () => {
  it('basic render', () => {
    const wrapper = shallow(<SelectDevice dataSource={deviceList} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('change style and text', () => {
    const wrapper = shallow(
      <SelectDevice
        dataSource={deviceList}
        activeOpacity={0.8}
        containerStyle={{ backgroundColor: 'pink' }}
        tipText="Select device tips"
        tipTextStyle={{ fontSize: 14, color: 'blue' }}
        offlineText="Offline"
        offlineTextStyle={{ fontSize: 12, color: 'green' }}
        selectAllText="Click to select all"
        selectAllTextStyle={{ fontSize: 16, color: 'yellow' }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
  it('change checkbox color', () => {
    const wrapper = shallow(
      <SelectDevice
        dataSource={deviceList}
        activedTintColor="pink"
        normalTintColor="yellow"
        disabledTintColor="gray"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
