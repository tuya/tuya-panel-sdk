import React, { PureComponent } from 'react';
import { View, ViewPropTypes, StyleSheet } from 'react-native';
import _ from 'lodash';
import PropTypes from 'prop-types';

import SingleParticle from './single-particle';

export default class Particle extends PureComponent {
  static propTypes = {
    ...SingleParticle.propTypes,
    /**
     * 粒子的数量
     */
    amount: PropTypes.number,
    /**
     * 粒子的颜色
     */
    color: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.arrayOf(PropTypes.string),
    ]),
    /**
     * 容器样式
     */
    style: ViewPropTypes.style,
  };

  static defaultProps = {
    ...SingleParticle.defaultProps,
    amount: 50,
    color: '#fff',
    style: {},
  };

  render() {
    const { width, height, color, amount, style } = this.props;
    const singleParticleProps = _.pick(this.props, Object.keys(SingleParticle.propTypes));

    return (
      <View style={[styles.container, style, { width, height }]}>
        {_.times(amount, i => {
          const singleColor =
            typeof color === 'function'
              ? color(i)
              : Array.isArray(color)
              ? color[Math.floor(color.length * Math.random())]
              : color;
          return <SingleParticle key={i} {...singleParticleProps} color={singleColor} />;
        })}
      </View>
    );
  }
}

Particle.Diffuse = props => <Particle {...props} type="diffuse" />;

Particle.Absorb = props => <Particle {...props} type="absorb" />;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    overflow: 'hidden',
  },
});
