import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  Modal,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export class EasyLoading {
  static map: Map<any, any>;

  static bind(LoadingThis: any, key: any = 'default') {
    LoadingThis && this.map.set(key, LoadingThis);
  }

  static unBind(key = 'default') {
    this.map.delete(key);
  }

  static show(text = 'Loading...', timeout = -1, key: any = 'default') {
    const result = this.map.get(key);
    result && result.setState({ isShow: true, text, timeout });
  }

  static dismis(text = 'Loading...', key: any = 'default') {
    const result = this.map.get(key);
    result && result.setState({ text, isShow: false });
  }
}

EasyLoading.map = new Map();

export interface LoadingProps {
  type?: string;
  color?: string;
  textStyle?: StyleProp<TextStyle>;
  loadingStyle?: StyleProp<ViewStyle>;
}

export interface LoadingState {
  isShow: boolean;
  timeout: number;
  text: string;
}

export class Loading extends React.Component<LoadingProps, LoadingState> {
  handle = 0;
  constructor(props: LoadingProps) {
    super(props);
    this.state = {
      isShow: false,
      timeout: -1,
      text: 'Loading...',
    };
    EasyLoading.bind(this, this.props.type || 'default');
  }

  componentWillUnmount() {
    clearTimeout(this.handle);
    EasyLoading.unBind(this.props.type || 'default');
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillReceiveProps() {
    EasyLoading.bind(this, this.props.type || 'default'); // 重新绑定
  }

  render() {
    const { type, color, textStyle, loadingStyle } = this.props;
    const { timeout, isShow, text } = this.state;

    clearTimeout(this.handle);

    timeout !== -1 &&
      (this.handle = setTimeout(() => {
        EasyLoading.dismis(type || 'default');
      }, timeout) as any);

    return (
      <Modal
        transparent
        animationType="fade"
        visible={isShow}
        onRequestClose={() => {
          __DEV__ && console.log('Modal has been closed.');
          // alert('Modal has been closed.')
        }}
      >
        <View style={[styles.load_box, loadingStyle]}>
          <ActivityIndicator
            animating
            color={color || '#FFF'}
            size="large"
            style={styles.load_progress}
          />
          <Text style={[styles.load_text, textStyle]}>{text}</Text>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  load_box: {
    alignItems: 'center',
    backgroundColor: '#0008',
    borderRadius: 10,
    height: 100,
    marginLeft: SCREEN_WIDTH / 2 - 50,
    marginTop: SCREEN_HEIGHT / 2 - 50,
    width: 100,
  },
  load_progress: {
    height: 90,
    position: 'absolute',
    width: 100,
  },
  load_text: {
    color: '#FFF',
    marginTop: 70,
  },
});

export default {
  EasyLoading,
  Loading,
};
