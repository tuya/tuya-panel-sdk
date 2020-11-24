import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Utils } from '@tuya-rn/tuya-native-components';
import I18n from '../../../i18n';

const { convertX: cx, width } = Utils.RatioUtils;

interface IProps {
  onSet: () => void;
  onDelete: () => void;
  setButtonBg: 'string';
  setButtonText: 'string';
  deleteButtonBg: 'string';
  deleteButtonText: 'string';
}

class SubButton extends PureComponent<IProps> {
  static defaultProps = {
    onSet: () => {},
    onDelete: () => {},
    setButtonBg: 'rgba(0,0,0,0.3)',
    setButtonText: '#fff',
    deleteButtonBg: 'rgba(0,0,0,0)',
    deleteButtonText: 'rgba(255,0,0,0.3)',
  };

  onDelete = () => {
    const { onDelete } = this.props;
    onDelete && onDelete();
  };

  onSet = () => {
    const { onSet } = this.props;
    onSet && onSet();
  };

  render() {
    const { setButtonBg, setButtonText, deleteButtonBg, deleteButtonText } = this.props;
    return (
      <View style={styles.botton}>
        <Button
          wrapperStyle={{ flex: 1 }}
          style={[styles.btnConfirm, { backgroundColor: setButtonBg }]}
          text={I18n.getLang('changeMap_change')}
          textStyle={[styles.text, { color: setButtonText }] as any}
          onPress={this.onSet}
        />
        <Button
          text={I18n.getLang('delete')}
          wrapperStyle={[styles.btnDelete, { backgroundColor: deleteButtonBg }]}
          textStyle={[styles.text, { color: deleteButtonText }] as any}
          onPress={this.onDelete}
        />
      </View>
    );
  }
}

export default SubButton;

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

  btnDelete: {
    position: 'absolute',
    right: cx(20),
  },
});
