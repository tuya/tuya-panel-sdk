import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Utils } from '@tuya-rn/tuya-native-components';
import I18n from '../../../i18n';

const { convertX: cx, width } = Utils.RatioUtils;

interface IProps {
  onReset: () => void;
  onSave: () => void;
  resetButtonBg: 'string';
  resetButtonText: 'string';
  saveButtonBg: 'string';
  saveButtonText: 'string';
}

class MainButton extends PureComponent<IProps> {
  static defaultProps = {
    onReset: () => {},
    onSave: () => {},
    resetButtonBg: '#fff',
    resetButtonText: 'rgba(0,0,0,0.3)',
    saveButtonBg: 'rgba(0,0,0,0.3)',
    saveButtonText: '#fff',
  };

  onSave = () => {
    const { onSave } = this.props;
    onSave && onSave();
  };

  onReset = () => {
    const { onReset } = this.props;
    onReset && onReset();
  };

  render() {
    const { resetButtonBg, resetButtonText, saveButtonBg, saveButtonText } = this.props;
    return (
      <View style={styles.botton}>
        <Button
          wrapperStyle={{ flex: 1 }}
          style={[styles.btnCancel, { backgroundColor: resetButtonBg }]}
          text={I18n.getLang('changeMap_reset')}
          textStyle={[styles.text, { color: resetButtonText }] as any}
          onPress={this.onReset}
        />
        <Button
          wrapperStyle={{ flex: 1 }}
          style={[styles.btnConfirm, { backgroundColor: saveButtonBg }]}
          text={I18n.getLang('save')}
          textStyle={[styles.text, { color: saveButtonText }] as any}
          onPress={this.onSave}
        />
      </View>
    );
  }
}

export default MainButton;

const styles = StyleSheet.create({
  text: {
    fontSize: cx(14),
    color: '#ffffff',
  },
  botton: {
    flexDirection: 'row',
  },
  btnConfirm: {
    width: cx(126),
    paddingVertical: cx(10),
    borderRadius: cx(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: cx(6),
  },

  btnCancel: {
    width: cx(126),
    paddingVertical: cx(10),
    borderRadius: cx(30),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: cx(6),
    marginLeft: cx(10),
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
});
