/**
 * @jest-environment jsdom
 */
import React from 'react';
import { mount, shallow } from 'enzyme';
import { TYSdk, Utils } from 'tuya-panel-kit';
import Child from '../child';
import homeModal from '../homeModal';

const { convertX: cx } = Utils.RatioUtils;

describe('homeModal components', () => {
  beforeEach(() => {});
  it('homeModal render', async () => {
    const onMaskPress = () => {
      //
    };

    const wrapper = mount(
      homeModal({
        title: 'title',
        subTitle: 'subTitle',
        done: 'done',
        bgImage: 'bgImage',
        bgStyle: { width: cx(280), height: cx(170), justifyContent: 'center' },
        bgChildStyle: {
          width: cx(280),
          height: cx(150),
          marginTop: cx(40),
        },
        showModal: true,
        v1Bottom: cx(300),
        v2Bottom: cx(100),
        iconBoxStyle: { position: 'absolute', right: cx(10) },
        iconProp: {
          color: '#333',
          size: cx(24),
          iconStyle: {
            width: cx(50),
            height: cx(50),
            borderRadius: cx(50),
            alignItems: 'center',
            justifyContent: 'center',
          },
        },
        icon: '',
        onMaskPress: () => onMaskPress(1),
      })(Child)
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
