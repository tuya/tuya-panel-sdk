/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const formatTimeValue = (type, value) => {
  return value * getTimePlus(type);
};

const getTimePlus = type => {
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

export { formatTimeValue, getTimePlus };
