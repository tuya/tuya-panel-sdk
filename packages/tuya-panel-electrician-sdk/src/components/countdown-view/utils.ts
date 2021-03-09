export const formatTimeValue = (type, value) => value * getTimePlus(type);

export const getTimePlus = type => {
  let plus = 1;
  switch (type) {
    case 'min':
      plus = 60;
      break;
    case 'hour':
      plus = 3600;
      break;
    default:
      break;
  }
  return plus;
};
