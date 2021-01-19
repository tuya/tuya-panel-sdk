import React from 'react';
import { View, Image, Animated } from 'react-native';
import { shallow } from 'enzyme';
import Drawer from '../index.tsx';

const winWidth = 375;
const winHeight = 667;
const imgUrlList =
  'https://images.tuyacn.com/rms-static/3f5ccbb0-94bc-11ea-8e3b-e3ecba4013ec-1589334682603.png?tyName=speed1.png';
const renderContent = (
  <View
    style={{
      width: '100%',
      height: '100%',
      backgroundColor: 'red',
    }}
  >
    <View
      style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
      key={imgUrlList}
    >
      <Image source={{ uri: imgUrlList }} style={{ width: 100, height: 100 }} />
    </View>
  </View>
);

describe('Drawer components', () => {
  it('basic render', () => {
    let placement = 'left';
    let visible = true;
    const wrapper = shallow(
      <Drawer
        width={winWidth / 3}
        height={winHeight}
        placement={'left'}
        visible={visible}
        onClose={jest.fn()}
        onStateChange={jest.fn()}
        renderContent={renderContent}
      />
    );
    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );
    const instance = wrapper.instance();
    instance.range = 375;
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderMove', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    expect(wrapper).toMatchSnapshot();
    placement = 'right';
    visible = false;
    wrapper.setProps({ placement, visible });
  });

  it('right render', () => {
    let placement = 'right';
    let visible = true;
    const wrapper = shallow(
      <Drawer
        width={winWidth / 3}
        height={winHeight}
        placement={placement}
        visible={visible}
        onClose={jest.fn()}
        onStateChange={jest.fn()}
        renderContent={renderContent}
      />
    );
    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderMove', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [], dx: 27 },
    });
    pander.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    wrapper.instance().boxLeft = 300;
    expect(wrapper).toMatchSnapshot();
    placement = 'top';
    visible = true;
    wrapper.setProps({ placement, visible });
  });

  it('top render', () => {
    const wrapper = shallow(
      <Drawer
        width={winWidth}
        height={winHeight / 3}
        placement={'top'}
        visible={true}
        onClose={jest.fn()}
        onStateChange={jest.fn()}
        renderContent={renderContent}
      />
    );

    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderMove', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [], dx: 27 },
    });
    pander.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    wrapper.instance().boxLeft = 300;
    expect(wrapper).toMatchSnapshot();
  });

  it('bottom render', () => {
    const wrapper = shallow(
      <Drawer
        width={winWidth}
        height={winHeight / 3}
        placement={'bottom'}
        visible={true}
        maskClosable={true}
        onClose={jest.fn()}
        onStateChange={jest.fn()}
        renderContent={renderContent}
      />
    );
    const instance = wrapper.instance();
    instance.range = 375;
    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderMove', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [], dx: 27 },
    });
    pander.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('other render', () => {
    const wrapper = shallow(
      <Drawer
        width={winWidth}
        height={winHeight / 3}
        placement={'other'}
        visible={true}
        maskClosable={true}
        onClose={jest.fn()}
        onStateChange={jest.fn()}
        renderContent={renderContent}
      />
    );
    const instance = wrapper.instance();
    instance.range = 375;
    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderMove', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [], dx: 27 },
    });
    wrapper.instance().boxLeft = 50;
    pander.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('other2 render', () => {
    const wrapper = shallow(
      <Drawer
        width={winWidth}
        height={winHeight / 3}
        placement={'other'}
        visible={true}
        maskClosable={true}
        onClose={jest.fn()}
        onStateChange={jest.fn()}
        renderContent={renderContent}
      />
    );
    const instance = wrapper.instance();
    instance.range = 375;
    const pander = wrapper.findWhere(
      c => c.name() === 'View' && !!c.prop('onStartShouldSetResponder') === true
    );
    pander.simulate('startShouldSetResponder', { nativeEvent: { locationX: 45, locationY: 3 } });
    pander.simulate('moveShouldSetResponder');
    pander.simulate('responderGrant', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    pander.simulate('responderMove', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [], dx: 27 },
    });
    wrapper.instance().boxLeft = 300;
    pander.simulate('responderRelease', {
      nativeEvent: { touches: [] },
      touchHistory: { touchBank: [] },
    });
    expect(wrapper).toMatchSnapshot();
  });
});
