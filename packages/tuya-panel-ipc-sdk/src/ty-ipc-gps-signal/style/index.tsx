import { StyleSheet } from 'react-native';
import publicConfig from '../../publicConfig';

const { cx } = publicConfig;

const Styles = StyleSheet.create({
  iconImg: {
    marginRight: 2,
    resizeMode: 'contain',
    width: 16,
  },
  signalContain: {
    alignItems: 'center',
    borderRadius: Math.ceil(cx(12)),
    flexDirection: 'row',
    height: cx(24),
    justifyContent: 'center',
    paddingHorizontal: cx(15),
    width: '20%',
  },
  symbol: {
    color: '#ffffff',
    fontSize: cx(14),
    marginHorizontal: cx(5),
  },
});

export default Styles;
