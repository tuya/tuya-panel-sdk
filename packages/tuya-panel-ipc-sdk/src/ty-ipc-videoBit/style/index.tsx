import { StyleSheet } from 'react-native';
import publicConfig from '../../publicConfig';

const { cx } = publicConfig;

const Styles = StyleSheet.create({
  bitTxtBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: Math.ceil(cx(15)),
    height: cx(24),
    justifyContent: 'center',
    width: 85,
  },
  fontContainer: {
    color: '#fff',
  },
  videoBitContainer: {
    position: 'absolute',
    right: 0,
    top: 20,
  },
});

export default Styles;
