import React, { PureComponent } from 'react';
import extractGradient from 'react-native-svg/lib/extract/extractGradient';
import createReactNativeComponentClass from 'react-native-svg/lib/createReactNativeComponentClass';
import { ClipPathAttributes } from 'react-native-svg/lib/attributes';

function arrayDiffer(a: number[], b: number[]) {
  if (a == null || b == null) {
    return true;
  }
  if (a.length !== b.length) {
    return true;
  }
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return true;
    }
  }
  return false;
}

const GradientAttributes = {
  gradient: {
    diff: arrayDiffer,
  },
  gradientUnits: true,
  gradientTransform: {
    diff: arrayDiffer,
  },
  cx: true,
  cy: true,
  ...ClipPathAttributes,
};

interface Props {
  cx?: number | string;
  cy?: number | string;
  gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse';
  id?: string;
}

export default class ConicalGradient extends PureComponent<Props> {
  static defaultProps = {
    cx: '50%',
    cy: '50%',
    gradientUnits: 'objectBoundingBox',
  };

  render() {
    const { cx, cy } = this.props;
    return (
      <RNSVGConicalGradient
        cx={cx.toString()}
        cy={cy.toString()}
        {...extractGradient(this.props)}
      />
    );
  }
}

const RNSVGConicalGradient = createReactNativeComponentClass('RNSVGConicalGradient', () => ({
  validAttributes: GradientAttributes,
  uiViewClassName: 'RNSVGConicalGradient',
}));
