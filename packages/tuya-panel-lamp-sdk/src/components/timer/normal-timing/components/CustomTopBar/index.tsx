import * as React from 'react';
import { Utils, TopBar } from 'tuya-panel-kit';
import Strings from '../../i18n/index';
import { ICustomTopBarProps } from '../interface';

const { convertX: cx } = Utils.RatioUtils;

const CustomTopBar: React.FC<ICustomTopBarProps> = ({ title, themeColor, onSave, onBack }: any) => {
  return (
    <TopBar
      background="transparent"
      contentStyle={{
        marginTop: cx(4),
      }}
      title={title}
      leftActions={[
        {
          source: Strings.getLang('TYLamp_cancel'),
          onPress: onBack,
          size: cx(16),
        },
      ]}
      actions={[
        {
          source: Strings.getLang('TYLamp_save'),
          color: themeColor,
          onPress: onSave,
          size: cx(16),
        },
      ]}
    />
  );
};

export default CustomTopBar;
