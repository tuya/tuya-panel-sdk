import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardTypeOptions,
  ViewStyle,
} from 'react-native';
import { TYText, Modal, Utils, IconFont } from 'tuya-panel-kit';
import Strings from './i18n';

const d =
  'M572.074667 337.134933a57.275733 57.275733 0 1 0-114.176-6.007466h-0.170667l12.936533 272.896v0.443733a44.544 44.544 0 1 0 89.019734-1.194667l12.424533-266.1376z m-196.949334-191.214933c76.151467-130.048 199.816533-129.774933 275.797334 0l340.3776 581.085867c76.117333 130.048 15.7696 235.4176-135.236267 235.4176H169.984c-150.8352 0-211.217067-105.6768-135.202133-235.4176L375.125333 145.92z m140.049067 687.581867a57.275733 57.275733 0 1 0 0-114.517334 57.275733 57.275733 0 0 0 0 114.517334z';
const { convertX: cx } = Utils.RatioUtils;
interface IProps {
  textColor: string;
  title: string;
  alarmTip: string;
  placeholder: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
  onConfirmPress: (value: string) => void;
  keyboardType: KeyboardTypeOptions;
  iconPath: string;
  iconColor: string;
  iconSize: number;
  alartStyle: ViewStyle;
  textTypeCheck: (value: string) => boolean;
  ruleCheck: (value: string) => boolean;
}

const TipDialog = ({
  textColor = '#FB7319',
  title = Strings.getLang('tip_dialog_title'),
  alarmTip = '',
  keyboardType = 'numeric',
  placeholder = '',
  visible = false,
  iconPath = d,
  iconColor = '#FF0000',
  iconSize = cx(10),
  alartStyle = {},
  setVisible,
  onConfirmPress,
  textTypeCheck,
  ruleCheck,
}: IProps) => {
  const [alarm, setAlarm] = useState(false);
  const [text, setText] = useState('');

  const disabled = alarm || !text;
  const onConfirm = () => {
    onConfirmPress(text);
    setText('');
  };
  const onCancel = () => {
    setVisible(false);
    setText('');
    setAlarm(false);
  };

  // eslint-disable-next-line consistent-return
  const onChangeText = (value: string) => {
    if (!textTypeCheck(value)) return false;
    setText(value);
    setAlarm(ruleCheck(value));
  };

  return (
    <Modal visible={visible} alignContainer="center" onMaskPress={() => setVisible(false)}>
      <View style={styles.container}>
        <View style={styles.wrap}>
          <TYText style={styles.title}>{title}</TYText>
          <View style={styles.content}>
            <TextInput
              style={styles.textInput}
              keyboardType={keyboardType}
              value={text}
              autoFocus
              placeholder={placeholder}
              onChangeText={onChangeText}
            />
            {alarm && (
              <View style={[styles.dialogInput, alartStyle]}>
                <IconFont d={iconPath} color={iconColor} size={iconSize} style={styles.icon} />
                <TYText color="#FF0000" size={12}>
                  {alarmTip}
                </TYText>
              </View>
            )}
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={[styles.footerBtn, styles.cancel]} onPress={() => onCancel()}>
              <TYText size={16} color="rgba(0,0,0,0.7)">
                {Strings.getLang('cancel')}
              </TYText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerBtn}
              disabled={disabled}
              onPress={() => onConfirm()}
            >
              <TYText size={16} color={textColor} style={{ opacity: disabled ? 0.3 : 1 }}>
                {Strings.getLang('confirm')}
              </TYText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default TipDialog;

const styles = StyleSheet.create({
  cancel: {
    borderRightColor: 'rgba(0,0,0,0.1)',
    borderRightWidth: cx(0.5),
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: cx(375),
  },
  content: {
    paddingBottom: cx(24),
  },
  dialogInput: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: cx(5),
  },
  footer: {
    borderTopColor: 'rgba(0,0,0,0.1)',
    borderTopWidth: cx(0.5),
    flexDirection: 'row',
    height: cx(65),
    justifyContent: 'space-between',
    width: cx(311),
  },
  footerBtn: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    marginRight: cx(4),
  },
  textInput: {
    fontSize: cx(15),
    height: cx(38),
    width: cx(279),
  },
  title: {
    fontSize: cx(16),
    paddingVertical: cx(24),
  },
  wrap: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: cx(16),
    justifyContent: 'center',
    width: cx(311),
  },
});
