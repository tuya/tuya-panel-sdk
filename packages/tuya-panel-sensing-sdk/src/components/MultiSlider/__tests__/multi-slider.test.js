import React from 'react';
import { Text } from 'react-native';
import { shallow, mount } from 'enzyme';
import MultiSlider from '../index';

const reload =
  'https://www.google.com.hk/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png';

describe('multi slider', () => {
  const MultiSliderCom = null;
  // beforeAll(() => {
  //   console.log('BeforeAll');
  // });

  // beforeEach(() => {
  //   console.log('BeforeEach');
  //   MultiSliderCom = new MultiSlider();
  // });
  // afterEach(() => {
  //   console.log('AfterEach');
  // });

  // afterAll(() => {
  //   console.log('AfterAll');
  // });

  it('default render', () => {
    const wrapper = shallow(
      <MultiSlider
        values={[10, 80]}
        min={0}
        max={100}
        step={1}
        sliderLength={280}
        isMarkersSeparated
        enableLabel
        onValuesChangeStart={() => undefined}
        onValuesChange={() => undefined}
        onValuesChangeFinish={() => undefined}
        onMarkersPosition={() => undefined}
        imageBackgroundSource={reload}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('no bg', () => {
    const wrapper = shallow(
      <MultiSlider
        values={[10, 80]}
        min={0}
        max={100}
        step={1}
        isMarkersSeparated={false}
        sliderLength={280}
        selectedStyle={{ backgroundColor: 'red' }}
        enableLabel={false}
        onValuesChangeStart={() => undefined}
        onValuesChange={() => undefined}
        onValuesChangeFinish={() => undefined}
        onMarkersPosition={() => undefined}
        onToggleOne={() => undefined}
        onToggleTwo={() => undefined}
        allowOverlap={false}
        snapped
        unit="%"
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
