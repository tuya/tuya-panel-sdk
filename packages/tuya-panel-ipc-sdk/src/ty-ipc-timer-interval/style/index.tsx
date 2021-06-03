import { StyleSheet } from 'react-native';
import publicConfig from '../../publicConfig';

const { cx } = publicConfig;

const Styles = StyleSheet.create({
  timerIntervalPage: {
    width: 120,
  },
  timerContain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingRight: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginLeft: 10,
    marginRight: 5,
    backgroundColor: '#F42E1B',
    overflow: 'hidden',
  },
  text: {
    fontSize: 14,
    color: 'rgb(255,255,255)',
  },
});

export default Styles;
