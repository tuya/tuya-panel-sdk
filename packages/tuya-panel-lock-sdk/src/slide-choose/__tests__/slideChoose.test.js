import React from 'react';
import { shallow } from 'enzyme';
import SlideChoose from '../SlideChoose';

describe('SlideChoose component', () => {
  it('should render without issues', () => {
    let cleanUp = jest.fn();
    const useEffect = jest.spyOn(React, 'useEffect');
    useEffect.mockImplementation(f => {
      cleanUp = f();
    });
    const slideChoose = shallow(<SlideChoose />);

    expect(slideChoose.length).toBe(1);
    cleanUp();
  });

  it('should render with custom text', () => {
    const component = shallow(<SlideChoose leftText="同意" rightText="拒绝" />);
    expect(component.find({ testID: 'leftText' }).props()).toHaveProperty('children', '同意');
    expect(component.find({ testID: 'rightText' }).props()).toHaveProperty('children', '拒绝');
    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('should render with custom colors', () => {
    const component = shallow(
      <SlideChoose
        leftColors={{ '0%': 'skyblue', '100%': 'blue' }}
        rightColors={{ '0%': 'yellow', '100%': 'orange' }}
      />
    );

    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('should render with tiggerDistance', () => {
    const component = shallow(<SlideChoose tiggerDistance={10} />);

    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('render with btnTextColor', () => {
    const component = shallow(<SlideChoose btnTextColor="black" />);

    expect(
      component
        .find({ testID: 'leftText' })
        .props()
        .style.find(item => item.color === 'black')
    ).toBeDefined();
    expect(component.length).toBe(1);
    expect(component).toMatchSnapshot();
  });

  it('test drag', () => {
    const component = shallow(<SlideChoose btnTextColor="black" />);
    const circleCom = component.find({ testID: 'circleKey' });

    circleCom.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });

    circleCom.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });

    circleCom.simulate(
      'responderMove',
      {
        nativeEvent: { touches: [] },
        touchHistory: { touchBank: [] },
      },
      { moveX: 100 }
    );

    circleCom.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });

    circleCom.simulate('responderEnd', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    expect(component).toMatchSnapshot();
  });
});
