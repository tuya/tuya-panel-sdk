import React from 'react';
import { shallow } from 'enzyme';
import SimpleTopBar from '../index';
import { IconFont, GlobalToast } from 'tuya-panel-kit';

describe('SimpleTopBar components', () => {
  it('basic render', () => {
    const wrapper = shallow(<SimpleTopBar />);
    expect(wrapper).toMatchSnapshot();
  });

  it('content render', () => {
    const tit = '测试';
    const PathDix =
      'M697.832 327.048l-64.952-64.922L308.07 586.868c-53.814 53.792-53.814 141.048 0 194.844 53.804 53.792 141.06 53.792 194.874 0l389.772-389.708c89.714-89.662 89.714-235.062 0-324.726-89.666-89.704-235.112-89.704-324.782 0L158.67 476.424l0.034 0.032c-0.29 0.304-0.612 0.576-0.876 0.846-125.102 125.096-125.102 327.856 0 452.906 125.054 125.056 327.868 125.056 452.988 0 0.274-0.274 0.516-0.568 0.82-0.876l0.032 0.034 279.332-279.292-64.986-64.92L546.7 864.416l-0.016 0c-0.296 0.268-0.564 0.57-0.846 0.844-89.074 89.058-233.98 89.058-323.076 0-89.062-89.042-89.062-233.922 0-322.978 0.304-0.304 0.604-0.582 0.888-0.846l-0.046-0.06 409.28-409.166c53.712-53.738 141.144-53.738 194.886 0 53.712 53.734 53.712 141.148 0 194.84L437.998 716.75c-17.936 17.922-47.054 17.922-64.972 0-17.894-17.886-17.894-47.032 0-64.92L697.832 327.048z';
    const props = {
      title: tit,
      rightNode: <IconFont d={PathDix} />,
      leftNode: <IconFont d={PathDix} />,
      leftStyle: { marginLeft: 0 },
      rightStyle: { marginRight: 0 },
      wrapStyle: { backgroundColor: 'gray' },
      titleStyle: { color: 'pink' },
    };
    const wrapper = shallow(<SimpleTopBar {...props} />);
    expect(wrapper).toMatchSnapshot();

    wrapper.unmount();
  });

  it('render touch', () => {
    const props = {
      rightActionFunc: mockCallBack,
      leftActionFunc: mockCallBack,
    };
    const mockCallBack = jest.fn();
    const wrapper = shallow(<SimpleTopBar {...props} />);
    const wrapperHandle = wrapper.children().at(0);
    const wrapperHandle2 = wrapper.children().at(2);
    wrapperHandle.simulate('press');
    wrapperHandle2.simulate('press');
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });

  it('render func', () => {
    const func = () => {
      GlobalToast.show({
        text: 'rightActionFunc',
        onFinish: () => {
          GlobalToast.hide();
        },
      });
    };
    const func2 = () => {
      GlobalToast.show({
        text: 'leftActionFunc',
        onFinish: () => {
          GlobalToast.hide();
        },
      });
    };
    const props = {
      rightActionFunc: func,
      leftActionFunc: func2,
    };
    const wrapper = shallow(<SimpleTopBar {...props} />);
    const wrapperHandle = wrapper.children().at(0);
    const wrapperHandle2 = wrapper.children().at(2);
    wrapperHandle.simulate('press');
    wrapperHandle2.simulate('press');
    expect(wrapper).toMatchSnapshot();
    wrapper.unmount();
  });
});
