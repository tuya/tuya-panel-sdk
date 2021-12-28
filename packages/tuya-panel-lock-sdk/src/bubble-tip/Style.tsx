import { StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';
import { EBubbleTipeConfigType } from './interface';

const { convertX: cx } = Utils.RatioUtils;

export default StyleSheet.create({
  [EBubbleTipeConfigType.danger]: {
    backgroundColor: '#fc4747',
  },
  [EBubbleTipeConfigType.info]: {
    backgroundColor: '#5a7fff',
  },
  [EBubbleTipeConfigType.safe]: {
    backgroundColor: '#239c8e',
  },
  icon: {
    height: cx(16),
    marginRight: cx(6),
    width: cx(16),
  },
  message_wrap: {
    alignItems: 'center',
    borderRadius: cx(10),
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: cx(30),
    paddingVertical: cx(10),
    width: cx(180),
  },
  text: {
    color: 'white',
  },
});
