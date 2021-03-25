import { StyleSheet } from 'react-native';
import publicConfig from '../../publicConfig';

const { cx } = publicConfig;

const Styles = StyleSheet.create({
  containerStyle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridImg: {
    resizeMode: 'contain',
    width: cx(40),
  },
  gridMenuItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  gridText: {
    fontSize: cx(12),
    textAlign: 'center',
  },
  gridTextBox: {
    marginTop: cx(4),
    width: cx(60),
  },
});

export default Styles;
