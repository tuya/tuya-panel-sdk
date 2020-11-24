import React, { PureComponent } from 'react';

// import { createAreaDataObservable } from './observables';

function withMapDataObservable(WrappedComponent) {
  return class WithAreaMapLaser extends PureComponent {
    state = {};

    // componentDidMount() {
    //   this.subscription = createAreaDataObservable().subscribe(data => this.setState(data));
    // }

    // componentWillUnmount() {
    //   if (this.subscription) {
    //     this.subscription.unsubscribe();
    //   }
    // }

    render() {
      return <WrappedComponent {...this.props} {...this.state} />;
    }
  };
}

export { withMapDataObservable };
