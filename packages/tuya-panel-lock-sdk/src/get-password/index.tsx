import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import { GetPasswordProps, GetPasswordState } from './interface';
const { width } = Dimensions.get('window');

export default class GetPassword extends Component<GetPasswordProps, GetPasswordState> {
  static defaultProps = {
    randomText: '随机生成',
    passwordNumber: 6,
    inputItemText: '请输入',
    randomTextColor: '#0076FF',
    passwordColor: '#0076FF',
  };
  constructor(props) {
    super(props);
    this.state = {
      password: '',
    };
  }

  onEndEditing = text => {
    if (!/^[0-9]*$/.test(text)) {
      this.props.onValueChange({ showTip: true, errorInfo: 'passwordErrorNumber' });
      return;
    }
    this.props.onValueChange({ password: text });
    this.setState({ password: text });
  };

  onfocus = () => {
    this.passwordRef.focus();
  };

  getRandom = () => {
    const { passwordNumber } = this.props;
    let result = '';
    let i = passwordNumber;
    while (i) {
      const item = Math.round(Math.random() * 9);
      result += item.toString();
      i--;
    }
    this.props.onValueChange({ password: result });

    this.setState({ password: result });
  };

  passwordRef: any;

  renderPsw = () => {
    const {
      randomText,
      inputItemText,
      passwordNumber,
      randomTextColor,
      passwordColor,
    } = this.props;
    const { password } = this.state;
    return (
      <View style={styles.pswWarp}>
        <View style={styles.pwdRandom}>
          <View style={{ position: 'absolute' }}>
            <TextInput
              ref={ref => {
                this.passwordRef = ref;
              }}
              style={styles.textInputStyle}
              autoFocus={true}
              keyboardType="numeric"
              maxLength={passwordNumber}
              underlineColorAndroid="transparent"
              caretHidden={true}
              onChangeText={text => {
                this.onEndEditing(text);
              }}
              value={password}
            />
            <TouchableWithoutFeedback onPress={() => this.onfocus()}>
              <View style={styles.inputText}>
                {password.trim().length !== 0 && (
                  <Text style={[styles.pwdText, { color: passwordColor }]}>{password}</Text>
                )}
                {!password && <Text style={styles.TipText}>{inputItemText}</Text>}
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ position: 'absolute', right: 10 }}>
            <TouchableOpacity onPress={this.getRandom} style={[styles.randomView]}>
              <Text style={[styles.randomText, { color: randomTextColor }]}>{randomText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };
  render() {
    return <View style={{ backgroundColor: '#fff' }}>{this.renderPsw()}</View>;
  }
}

const styles = StyleSheet.create({
  pswWarp: {
    width,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  pwdRandom: {
    width: width - 32,
    height: 60,
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    borderColor: 'rgba(0,0,0,0.08)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  textInputStyle: {
    width: 230,
    height: 60,
    opacity: 0,
    zIndex: 0,
  },
  pwdText: {
    color: '#0076FF',
    fontWeight: 'bold',
    fontSize: 24,
    backgroundColor: 'transparent',
    letterSpacing: 8,
  },
  randomText: {
    color: '#0076FF',
    fontSize: 12,
    fontWeight: 'bold',
  },

  inputText: {
    position: 'absolute',
    justifyContent: 'center',
    height: 60,
    marginLeft: 20,
    width: width - 82,
    zIndex: 20,
  },
  TipText: {
    color: 'rgba(51,51,51,0.13)',
    fontSize: 20,
  },
  randomView: {
    height: 50,
    justifyContent: 'center',
  },
});
