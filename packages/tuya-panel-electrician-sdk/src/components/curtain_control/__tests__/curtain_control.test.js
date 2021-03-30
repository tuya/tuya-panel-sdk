import React from 'react';
import colors from 'color';
import CurtainControl from '../index';
import Animate from '../animate';
import { shallow } from 'enzyme';
import {
  renderStyle,
  DEFAULTPROPS,
  getTextColor,
  icons as ICON,
  getDisable,
  DELAY,
  DELAY2,
  DURTION2,
  DURTION,
} from '../utils';

const icons = {
  up:
    'https://images.tuyacn.com/rms-static/f4a117d0-5fcb-11eb-b1b5-63311f5b140c-1611661515213.png?tyName=up%402x.png',
};

describe('CurtainControl', () => {
  it('基础渲染: osProps', () => {
    const component = shallow(
      <CurtainControl
        radius={10}
        data={[]}
        bigCircleBg="#237812"
        bigBorderColor="#237812"
        smallCircleBg="#237812"
        smallBorderColor="#237812"
        isHorizontal={true}
        open={{ text: 'open', color: '#412321', animateColor: '#412321' }}
        close={{ text: 'close', color: '#412321', animateColor: '#412321' }}
        stop={{ color: '#128713' }}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it('动画配置: 基础', () => {
    const component = shallow(
      <Animate
        icon={icons.up}
        color="#124590"
        isTop={true}
        isHorization={false}
        onPress={() => {}}
      />
    );
    expect(component).toMatchSnapshot();
  });
  it('utils - renderStyle', () => {
    expect(renderStyle(100, '#123412', '#123412', 1)).toEqual({
      width: 200,
      height: 200,
      borderRadius: 100,
      backgroundColor: '#123412',
      borderWidth: 1,
      borderColor: '#123412',
    });
  });
  it('utils - DEFAULTPROPS', () => {
    expect(DEFAULTPROPS).toEqual({
      radius: 150,
      data: [],
      bigCircleBg: colors('#FFFFFF').alpha(0.042).rgbString(),
      bigBorderColor: colors('#DBDBDB').alpha(0.2).rgbString(),
      smallCircleBg: '#383838',
      smallBorderColor: '#303030',
      isHorizontal: false,
      open: {
        text: 'open',
        color: '#FFFFFF',
        animateColor: '#1E9BC0',
      },
      close: {
        text: 'close',
        color: '#FFFFFF',
        animateColor: '#1E9BC0',
      },
      stop: {
        color: '#FFFFFF',
      },
    });
  });
  it('utils - getTextColor', () => {
    expect(
      getTextColor(
        'open',
        { text: 'open', color: '#123412' },
        { text: 'close', color: '#123412' },
        { text: '', color: '#123412' }
      )
    ).toEqual({
      txt: 'open',
      color: '#123412',
    });
    expect(
      getTextColor(
        'close',
        { text: 'open', color: '#123412' },
        { text: 'close', color: '#123412' },
        { text: '', color: '#123412' }
      )
    ).toEqual({
      txt: 'close',
      color: '#123412',
    });
    expect(
      getTextColor(
        'stop',
        { text: 'open', color: '#123412' },
        { text: 'close', color: '#123412' },
        { text: '', color: '#123412' }
      )
    ).toEqual({
      txt: '',
      color: '#123412',
    });
  });
  it('utils - ICON', () => {
    expect(ICON.up).toEqual(
      'M105.545143 621.860571a54.857143 54.857143 0 0 1-1.609143-71.68l5.632-5.851428 365.714286-329.142857a54.857143 54.857143 0 0 1 66.852571-5.046857l6.582857 5.12 365.714286 329.142857a54.857143 54.857143 0 0 1-66.998857 86.528l-6.436572-5.046857L512 329.874286 183.003429 625.883429a54.857143 54.857143 0 0 1-71.68 1.609142l-5.851429-5.632z'
    );
    expect(ICON.down).toEqual(
      'M918.454857 402.139429a54.857143 54.857143 0 0 1 1.609143 71.68l-5.632 5.851428-365.714286 329.142857a54.857143 54.857143 0 0 1-66.852571 5.046857l-6.582857-5.12-365.714286-329.142857a54.857143 54.857143 0 0 1 66.998857-86.528l6.436572 5.046857L512 694.125714l328.996571-296.082285a54.857143 54.857143 0 0 1 71.68-1.609143l5.851429 5.632z'
    );
    expect(ICON.stop).toEqual(
      'M292.571429 73.142857a73.142857 73.142857 0 0 1 73.142857 73.142857v731.428572a73.142857 73.142857 0 0 1-146.285715 0V146.285714a73.142857 73.142857 0 0 1 73.142858-73.142857z m438.857142 0a73.142857 73.142857 0 0 1 73.142858 73.142857v731.428572a73.142857 73.142857 0 0 1-146.285715 0V146.285714a73.142857 73.142857 0 0 1 73.142857-73.142857z'
    );
  });
  it('utils - getDisable', () => {
    expect(getDisable('open', 0, false)).toEqual(false);
    expect(getDisable('stop', 0, true)).toEqual(false);
    expect(getDisable('close', 0, false)).toEqual(false);
  });
  it('utils - DELAY', () => {
    expect(DELAY[0]).toEqual(200);
    expect(DELAY[1]).toEqual(400);
    expect(DELAY[2]).toEqual(600);
  });
  it('utils - DURTION', () => {
    expect(DURTION[0]).toEqual(900);
    expect(DURTION[1]).toEqual(700);
    expect(DURTION[2]).toEqual(500);
  });
  it('utils - DELAY2', () => {
    expect(DELAY2[0]).toEqual(600);
    expect(DELAY2[1]).toEqual(400);
    expect(DELAY2[2]).toEqual(200);
  });
  it('utils - DURTION2', () => {
    expect(DURTION2[0]).toEqual(500);
    expect(DURTION2[1]).toEqual(700);
    expect(DURTION2[2]).toEqual(900);
  });
});
