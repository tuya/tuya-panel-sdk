/* eslint-disable no-console */
import React from 'react';
import { shallow } from 'enzyme';
import Picture from '../AesPictrue/Picture';
import Mantle from '../Mantle';
import Video from '../AesVideo/Video';
import PlayButton from '../AesVideo/PlayButton';

jest.mock('react-native', () => {
  return {
    requireNativeComponent: () => null,
    ViewStyle: {},
    View: null,
    Dimensions: { get: jest.fn },
    Platform: { OS: 'ios' },
    StyleSheet: { create: jest.fn },
    NativeEventEmitter: jest
      .fn()
      .mockImplementation(() => ({ addListener: jest.fn, removeListener: jest.fn })),
    NativeModules: {
      TYRCTCameraManager: {},
      TYRCTEncryptImageDownloadManager: {
        saveToAlbum: jest.fn((p, k, success, fail) => {
          success();
          fail();
        }),
      },
    },
    Animated: {
      Value: jest.fn().mockImplementation(),
    },
  };
});

jest.mock('tuya-panel-kit', () => ({
  // ...jest.requireActual('tuya-panel-kit'),
  Utils: { RatioUtils: { convertX: jest.fn(), convertY: jest.fn(), currentHeight: 0 } },
  I18N: jest.fn().mockImplementation(() => ({ getLang: jest.fn() })),
  Toast: {
    success: null,
    Error: null,
    Warning: null,
    Loading: null,
  },
}));

jest.mock('react-native-svg', () => ({}));

jest.mock('../../hooks', () => ({
  useToast: jest
    .fn()
    .mockImplementation(() => [null, { success: jest.fn, error: jest.fn, loading: jest.fn }]),
  useRefenrence: jest.fn().mockImplementation(a => a),
}));

jest.mock('react-native-easy-view-transformer', () => null);

jest.mock('@tuya/tuya-panel-ipc-sdk', () => ({
  TYIpcNativeModule: {
    CameraMessageManager: {},
    MessageMediaPlayer: {},
  },
}));

describe('AvPreview components', () => {
  const originConsoleError = console.error;
  const originConsoleWarn = console.warn;

  beforeEach(() => {
    console.error = () => {};
    console.warn = () => {};
  });
  afterEach(() => {
    console.warn = originConsoleWarn;
    console.error = originConsoleError;
  });

  it('Picture render', () => {
    const wrapper = shallow(<Picture />);
    const downloadBtn = wrapper.findWhere(i => i.prop('testID') === 'download-btn');
    downloadBtn.simulate('press');
    expect(wrapper).toMatchSnapshot();
  });

  it('Mantle render', () => {
    const com = shallow(<Mantle />);

    expect(com).toMatchSnapshot();
  });

  it('Video render', () => {
    const com = shallow(<Video poster={{ path: '', key: '' }} source={{ path: '', key: '' }} />);

    expect(com).toMatchSnapshot();
  });

  it('PlayButton render', () => {
    const com = shallow(<PlayButton />);

    expect(com).toMatchSnapshot();
  });
});
