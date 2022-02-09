import React, { useRef, useEffect } from 'react';

/**
 * useRef 外层 实时更新传入数据
 */
export const useRefenrence = <T>(obj: T): React.MutableRefObject<T> => {
  const objRef = useRef<T>(obj);

  useEffect(() => {
    objRef.current = obj;
  });

  return objRef;
};
