const sum = (arr: number[]) => {
  if (arr.length === 0) return arr;
  return [...arr].reduce((acc, val) => acc + val, 0);
};

export { sum };
