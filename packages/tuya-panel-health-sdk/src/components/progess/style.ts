import { StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;
export default StyleSheet.create({
  container: {
    height: '100%',
    position: 'relative',

    width: '100%',
  },
  progressCircleText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  progressCircleTextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});
