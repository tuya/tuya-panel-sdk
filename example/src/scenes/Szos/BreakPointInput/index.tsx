import React, { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { BreakPointInput } from '@tuya/tuya-panel-szos-sdk/src/components';
import { TYText } from 'tuya-panel-kit';

interface IRef {
  value?: string;
  resultStr?: string;
}
const BreakInput: React.FC = () => {
  const [arr, setArr] = useState<unknown>([]);
  const [str, setStr] = useState<string>('');
  const ipRef = useRef<IRef>(null);

  const press = () => {
    setStr(ipRef?.current?.resultStr || '');
    setArr(ipRef?.current?.value || null);
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={1}
        onPress={press}
        style={{
          paddingHorizontal: 50,
          paddingVertical: 20,
          backgroundColor: 'pink',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <TYText text="点我" />
      </TouchableOpacity>
      <TYText text="ip输入，自动跳转下一个" />
      <TYText text={`输出数组：${arr}`} />
      <TYText text={`输出字符串：${str}`} />
      <BreakPointInput name="ip" ref={ipRef} />
    </>
  );
};

export default BreakInput;
