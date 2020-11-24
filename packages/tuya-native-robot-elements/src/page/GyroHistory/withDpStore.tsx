import React, { Component } from 'react';

// export class WithDpStore extends Component {
//     componentDidMount() {

//     }
//     componentWillUnmount() {

//     }

//     render() {

//     }
// }

export function withDpStore(dpCodeMap: any) {
    
  return function(Wrapped: React.ComponentClass | React.FunctionComponent) {
    return function(props: any) {
      return <Wrapped {...props}></Wrapped>;
    };
  };
}
