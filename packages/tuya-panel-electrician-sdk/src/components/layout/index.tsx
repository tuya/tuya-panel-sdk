import React, { PureComponent } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import ModalContainer from './modal-container';

interface MagicLayoutProps {
  renderScene: any;
  renderModalScene: any;
  showModal: boolean;
  onChange: any;
  touchEnableArea: number;
  duration: number;
}

interface MagicLayoutState {
  animateValue: any;
}

export default class MagicLayout extends PureComponent<MagicLayoutProps, MagicLayoutState> {
  static defaultProps = {
    renderScene: () => {},
    renderModalScene: () => {},
    showModal: false,
    onChange: () => {},
    touchEnableArea: 100,
    duration: 380,
  };

  constructor(props) {
    super(props);
    this.state = {
      animateValue: new Animated.Value(0),
    };
    this.modal = null;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.showModal !== nextProps.showModal) {
      this.onModalScroll(nextProps.showModal);
    }
  }

  onModalScroll = (toTop = true) => {
    this.modal && this.modal.onSlide(toTop);
  };

  onSlideAnimateResponse = () => {
    this.onChangeResponse('slide');
  };

  onClose = () => {
    this.onChangeResponse('close');
  };

  onChangeResponse = (event: string) => {
    const { onChange } = this.props;
    onChange && onChange(event);
  };

  setModalRef = ref => {
    this.modal = ref;
  };

  modal: any;

  addAnimateListener = value => {
    this.setState({ animateValue: value });
  };

  render() {
    const { renderScene, renderModalScene, touchEnableArea, ...rest } = this.props;
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.scene,
            {
              overflow: 'hidden',
              borderRadius: this.state.animateValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 16],
              }),
              transform: [
                {
                  scale: this.state.animateValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.95],
                  }),
                },
              ],
            },
          ]}
        >
          {renderScene && renderScene()}
        </Animated.View>
        <ModalContainer
          ref={this.setModalRef}
          onClose={this.onClose}
          touchEnableArea={touchEnableArea}
          addAnimateListener={this.addAnimateListener}
          onSlideAnimateStart={this.onSlideAnimateResponse}
          onSlideAnimateEnd={this.onSlideAnimateResponse}
          {...rest}
        >
          {renderModalScene && renderModalScene()}
        </ModalContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    transform: [
      { translateX: 0 },
      { translateY: 0 },
      { scaleX: 1 },
      { scaleY: 1 },
      { rotate: '0deg' },
      { skewX: '0deg' },
      { skewY: '0deg' },
    ],
  },

  scene: {
    flex: 1,
  },
});
