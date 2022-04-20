// /**
//  * @jest-environment jsdom
//  */
// import React from 'react';
// import { shallow } from 'enzyme';
// import ImageAnimate from '../index';

// global.document = document;
// global.window = window;

// describe('DpCacheText', () => {
//   it('basic demo', () => {
//     const wrapper = shallow(<ImageAnimate />);
//     expect(wrapper).toMatchSnapshot();
//   });

//   it('basic demo1', () => {
//     const wrapper = shallow(
//       <ImageAnimate
//         source="https://www.google.com.hk/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
//         style={{ borderColor: '#fff' }}
//       />
//     );
//     expect(wrapper).toMatchSnapshot();
//   });
// });

import React from 'react';
import { Text } from 'react-native';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ImageAnimate from '../index';

const reload =
  'https://www.google.com.hk/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png';

configure({ adapter: new Adapter() });

describe('ImageAnimate', () => {
  let useEffect;
  let effectWrapper;
  const mockUseEffect = () => {
    useEffect.mockImplementationOnce(f => f());
  };
  beforeEach(() => {
    useEffect = jest.spyOn(React, 'useEffect');
    mockUseEffect(); // 2 times
    mockUseEffect(); //
    effectWrapper = shallow(<ImageAnimate />);
  });

  it('default render', () => {
    const wrapper = shallow(<ImageAnimate />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render widthSource', () => {
    const wrapper = shallow(<ImageAnimate source={reload} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('render widthChildren', () => {
    const wrapper = shallow(
      <ImageAnimate source={reload}>
        <Text>我是children</Text>
      </ImageAnimate>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render widthStyle', () => {
    const wrapper = shallow(
      <ImageAnimate style={{ backgroundColor: 'green' }}>
        <Text>我是children</Text>
      </ImageAnimate>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render widthAll', () => {
    const wrapper = shallow(
      <ImageAnimate source={reload} style={{ backgroundColor: 'green' }}>
        <Text>我是children</Text>
      </ImageAnimate>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('render width children', () => {
    const wrapper = shallow(
      <ImageAnimate source={reload} style={{ backgroundColor: 'green' }}>
        <Text>我是children</Text>
      </ImageAnimate>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('use effect', () => {
    expect(effectWrapper).toMatchSnapshot();
  });
});
