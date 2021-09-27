// 延时调用
export const delayCall = (cb: () => void, delay = 3000): number => {
  const timer = setTimeout(() => {
    cb && cb();
    clearTimeout(timer);
  }, delay);

  return timer;
};
