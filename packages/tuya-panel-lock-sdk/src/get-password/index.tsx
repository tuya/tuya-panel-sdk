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
import Strings from '../defend-time/i18n';

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
              autoFocus
              keyboardType="numeric"
              maxLength={passwordNumber}
              underlineColorAndroid="transparent"
              caretHidden
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
                {!password && (
                  <Text style={styles.TipText}>{Strings.getLang('passwordInput')}</Text>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={{ position: 'absolute', right: 10 }}>
            <TouchableOpacity onPress={this.getRandom} style={styles.randomView}>
              <Text style={[styles.randomText, { color: randomTextColor }]}>
                {Strings.getLang('random')}
              </Text>
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
  TipText: {
    color: 'rgba(51,51,51,0.13)',
    fontSize: 20,
  },

  inputText: {
    height: 60,
    justifyContent: 'center',
    marginLeft: 20,
    position: 'absolute',
    width: width - 82,
    zIndex: 20,
  },
  pswWarp: {
    alignItems: 'center',
    backgroundColor: '#fff',
    width,
  },
  pwdRandom: {
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderColor: 'rgba(0,0,0,0.08)',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    height: 60,
    justifyContent: 'space-between',
    marginVertical: 8,
    paddingHorizontal: 16,
    width: width - 32,
  },
  pwdText: {
    backgroundColor: 'transparent',
    color: '#0076FF',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 8,
  },

  randomText: {
    color: '#0076FF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  randomView: {
    height: 50,
    justifyContent: 'center',
  },
  textInputStyle: {
    height: 60,
    opacity: 0,
    width: 230,
    zIndex: 0,
  },
});
