import React, { Component } from 'react';

import DrawMap, { IProps as DrawMapProps } from './DrawMap';
import GestureView from './GestureView';

export default class Index extends Component<DrawMapProps> {
  render() {
    return (
      <GestureView>
        <DrawMap {...this.props} />
      </GestureView>
    );
  }
}
