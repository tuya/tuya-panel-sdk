import React from 'react';
import { shallow } from 'enzyme';
import TYIpcPir from '../index';
import OnePir from '../onePir';
import TwoPir from '../twoPir';
import ThreePir from '../threePir';

const onChangePir = jest.fn();

const setupOne = (props = {}) => {
  const wrapper = shallow(
    <OnePir
      pirWidth={300}
      pirHeight={200}
      onChangePir={onChangePir}
      OnText={'ON'}
      OffText={'OFF'}
      pieBtnTextStyle={{}}
      {...props}
    />
  );
  const instance = wrapper.instance();
  return { wrapper, instance };
};

const setupTwo = (props = {}) => {
  const wrapper = shallow(
    <TwoPir
      pirWidth={300}
      pirHeight={200}
      onChangePir={onChangePir}
      OnText={'ON'}
      OffText={'OFF'}
      pieBtnTextStyle={{}}
      {...props}
    />
  );
  const instance = wrapper.instance();
  return { wrapper, instance };
};
const setupThree = (props = {}) => {
  const wrapper = shallow(
    <ThreePir
      pirWidth={300}
      pirHeight={200}
      onChangePir={onChangePir}
      OnText={'ON'}
      OffText={'OFF'}
      pieBtnTextStyle={{}}
      {...props}
    />
  );
  const instance = wrapper.instance();
  return { wrapper, instance };
};

describe('TYIpcPir components', () => {
  it('basic render', () => {
    const wrapper = shallow(<TYIpcPir />);
    expect(wrapper).toMatchSnapshot();
  });

  it('some pir is true', () => {
    const wrapper = shallow(<TYIpcPir dpCodeAValue={true} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('pieNumber is 2', () => {
    const wrapper = shallow(<TYIpcPir pieNumber={2} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('pieNumber is 3', () => {
    const wrapper = shallow(<TYIpcPir pieNumber={3} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('one pir component', () => {
    it('render one area', () => {
      const { wrapper } = setupOne();
      expect(wrapper).toMatchSnapshot();
    });

    it('dpcode value is true and color is not default', () => {
      const { wrapper } = setupOne({
        dpCodeAValue: true,
        activeColor: '#eeeeee',
      });
      expect(wrapper).toMatchSnapshot();
    });
    it('dpcode value is true and color is default', () => {
      const { wrapper } = setupOne({
        dpCodeAValue: true,
        activeColor: '#fc2f07',
      });
      expect(wrapper).toMatchSnapshot();
    });
    it('should have onChangePir event', () => {
      const { wrapper } = setupOne();
      const targetNode = wrapper.findWhere(
        node => node.name() === 'TouchableOpacity' && !!node.prop('onPress') === true
      );
      targetNode.at(0).simulate('press');
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('two pir component', () => {
    it('render two area', () => {
      const { wrapper } = setupTwo();
      expect(wrapper).toMatchSnapshot();
    });

    it('dpcode value is true and color is not default', () => {
      const { wrapper } = setupTwo({
        dpCodeAValue: true,
        dpCodeBValue: true,
        activeColor: '#eeeeee',
      });
      expect(wrapper).toMatchSnapshot();
    });
    it('dpcode value is true and color is default', () => {
      const { wrapper } = setupTwo({
        dpCodeAValue: true,
        dpCodeBValue: true,
        activeColor: '#fc2f07',
      });
      expect(wrapper).toMatchSnapshot();
    });
    it('should have onChangePir event', () => {
      const { wrapper } = setupTwo();
      const targetNode = wrapper.findWhere(
        node => node.name() === 'TouchableOpacity' && !!node.prop('onPress') === true
      );
      targetNode.at(0).simulate('press');
      targetNode.at(1).simulate('press');
      expect(wrapper).toMatchSnapshot();
    });
  });
  describe('three pir component', () => {
    it('render three area', () => {
      const { wrapper } = setupThree();
      expect(wrapper).toMatchSnapshot();
    });

    it('dpcode value is true and color is not default', () => {
      const { wrapper } = setupThree({
        dpCodeAValue: true,
        dpCodeBValue: true,
        dpCodeCValue: true,
        activeColor: '#eeeeee',
      });
      expect(wrapper).toMatchSnapshot();
    });
    it('dpcode value is true and color is default', () => {
      const { wrapper } = setupThree({
        dpCodeAValue: true,
        dpCodeBValue: true,
        dpCodeCValue: true,
        activeColor: '#fc2f07',
      });
      expect(wrapper).toMatchSnapshot();
    });
    it('should have onChangePir event', () => {
      const { wrapper } = setupThree();
      const targetNode = wrapper.findWhere(
        node => node.name() === 'TouchableOpacity' && !!node.prop('onPress') === true
      );
      targetNode.at(0).simulate('press');
      targetNode.at(1).simulate('press');
      targetNode.at(2).simulate('press');
      expect(wrapper).toMatchSnapshot();
    });
  });
});
