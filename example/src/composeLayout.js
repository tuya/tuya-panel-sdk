import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider, connect } from 'react-redux';
import { TYSdk, Theme } from 'tuya-panel-kit';

import { devInfoChange, deviceChange, responseUpdateDp } from './redux/modules/common';
import DebugView from './components/DebugView';

const composeLayout = (store, component) => {
  const NavigatorLayoutContainer = connect(({ devInfo, theme }) => ({ devInfo, theme }))(component);
  const ThemeContainer = connect(({ theme }) => ({ theme }))(Theme);
  const { dispatch } = store;

  TYSdk.event.on('deviceChanged', data => {
    dispatch(deviceChange(data));
  });

  // eslint-disable-next-line
  TYSdk.event.on('dpDataChange', data => {
    dispatch(responseUpdateDp(data));
  });

  class PanelComponent extends Component {
    static propTypes = {
      // eslint-disable-next-line
      devInfo: PropTypes.object.isRequired,
    };

    constructor(props) {
      super(props);

      if (props && props.devInfo && props.devInfo.devId) {
        TYSdk.device.setDeviceInfo(props.devInfo);
        TYSdk.device.getDeviceInfo().then(data => dispatch(devInfoChange(data)));
        // eslint-disable-next-line
      } else if (props.preload) {
        // do something
      } else {
        TYSdk.device.getDeviceInfo().then(data => dispatch(devInfoChange(data)));
      }
    }

    render() {
      return (
        <Provider store={store}>
          <ThemeContainer>
            <View style={{ flex: 1 }}>
              <NavigatorLayoutContainer
                scope={_.get(this.props, 'extraInfo.scope')}
                component={_.get(this.props, 'extraInfo.component')}
              />
              {/* <DebugView /> */}
            </View>
          </ThemeContainer>
        </Provider>
      );
    }
  }

  return PanelComponent;
};

export default composeLayout;
