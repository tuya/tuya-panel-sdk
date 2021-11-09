import React, { Component } from 'react';
import { View, Animated, StyleSheet, Easing, Text } from 'react-native';
import { TouchableView } from '@tuya/tuya-panel-lock-sdk';

const progressWidth = 300;

export default class TouchableWarpView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backgroundColor: 'blue',
      marginTop: 100,
      marginLeft: 100,
      text: '我是木头人',
    };
    this.width = new Animated.Value(1);
    this.lastX = this.state.marginLeft;
    this.lastY = this.state.marginTop;
  }

  onPressIn = () => {
    this.setState({ backgroundColor: 'yellow' });
  };

  onMove = (evt, { dx, dy }) => {
    this.setState({
      marginLeft: this.lastX + dx,
      marginTop: this.lastY + dy,
    });
  };

  onPressOut = () => {
    this.setState({ backgroundColor: 'blue', text: '我是被移动过的木头人' });
    this.lastX = this.state.marginLeft;
    this.lastY = this.state.marginTop;
  };

  startAnimation = () => {
    Animated.timing(this.width, {
      toValue: 0,
      duration: 1700,
      easing: Easing.linear,
    }).start();
  };

  stopAnimation = () => {
    this.width.setValue(1);
    this.width.stopAnimation();
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
        <View style={{ flex: 2, overflow: 'hidden', backgroundColor: '#fff' }}>
          <TouchableView
            onPressIn={this.onPressIn}
            onMove={this.onMove}
            onPressOut={this.onPressOut}
            onMoveStart={() => this.setState({ text: '开始滑动' })}
            onMoveX={() => this.setState({ text: 'X轴滑动' })}
            onLongMoveX={() => this.setState({ text: 'X轴长按滑动' })}
            onMoveY={() => this.setState({ text: 'Y轴滑动' })}
            onLongMoveY={() => this.setState({ text: 'Y轴长按滑动' })}
            onMoveDownStart={() => {
              this.setState({ text: '向下开始滑动' });
              console.log(`向下开始滑动`);
            }}
            onMoveUpStart={() => {
              this.setState({ text: '向上开始滑动' });
              console.log(`向上开始滑动`);
            }}
            onMoveRightStart={() => {
              this.setState({ text: '向右开始滑动' });
              console.log(`向右开始滑动`);
            }}
            onMoveLeftStart={() => {
              this.setState({ text: '向左开始滑动' });
              console.log(`向左开始滑动`);
            }}
          >
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: this.state.backgroundColor,
                marginTop: this.state.marginTop,
                marginLeft: this.state.marginLeft,
              }}
            />
          </TouchableView>
          <Text style={{ fontSize: 24, position: 'absolute', bottom: 0 }}>{this.state.text}</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableView
            longPressTestTime={2000}
            onLongPress={this.startAnimation}
            onMove={this.stopAnimation}
            onPressOut={this.stopAnimation}
          >
            <View style={styles.progress}>
              <Animated.View
                style={[
                  styles.bar,
                  {
                    width: this.width.interpolate({
                      inputRange: [0, 1],
                      outputRange: [progressWidth, 0],
                    }),
                  },
                ]}
              />
            </View>
          </TouchableView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#389FFA',
    borderRadius: 6,
    height: 12,
    width: progressWidth,
  },
  progress: {
    backgroundColor: '#EAEAEA',
    borderRadius: 6,
    height: 12,
    width: progressWidth,
  },
});
