import { StyleSheet } from 'react-native';
import publicConfig from '../../publicConfig';

const { cx } = publicConfig;

const Styles = StyleSheet.create({
  controlItemBox: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  musicControlPage: {
    alignItems: 'center',
    flexDirection: 'row',
    height: cx(70),
    justifyContent: 'center',
    paddingBottom: cx(30),
  },
});

export default Styles;
