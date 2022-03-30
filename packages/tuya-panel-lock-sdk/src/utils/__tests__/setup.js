jest.mock('react-native', () => {
  return {
    NativeModules: {
      TYRCTPanelDeviceManager: {
        getDpsTimeWithDevId: jest.fn((devId, codes, cb) => {
          cb({ code: Math.random() });
        }),
      },
    },
  };
});

jest.mock('tuya-panel-kit', () => {
  return {
    TYSdk: {
      event: {
        on: jest.fn(),
        off: jest.fn(),
      },
      device: {
        getDpIdByCode: jest.fn(() => {
          return 'code';
        }),
        putDeviceData: jest.fn(),
      },
      devInfo: {},
    },
  };
});
// jest.mock('../DPUtil/utils', () => {
//   return {
//     ...jest.requireActual('./DPUtil/utils'),
//     getObserverLastDpTime: async(dpKey) => {
//       if(typeof dpKey === 'string'){
//         return Promise.resolve(666)
//       } else {
//         return Promise.resolve([666])
//       }
//     },
//     dpKeyWrap: (d) => Symbol(d),
//   }
// })
