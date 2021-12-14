import React, { useRef, useState } from 'react';
import { BreakPointInput } from '@tuya/tuya-panel-szos-sdk/src/components';
import { TYText } from 'tuya-panel-kit';

interface IRef {
  ipAddRess?: string;
}
const BreakInput: React.FC = () => {
  const [changeColor, setColor] = useState<boolean>(false);
  const ipRef = useRef<IRef>(null);

  const focusFuc = () => {
    setColor(true);
  };

  return (
    <>
      <TYText text="ip输入，自动跳转下一个" />
      <BreakPointInput name="ip" ref={ipRef} focusFuc={focusFuc} changeColor={changeColor} />
    </>
  );
};

export default BreakInput;
