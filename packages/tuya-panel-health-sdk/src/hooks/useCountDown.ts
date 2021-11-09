import { useEffect, useState } from 'react';

export type Options = {
  targetCount?: number | undefined;
  interval?: number;
  onEnd?: () => void;
};

const useCountDown = (option?: Options) => {
  const { targetCount, interval = 1000, onEnd } = option || {};

  const [target, setTargetCount] = useState<number | undefined>(targetCount);
  const [countdown, setCountdown] = useState(target);
  useEffect(() => {
    if (!target) {
      // for stop
      setCountdown(0);
      return;
    }
    const timer = setInterval(() => {
      if (countdown === 0) {
        clearInterval(timer);
        if (onEnd) {
          onEnd();
        }
      } else {
        setCountdown(prev => prev - interval);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [countdown, interval, target]);

  return [countdown, setTargetCount] as const;
};

export default useCountDown;
