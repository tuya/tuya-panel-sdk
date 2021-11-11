/**
 * @jest-environment jsdom
 */
import React, { useRef, useEffect } from 'react';
// import { View } from 'react-native';
import { shallow, mount } from 'enzyme';
import { Utils } from 'tuya-panel-kit';
import SlideChoose from '../SlideChoose';
import ArrowWave from '../ArrowWave';

const { width: screenWidth } = Utils.RatioUtils;

jest.mock('react-native-svg', () => {
  const realRectSvg = jest.requireActual('react-native-svg');
  return {
    ...realRectSvg,
    Rect: ({ children }) => <>{children}</>,
    Circle: ({ children }) => <>{children}</>,
  };
});

jest.mock('tuya-panel-kit', () => {
  const realComponents = jest.requireActual('tuya-panel-kit');
  return {
    ...realComponents,
    LinearGradient: ({ children }) => <>{children}</>,
  };
});

describe('SlideChoose component', () => {
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
  it('should render without issues', () => {
    const component = mount(<SlideChoose />);

    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('should render with custom text', () => {
    const component = shallow(<SlideChoose leftText="同意" rightText="拒绝" />);
    const leftEle = component.findWhere(r => r.prop('testID') === 'btn-text').first();
    const rightEle = component.findWhere(r => r.prop('testID') === 'btn-text').at(1);

    expect(leftEle.props()).toHaveProperty('children', '同意');
    expect(rightEle.props()).toHaveProperty('children', '拒绝');
    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
    component.unmount();
  });

  it('test btn element text', () => {
    const Text = t => <>{t}</>;
    const component = shallow(<SlideChoose leftText={<Text>2222</Text>} />);

    expect(component.length).toBe(1);
  });

  it('render with btnTextColor', () => {
    const component = shallow(<SlideChoose btnTextColor="black" />);
    expect(component.find({ testID: 'btn-text' }).getElements()[0].props.style.color).toBe('black');
    component.unmount();
  });

  it('render with singleSide', () => {
    const component = shallow(<SlideChoose singleSide="right" />);
    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('render with custom color', () => {
    const component = shallow(
      <SlideChoose
        leftColor={{
          linearStops: {
            '0%': '#FF4040',
            '100%': 'rgba(254,72,71,0.5)',
          },
        }}
      />
    );
    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('test with openWaveAnimation', () => {
    const component = mount(<SlideChoose openWaveAnimation={false} />);

    expect(component.length).toBe(1);
    component.unmount();
  });

  it('test ArrowWave', () => {
    const TestCom = () => {
      const arrowRef = useRef();

      useEffect(() => {
        arrowRef.current.stop();
        arrowRef.current.start();
        arrowRef.current.hide();
        arrowRef.current.show();
      }, []);

      return <ArrowWave ref={arrowRef} />;
    };
    const component = mount(<TestCom />);
    expect(component.length).toBe(1);
    component.unmount();
  });

  it('test panResponder events', () => {
    const component = shallow(<SlideChoose btnTextColor="black" />);
    const circleCom = component.findWhere(r => r.prop('testID') === 'circleKey');
    const comProps = circleCom.props();
    const params = { touchHistory: { touchBank: [] }, nativeEvent: { touches: [] } };

    comProps.onStartShouldSetResponder(params);
    comProps.onMoveShouldSetResponder(params);
    comProps.onStartShouldSetResponderCapture(params);
    comProps.onMoveShouldSetResponderCapture(params);
    comProps.onResponderGrant(params);
    comProps.onResponderReject(params);
    comProps.onResponderRelease(params);
    comProps.onResponderStart(params);
    comProps.onResponderMove(params);
    comProps.onResponderEnd(params);
    comProps.onResponderTerminate(params);
    comProps.onResponderTerminationRequest(params);

    expect(component.length).toBe(1);
    component.unmount();
  });

  it('test touch to end', () => {
    const rejectFn = jest.fn();
    const component = shallow(<SlideChoose btnTextColor="black" onChooseLeft={rejectFn} />);

    const circleCom = component.findWhere(r => r.prop('testID') === 'circleKey');
    const comProps = circleCom.props();
    const params = {
      touchHistory: {
        numberActiveTouches: 1,
        indexOfSingleActiveTouch: 1,
        mostRecentTimeStamp: 2847243.9988080002,
        touchBank: [
          null,
          {
            touchActive: true,
            startPageX: 199.66665649414062,
            startPageY: 740.6666564941406,
            startTimeStamp: 2847233.7937320005,
            currentPageX: 0,
            currentPageY: 736,
            currentTimeStamp: 2847243.9988080002,
            previousPageX: 200,
            previousPageY: 736,
            previousTimeStamp: 2847243.602797,
          },
        ],
      },
      nativeEvent: { touches: [] },
    };
    comProps.onResponderMove(params);

    comProps.onResponderEnd(params);
    expect(rejectFn).toBeCalledTimes(1);
    component.unmount();
  });

  it('test async slider', () => {
    const asyncRejectFn = jest.fn(done => done());
    const asyncComponent = shallow(
      <SlideChoose async btnTextColor="black" onChooseLeft={asyncRejectFn} />
    );
    const asyncCircleCom = asyncComponent.findWhere(r => r.prop('testID') === 'circleKey');
    const asyncComProps = asyncCircleCom.props();
    const params = {
      touchHistory: {
        numberActiveTouches: 1,
        indexOfSingleActiveTouch: 1,
        mostRecentTimeStamp: 2847243.9988080002,
        touchBank: [
          null,
          {
            touchActive: true,
            startPageX: 199.66665649414062,
            startPageY: 740.6666564941406,
            startTimeStamp: 2847233.7937320005,
            currentPageX: 0,
            currentPageY: 736,
            currentTimeStamp: 2847243.9988080002,
            previousPageX: 200,
            previousPageY: 736,
            previousTimeStamp: 2847243.602797,
          },
        ],
      },
      nativeEvent: { touches: [] },
    };
    asyncComProps.onResponderMove(params);
    asyncComProps.onResponderEnd(params);
    expect(asyncRejectFn).toBeCalledTimes(1);
    asyncComponent.unmount();
  });

  it('test touch not end', () => {
    const rejectFn = jest.fn();
    const component = shallow(<SlideChoose btnTextColor="black" onChooseLeft={rejectFn} />);
    const circleCom = component.findWhere(r => r.prop('testID') === 'circleKey');
    const comProps = circleCom.props();
    const params = {
      touchHistory: {
        numberActiveTouches: 1,
        indexOfSingleActiveTouch: 1,
        mostRecentTimeStamp: 2847243.9988080002,
        touchBank: [
          null,
          {
            touchActive: true,
            startPageX: 199.66665649414062,
            startPageY: 740.6666564941406,
            startTimeStamp: 2847233.7937320005,
            currentPageX: 0,
            currentPageY: 736,
            currentTimeStamp: 2847243.9988080002,
            previousPageX: 200,
            previousPageY: 736,
            previousTimeStamp: 2847243.602797,
          },
        ],
      },
      nativeEvent: { touches: [] },
    };

    comProps.onResponderEnd(params);

    expect(rejectFn).not.toBeCalled();
  });
});
