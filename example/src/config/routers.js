import _ from 'lodash';
import Home from '../scenes/Home';
// import BasicCategory from '../scenes/Basic';
import LampCategory from '../scenes/Lamp';
// import StandardCategory from '../scenes/Standard';
// import SensorCategory from '../scenes/Sensor';
import SweepRobotCategory from '../scenes/SweepRobot';
import Health from '../scenes/Health';
import LockCategory from '../scenes/Lock';
import GateWayCategory from '../scenes/Gateway';
// import CbtCategory from '../scenes/Cbt';
import AnimationCategory from '../scenes/Animation';
import Remote from '../scenes/Remote';
import Ipc from '../scenes/Ipc';
import Electrician from '../scenes/Electrician';
import ApiScene from '../scenes/ApiScene';
import Outdoor from '../scenes/Outdoor';
// // import OSCategory from '../scenes/OS';
// import ThemeSetting from '../scenes/Theme';
// import FullRoomCategory from '../scenes/FullRoom';
// import BasicInfo from '../../../packages/tuya-panel-sdk/package.json';
import LampInfo from '../../../packages/tuya-panel-lamp-sdk/package.json';
import RobotInfo from '../../../packages/tuya-panel-robot-sdk/package.json';
import ApiSceneInfo from '../../../packages/tuya-panel-api/package.json';
// import StandardInfo from '../../../packages/tuya-panel-standard-sdk/package.json';
// // import OSInfo from '../../../packages/tuya-panel-os-sdk/package.json';
// import SensorInfo from '../../../packages/tuya-panel-sensor-sdk/package.json';
import HealthInfo from '../../../packages/tuya-panel-health-sdk/package.json';
// import FullRoomInfo from '../../../packages/tuya-panel-fullroom-sdk/package.json';
import GatewayInfo from '../../../packages/tuya-panel-gateway-sdk/package.json';
// import CbtInfo from '../../../packages/tuya-panel-cbt-sdk/package.json';
import AnimationInfo from '../../../packages/tuya-panel-animation-sdk/package.json';
import RemoteInfo from '../../../packages/tuya-panel-remote-sdk/package.json';
import IpcInfo from '../../../packages/tuya-panel-ipc-sdk/package.json';
import ElectricianInfo from '../../../packages/tuya-panel-electrician-sdk/package.json';
import LockInfo from '../../../packages/tuya-panel-lock-sdk/package.json';
import OutdoorInfo from '../../../packages/tuya-panel-outdoor-sdk/package.json';

import { traverseRouters } from '../utils';

const mainRouter = [
  {
    id: 'main',
    Scene: Home,
  },
];

export const elementsRouters = _.sortBy(
  [
    // {
    //   id: 'Basic',
    //   title: BasicInfo.name,
    //   subTitle: BasicInfo.version,
    //   Scene: BasicCategory,
    // },
    {
      id: 'Lock',
      title: LockInfo.name,
      subTitle: LockInfo.version,
      Scene: LockCategory,
    },
    {
      id: 'Lamp',
      title: LampInfo.name,
      subTitle: LampInfo.version,
      Scene: LampCategory,
    },
    // {
    //   id: 'Standard',
    //   title: StandardInfo.name,
    //   subTitle: StandardInfo.version,
    //   Scene: StandardCategory,
    // },
    {
      id: 'SweepRobot',
      title: RobotInfo.name,
      subTitle: RobotInfo.version,
      Scene: SweepRobotCategory,
    },
    // {
    //   id: 'OS',
    //   title: OSInfo.name,
    //   subTitle: OSInfo.version,
    //   Scene: OSCategory,
    // },
    // {
    //   id: 'Sensor',
    //   title: SensorInfo.name,
    //   subTitle: SensorInfo.version,
    //   Scene: SensorCategory,
    // },
    // {
    //   id: 'Theme',
    //   title: 'Theme',
    //   value: '前往配置主题变量',
    //   Scene: ThemeSetting,
    // },
    {
      id: 'Health',
      title: HealthInfo.name,
      subTitle: HealthInfo.version,
      Scene: Health,
    },
    // {
    //   id: 'FullRoom',
    //   title: FullRoomInfo.name,
    //   subTitle: FullRoomInfo.version,
    //   Scene: FullRoomCategory,
    // },
    {
      id: 'Gateway',
      title: GatewayInfo.name,
      subTitle: GatewayInfo.version,
      Scene: GateWayCategory,
    },
    // {
    //   id: 'Cbt',
    //   title: CbtInfo.name,
    //   subTitle: CbtInfo.version,
    //   Scene: CbtCategory,
    // },
    {
      id: 'Animation',
      title: AnimationInfo.name,
      subTitle: AnimationInfo.version,
      Scene: AnimationCategory,
    },
    {
      id: 'Remote',
      title: RemoteInfo.name,
      subTitle: RemoteInfo.version,
      Scene: Remote,
    },
    {
      id: 'Ipc',
      title: IpcInfo.name,
      subTitle: IpcInfo.version,
      Scene: Ipc,
    },
    {
      id: 'Electrician',
      title: ElectricianInfo.name,
      subTitle: ElectricianInfo.version,
      Scene: Electrician,
    },
    {
      id: 'ApiScene',
      title: ApiSceneInfo.name,
      subTitle: ApiSceneInfo.version,
      Scene: ApiScene,
    },
    {
      id: 'Outdoor',
      title: OutdoorInfo.name,
      subTitle: OutdoorInfo.version,
      Scene: Outdoor,
    },
  ],
  'id'
);

export const subRouters = [...traverseRouters(elementsRouters, 2)];

// all routers
export default [...mainRouter, ...elementsRouters, ...subRouters];
