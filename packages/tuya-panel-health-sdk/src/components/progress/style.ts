import { StyleSheet } from 'react-native';
import { Utils } from 'tuya-panel-kit';

const { convertX: cx } = Utils.RatioUtils;
export default StyleSheet.create({
  wrapper: {
    // height: '100%',
    width: '100%',
  },
  // eslint-disable-next-line react-native/sort-styles
  outer: {
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  inner: {
    height: '100%',
  },

  // CircleProgress
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

  // stepsProgress
  stepOuter: {
    flexDirection: 'row',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
  },
  item: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
});
