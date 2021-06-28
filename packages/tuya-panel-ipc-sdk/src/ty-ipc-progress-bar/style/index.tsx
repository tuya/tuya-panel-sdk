import { StyleSheet } from 'react-native';
import publicConfig from '../../publicConfig';

const { cx } = publicConfig;

const Styles = StyleSheet.create({
  progressBarPage: {
    height: Math.ceil(cx(56)),
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconTitle: {
    width: cx(40),
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  slider: {
    flex: 1,
    marginLeft: cx(8),
    marginRight: cx(5),
  },
  iconImage: {

  },
  percentBox: {
    minWidth: cx(40),
  },
  percent: {
    fontSize: cx(12),
  },
  rightImageBox: {
    minWidth: cx(40),
    marginLeft: cx(3),
  },
  noPercentBox: {
    minWidth: cx(20),
  },

});

export default Styles;
