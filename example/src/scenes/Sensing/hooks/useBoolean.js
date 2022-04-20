import React from 'react';
import { SwitchButton } from 'tuya-panel-kit';
import { useBoolean } from '@tuya/tuya-panel-sensing-sdk';

export default () => {
  const [visible, { toggle }] = useBoolean(false);
  return <SwitchButton value={visible} onValueChange={toggle} style={{ marginRight: 14 }} />;
};
