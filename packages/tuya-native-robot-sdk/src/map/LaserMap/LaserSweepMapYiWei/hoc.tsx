import React, { PureComponent } from 'react';
import { Subscription } from 'rxjs';

import { createAreaDataObservable } from './observables';

export interface WithAreaMapProps {
  commandCode?: string;
}

export function withMapDataObservable(WrappedComponent: any) {
  return class extends PureComponent<WithAreaMapProps> {
    static HistoryElement: any;

    state = {};

    subscription: Subscription;

    componentDidMount() {
      this.subscription = createAreaDataObservable(this.props.commandCode).subscribe(data =>
        this.setState(data)
      );
    }

    componentWillUnmount() {
      if (this.subscription) {
        this.subscription.unsubscribe();
      }
    }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  }
  // WithAreaMap.HistoryElement = withMapHistory(WithAreaMap);
}
