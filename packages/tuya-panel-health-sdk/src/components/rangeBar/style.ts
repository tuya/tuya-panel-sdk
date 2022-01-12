import { StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx, convertY: cy } = Utils.RatioUtils;
export default StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    width: '100%',
  },
});
