import React, { useState, useRef } from 'react';
import { CountDownTimerType, Timer } from './interface';

export const useCountDownTimer: CountDownTimerType = (count = 3) => {
  const [number, setNumber] = useState<number>(count);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  const startCount = () => {
    const countDownFn = () => {
      setNumber(pre => {
        const n = pre;
        if (n === 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return n - 1;
      });
    };
    intervalRef.current = setInterval(countDownFn, 1000);
  };

  React.useEffect(() => {
    startCount();
    return () => clearInterval(intervalRef.current);
  }, []);

  const timer: Timer = {
    stop: () => {
      clearInterval(intervalRef.current);
    },
    reStart: () => {
      startCount();
    },
    refresh: () => {
      setNumber(count);
      startCount();
    },
    isEnd: () => number === 0,
  };

  return [number, timer];
};
