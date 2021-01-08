import React, { PureComponent } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { Particle } from '@tuya-smart/tuya-panel-animation-sdk';

const colors = ['#fff', '#a1d5ff'];

export default class ParticleScene extends PureComponent {
  state = {
    animateSwitch: true,
  };

  getColor = i => colors[i % colors.length];

  toggleSwitch = () => {
    const { animateSwitch } = this.state;
    this.setState({ animateSwitch: !animateSwitch });
  };

  render() {
    const { animateSwitch } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        <Particle.Absorb
          // type="absorb"
          width={375}
          height={375}
          radius={50}
          tolerance={15}
          amount={30}
          duration={3000}
          color={i => this.getColor(i)}
          active={animateSwitch}
          dotRadius={() => 3 * Math.floor(Math.random() * 2)}
        />

        <TouchableOpacity onPress={this.toggleSwitch} style={styles.btn}>
          <TYText style={styles.text}>{animateSwitch ? '关闭动画' : '开启动画'}</TYText>
        </TouchableOpacity>

        <Particle width={375} height={375} dotRadius={[2, 4]} color={['#fff', '#a1d5ff', 'red']} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#40a9ff',
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    marginVertical: 30,
    paddingHorizontal: 20,
    width: 200,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
