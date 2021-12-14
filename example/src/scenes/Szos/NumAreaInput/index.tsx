import React, { useState } from 'react';
import { NumAreaInput } from '@tuya/tuya-panel-szos-sdk/src/components';
import { TYText } from 'tuya-panel-kit';

const ChangeCInput: React.FC = () => {
  const [changeColor, setColor] = useState<boolean>(false);

  const focusFuc = () => {
    setColor(true);
  };

  return (
    <>
      <TYText text="数字输入框，限制最大最小输入，示例最小值为5" />
      <NumAreaInput
        key="test"
        name="test"
        placeholder="6"
        focusFuc={focusFuc}
        minVal={5}
        changeColor={changeColor}
        viewStyle={{ borderColor: 'red', borderWidth: 1, borderRadius: 5, marginTop: 20 }}
      />
    </>
  );
};

export default ChangeCInput;
