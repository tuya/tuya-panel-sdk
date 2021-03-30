import { StyleSheet } from 'react-native';
import publicConfig from '../../publicConfig';

const { cx } = publicConfig;

const Styles = StyleSheet.create({
  lightPirCircle: {
    resizeMode: 'contain',
    width: cx(8),
  },
  pirPiePage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pirTip: {
    color: '#999999',
    fontSize: cx(14),
    marginVertical: cx(15),
    textAlign: 'center',
  },
});

export default Styles;
