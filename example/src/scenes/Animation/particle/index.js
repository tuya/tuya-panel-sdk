import React, { PureComponent } from 'react';
import { ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { TYText } from 'tuya-panel-kit';
import { Particle } from '@tuya/tuya-panel-animation-sdk';

export default class ParticleScene extends PureComponent {
  state = {
    animateSwitch: true,
  };

  toggleSwitch = () => {
    const { animateSwitch } = this.state;
    this.setState({ animateSwitch: !animateSwitch });
  };

  render() {
    const { animateSwitch } = this.state;
    return (
      <ScrollView style={{ flex: 1 }}>
        <Particle
          type="absorb"
          amount={30}
          color={['#f0f', '#00f', '#fff', '#ff0']}
          active={animateSwitch}
          dotRadius={[2, 4, 6, 8]}
        />

        <TouchableOpacity onPress={this.toggleSwitch} style={styles.btn}>
          <TYText style={styles.text}>{animateSwitch ? '关闭动画' : '开启动画'}</TYText>
        </TouchableOpacity>
        <Particle active={animateSwitch} dotRadius={[2, 4]} />
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
