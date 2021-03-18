import { TYSdk } from 'tuya-panel-kit';
const TYEvent = TYSdk.event;
class Portal {
  hide = () => {
    TYEvent.emit('removePortal', () => {});
  };
}

export default new Portal();
