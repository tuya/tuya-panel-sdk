/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/ban-types */
import { NativeModules } from 'react-native';
import { TYSdk } from 'tuya-panel-kit';
import _ from 'lodash';
import { ColorUtils } from '../../../../../utils';
import { AppleMusicDataType, AppMusicListItemType } from '../interface';

interface OpenMusicOptions {
  isColourExist?: boolean;
  isTempExist?: boolean;
}
type MusicCallback = (data: AppleMusicDataType, i: number) => void;
type Type = 'checking' | 'failure' | 'success' | 'close';
const { native: TYNative, DeviceEventEmitter: DeviceEvent } = TYSdk;
const { TYRCTMusicManager: TYPublicNative } = NativeModules;
let isListening = false;
let isSendEanbled = true;
let timeOutTimer: number;
const listenters: {
  checking?: Function[];
  failure?: Function[];
  success?: Function[];
  close?: Function[];
} = {};

const startVoice = async () =>
  new Promise((resolve, reject) => {
    TYPublicNative.startVoice(d => {
      TYNative.screenAlwaysOn(true);
      resolve(d);
    }, reject);
  });

const stopVoice = async () =>
  new Promise((resolve, reject) => {
    TYPublicNative.stopVoice(d => {
      TYNative.screenAlwaysOn(false);
      resolve(d);
    }, reject);
  });

const fireEvent = (type: Type) => {
  listenters[type]?.forEach((cb: Function) => {
    cb?.();
  });
};

const handleTimeOut = () => {
  return setTimeout(() => {
    // If there is no audio input within 10 seconds, call the detection event
    fireEvent('checking');
    // If there is no audio input within 30 seconds, call the missing event and actively stop monitoring
    timeOutTimer = setTimeout(() => {
      close(false);
      fireEvent('failure');
    }, 30000);
  }, 10000);
};

const handleSuccess = _.throttle(() => {
  fireEvent('success');
}, 1000);

export const addListener = (type: Type, cb: Function) => {
  if (!listenters[type]) {
    listenters[type] = [];
  }
  listenters[type].push(cb);
};
export const removeListener = (type: Type, cb: Function) => {
  if (listenters[type]) {
    const index = listenters[type].indexOf(cb);
    if (index >= 0) {
      listenters[type].splice(index, 1);
    }
  }
};

export const handleAudioRgbChange = _.throttle(
  (
    { R, G, B, C: temp, L: bright, index }: any,
    musicOption: AppMusicListItemType,
    musicCallback: MusicCallback,
    onMusicDataPut: (data: AppleMusicDataType) => void,
    options: OpenMusicOptions
  ) => {
    if (!isListening) return;
    const { isColourExist, isTempExist } = options;

    clearTimeout(timeOutTimer);
    timeOutTimer = handleTimeOut();
    handleSuccess();
    let hue = 0;
    let saturation = 0;
    let value = 0;
    let brightness = 0;
    let temperature = 0;

    const { mode, colorArea } = musicOption;

    if (isColourExist) {
      [hue, saturation, value] = ColorUtils.rgb2hsb(R, G, B).map((v, i) => (i > 0 ? v * 10 : v));
    } else {
      // 是否支持白光音乐功能
      if (typeof bright === 'undefined' || typeof temp === 'undefined') return;

      brightness = bright * 10;
      temperature = temp * 10;
      if (!isTempExist) temperature = 1000;
    }

    if (colorArea) {
      colorArea.forEach(({ area, hue: h, saturation: s, value: v }) => {
        const [left, right] = area;
        if (index >= left && index <= right) {
          hue = h;
          saturation = s;
          value = v;
        }
      });
    }

    const musicData: AppleMusicDataType = {
      mode,
      hue: Math.round(hue),
      saturation: Math.round(saturation),
      value: Math.round(value),
      brightness,
      temperature,
    };

    musicCallback(musicData, index || 5);

    if (isListening && isSendEanbled) onMusicDataPut?.(musicData);
  },
  300
);

/**
 * Turn on the microphone and start monitoring
 */
export const open = async (
  musicOption: AppMusicListItemType,
  musicCallback: MusicCallback,
  onMusicDataPut: (data: AppleMusicDataType) => void,
  options: OpenMusicOptions
) => {
  if (isListening) return Promise.resolve();

  if (!isSendEanbled) {
    resume();
  } else {
    try {
      DeviceEvent.addListener('audioRgbChange', (musicData: any) => {
        handleAudioRgbChange(musicData, musicOption, musicCallback, onMusicDataPut, options);
      });
      // Turn on the microphone
      await startVoice();
      isListening = true;
      isSendEanbled = true;
    } catch (e) {
      return Promise.reject(e);
    }
  }
};

/**
 * Turn off the microphone
 */
export const close = async (needFire = true) => {
  if (!isListening) return Promise.resolve();

  handleSuccess.cancel();
  clearTimeout(timeOutTimer);
  needFire && fireEvent('close');
  isListening = false;
  isSendEanbled = true;
  try {
    DeviceEvent.removeAllListeners('audioRgbChange');

    // Turn off the microphone
    await stopVoice();
    // Turn off keep screen
    TYNative.screenAlwaysOn(false);
  } catch (e) {
    return Promise.reject(e);
  }
};

/**
 * Suspend sending
 */
export const pause = () => {
  handleSuccess.cancel();
  isSendEanbled = false;
};

/**
 * Continue to send
 */
export const resume = () => {
  isSendEanbled = true;
};
