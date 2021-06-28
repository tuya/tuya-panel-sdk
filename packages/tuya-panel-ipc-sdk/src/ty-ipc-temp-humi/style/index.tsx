import { StyleSheet } from 'react-native';
import publicConfig from '../../publicConfig';

const { cx } = publicConfig;

const Styles = StyleSheet.create({
  tempHumiPage: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: cx(24),
    borderRadius: Math.ceil(cx(12)),
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: cx(15),
  },
  iconBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  symbol: {
    fontSize: cx(14),
    color: '#ffffff',
    marginHorizontal: cx(5),
  },
  iconText: {
    fontSize: cx(14),
    color: '#ffffff',
  },
  iconImg: {
    width: cx(16),
    marginRight: cx(2),
    resizeMode: 'contain',
  },
});

export default Styles;
